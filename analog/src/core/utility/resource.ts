import { Signal, inject, signal } from "@angular/core";
import { DiscriminatedUnion } from "./types";
import { PageServerLoad } from "@analogjs/router";
import { ActivatedRoute, EventType, Router } from "@angular/router";
import { filter } from "rxjs";

export type ResourceState<T> = DiscriminatedUnion<'state', {
    idle: { value: T, error: undefined },
    loading: { value: undefined, error: undefined },
    error: { value: undefined, error: Error },
}>;

export type Resource<T> = Signal<ResourceState<T>>;

export function resource<
    T extends (pageServerLoad: PageServerLoad) => Promise<any>, 
    M = Awaited<ReturnType<T>>
>(map: (v: Awaited<ReturnType<T>>) => M = v => v): Resource<M> {
    const router = inject(Router);
    const route = inject(ActivatedRoute);
    const resource = signal<ResourceState<M>>({ state: 'loading', value: undefined, error: undefined })
    
    router.events.pipe(
        filter(e => e.type === EventType.ActivationStart && e.snapshot.component == route.snapshot.component)
    ).subscribe((e) => {
        resource.set({ state: 'loading', value: undefined, error: undefined });
    })

    route.data.subscribe((data) => {
        resource.set({ state: 'idle', value: map(data['load']), error: undefined });
    })

    return resource.asReadonly();
}