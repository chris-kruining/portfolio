import { ChangeDetectionStrategy, Component, Input, computed, effect, inject, signal } from "@angular/core";
import { EventType, Router, RouterModule, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoadResult } from "@analogjs/router";
import { Invoice, load } from "./invoices.server";
import Navlink from "../../../../core/component/navlink.component";
import { resource } from "../../../../core/utility/resource";

@Component({
    imports: [ CommonModule, RouterModule, Navlink ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: 'app-invoices',
    templateUrl: './invoices.page.html',
    styleUrl: './invoices.page.css',
})
export default class InvoicesComponent {
    readonly invoices = resource(({ invoices }: LoadResult<typeof load>) => invoices);

    readonly shown = computed(() => {
        const { state, value } = this.invoices();

        return {
            state,
            value: value?.slice(0, 5)
        };
    });

    readonly totalOverDue = computed(() => {
        const stateOfInvoices = this.invoices();

        if(stateOfInvoices.state !== 'idle') {
            return 0;
        }

        return stateOfInvoices.value!.filter(i => i.status.status === 'overdue').reduce((t, i) => t + i.price.value, 0);
    });

    constructor() {
        // effect(() => {
        //     console.log(this.invoices());
        // })
    }
}
