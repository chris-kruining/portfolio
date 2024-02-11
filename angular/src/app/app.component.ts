import { Component, OnInit, afterNextRender, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { serialize, deserialize } from './core/utilities/binary';
import { z } from 'zod';
import { dueStatus } from './feature/sales/invoices/service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private readonly titleService = inject(Title);
    private readonly activatedRRoute = inject(ActivatedRoute);
    private readonly router = inject(Router);

    constructor() {
        afterNextRender(async () => {       
            const due = z.discriminatedUnion('status', [
                z.object({ status: z.literal('paid') }),
                z.object({ status: z.literal('overdue') }),
                z.object({ status: z.literal('dueToday') }),
                z.object({ status: z.literal('dueInDays'), dueInDays: z.number() }),
                z.object({ status: z.literal('dueInYears'), dueInYears: z.number() }),
            ]);     

            const invoice = z.object({
                id: z.number(),
                place: z.string(),
                price: z.object({
                    value: z.number(),
                    currency: z.enum(['EUR', 'JPY', 'USD']),
                }),
                paid: z.boolean(),
                due: z.date(),
                status: due,
            });

            const invoices: readonly z.infer<typeof invoice>[] = [
                { id: 1 , place: 'Zaltbommel', price: { value: 1_000_123, currency: 'EUR' }, paid: false, due: new Date(Date.parse('2015-11-17')), get status(){ return dueStatus(this) } },
                { id: 2 , place: 'Zaltbommel', price: { value: 1_456_000, currency: 'JPY' }, paid: false, due: new Date(Date.parse('2019-01-22')), get status(){ return dueStatus(this) } },
                { id: 3 , place: 'Zaltbommel', price: { value: 1_123_456, currency: 'USD' }, paid: true,  due: new Date(Date.parse('2020-08-11')), get status(){ return dueStatus(this) } },
                { id: 4 , place: 'Zaltbommel', price: { value: 4_321_000, currency: 'EUR' }, paid: false, due: new Date(Date.parse('2023-08-22')), get status(){ return dueStatus(this) } },
                { id: 5 , place: 'Zaltbommel', price: { value: 1_000_000, currency: 'USD' }, paid: false, due: new Date(Date.parse('2024-02-05')), get status(){ return dueStatus(this) } },
                { id: 6 , place: 'Zaltbommel', price: { value: 1_000_000, currency: 'EUR' }, paid: true,  due: new Date(Date.parse('2013-10-22')), get status(){ return dueStatus(this) } },
                { id: 7 , place: 'Zaltbommel', price: { value: 4_321_000, currency: 'USD' }, paid: true,  due: new Date(Date.parse('2016-09-16')), get status(){ return dueStatus(this) } },
                { id: 8 , place: 'Zaltbommel', price: { value: 1_000_123, currency: 'EUR' }, paid: false, due: new Date(Date.parse('2018-10-19')), get status(){ return dueStatus(this) } },
                { id: 9 , place: 'Zaltbommel', price: { value: 1_000_000, currency: 'JPY' }, paid: false, due: new Date(Date.parse('2023-05-29')), get status(){ return dueStatus(this) } },
                { id: 10, place: 'Zaltbommel', price: { value: 4_321_000, currency: 'EUR' }, paid: true,  due: new Date(Date.parse('2024-02-06')), get status(){ return dueStatus(this) } },
                { id: 11, place: 'Zaltbommel', price: { value: 1_456_000, currency: 'JPY' }, paid: false, due: new Date(Date.parse('2018-02-28')), get status(){ return dueStatus(this) } },
            ] as const;

            await log('single', invoice, invoices[2]);
            await log('array', z.array(invoice), invoices);
            await log('empty', z.array(invoice), []);

            const response = await fetch('__api/kaas');
            console.log(response);

            // console.log(await deserialize(invoice, .then(r => r.arrayBuffer())));
        });

        const log = async (label: string, schema: z.ZodTypeAny, original: any) => {
            console.group(`%c\n${label}`, "font-weight: bold; font-size: 1.2rem;");
            
            const serialized = await serialize(schema, original);
            const deserialized = await deserialize(schema, serialized);

            console.log(
                original, 
                deserialized
            );
            console.groupEnd();

        };
    }

    ngOnInit() {

        const appTitle = this.titleService.getTitle();

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.activatedRRoute),
                map(route => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }

                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data),
            )
            .subscribe(event =>  this.titleService.setTitle(
                event['title'] !== undefined 
                    ? `${appTitle} | ${event['title']}`
                    : appTitle
            ));
    }
}
