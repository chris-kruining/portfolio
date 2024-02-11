import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import type { PageServerLoad } from "src/routes.server";
import SuperJSON from "superjson";

export const resolver = (load: (params: PageServerLoad) => Promise<any>) => 
    async (activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => 
        isPlatformBrowser(inject(PLATFORM_ID))
            ? await fetch(`/__api${routerStateSnapshot.url}`)
                .then(r => r.text())
                .then(result => SuperJSON.parse(result))
            : await load({ params: activatedRouteSnapshot.params, req: undefined as any, res: undefined as any });