import { Signal, inject, signal } from "@angular/core";
import { filter } from "rxjs";
import { DiscriminatedUnion } from "./types";
import { ActivatedRoute, EventType, Router } from "@angular/router";
import type { PageServerLoad } from "src/routes.server";

type ResourceState<T> = DiscriminatedUnion<'state', {
    idle: { value: T, error: undefined },
    loading: { value: undefined, error: undefined },
    error: { value: undefined, error: Error },
}>;

type Resource<T> = Signal<ResourceState<T>>;

export function resource<
    T extends (params: PageServerLoad) => Promise<any>, 
    M = Awaited<ReturnType<T>>
>(map: (v: Awaited<ReturnType<T>>) => M = v => v): Resource<M> {
    const router = inject(Router);
    const route = inject(ActivatedRoute);
    const resource = signal<ResourceState<M>>({ state: 'loading', value: undefined, error: undefined });
    
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