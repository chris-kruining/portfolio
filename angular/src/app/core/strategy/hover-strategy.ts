import { Injectable, inject } from "@angular/core";
import { PreloadingStrategy, Route, PRIMARY_OUTLET, UrlTree, Params, UrlSegmentGroup, UrlSegment, Router } from "@angular/router";
import { Observable, EMPTY } from "rxjs";

@Injectable()
export class HoverPreloadStrategy implements PreloadingStrategy {
    private readonly router = inject(Router);
    private readonly registry = inject(RegistryService);
    private readonly loading = new Set<Route>();

    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (this.loading.has(route)) {
            return EMPTY;
        }

        if (route.data?.['preload'] === false) {
            return EMPTY;
        }

        const path = findPath(this.router.config, route);

        if(this.registry.shouldPrefetch(path) === false)
        {
            return EMPTY;
        }

        console.info('should load', route);

        this.loading.add(route);

        return load();
    }
    
}

function findPath(config: Route[], route: Route): string {
    config = [ ...config ];

    const parent = new Map<Route, Route>();
    const visited = new Set<Route>();

    for (const el of config) {
        visited.add(el);

        if (el === route) {
            break;
        }

        let children: Route[] = (el as any)._loadedRoutes ?? [];

        const current = (el as any)._loadedConfig;

        if (current?.routes !== undefined) {
            children = children.concat(current.routes);
        }

        for (const route of children.filter(r => visited.has(r) === false)) {
            parent.set(route, el);
            config.push(route);
        }
    }

    let path = '';
    let current = route;

    while (current) {
        path = `/${current.path}${path}`;
        current = parent.get(current)!;
    }

    return path;
};

function isPrimaryRoute(route: Route) {
  return route.outlet === PRIMARY_OUTLET || (route.outlet?.length ?? 0) > 0;
}








@Injectable({ providedIn: 'root' })
export class RegistryService {
    private readonly router = inject(Router);
    private readonly queue = new Set<UrlTree>([]);

    add(route: UrlTree) {
        this.queue.add(route);
    }
    
    shouldPrefetch(url: string) {
        const tree = this.router.parseUrl(url);
        return [...this.queue].some(containsTree.bind(null, tree));
    }
}

function containsQueryParams(container: Params, containee: Params): boolean {
    const keys = Object.keys(containee);

    return keys.length <= Object.keys(container).length
        && keys.every(key => containee[key] === container[key]);
}

function containsTree(containee: UrlTree, container: UrlTree): boolean {
    return containsQueryParams(container.queryParams, containee.queryParams)
        && containsSegmentGroup(container.root, containee.root, containee.root.segments);
}

function containsSegmentGroup(
    container: UrlSegmentGroup,
    containee: UrlSegmentGroup,
    containeePaths: UrlSegment[]
): boolean {
    if (container.segments.length > containeePaths.length) {
        const current = container.segments.slice(0, containeePaths.length);

        if (!equalPath(current, containeePaths)) {
            return false;
        }
    
        if (containee.hasChildren()) {
            return false;
        }

        return true;
    } 

    if (container.segments.length === containeePaths.length) {
        if (!equalPath(container.segments, containeePaths)) {
            return false;
        }
        
        if (!containee.hasChildren()) {
            return true;
        }

        for (const c in containee.children) {
            if (!container.children[c]) {
                break;
            }

            if (containsSegmentGroup(container.children[c], containee.children[c], containee.children[c].segments)) {
                return true;
            }
        }

        return false;
    }

    const current = containeePaths.slice(0, container.segments.length);
    const next = containeePaths.slice(container.segments.length);

    if (!equalPath(container.segments, current)) {
        return false;
    }

    if (!container.children[PRIMARY_OUTLET]) {
        return false;
    }

    return containsSegmentGroup(container.children[PRIMARY_OUTLET], containee, next);
}

export function equalPath(as: UrlSegment[], bs: UrlSegment[]): boolean {
    if (as.length !== bs.length) {
        return false;
    }

    return as
        .map((a, i) => [ a, bs[i] ])
        .every(([ a, b ]) => 
            a.path === b.path 
            || a.path.startsWith(':') 
            || b.path.startsWith(':')
        );
}