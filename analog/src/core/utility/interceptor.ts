import { isPlatformBrowser } from "@angular/common";
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { PLATFORM_ID, inject } from "@angular/core";
import { Observable, catchError, from, map, mergeMap, of, tap } from "rxjs";
import SuperJSON from 'superjson';
import { deserialize } from "./binary";
import { invoice } from "../service/invoice.service";
import { z } from "zod";

export const serializationInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    if (new URL(req.url).pathname.startsWith('/api/_analog/pages/(shell)/sales/invoices/') === false) {
        return next(req);
    }

    const platform = inject(PLATFORM_ID);

    return isPlatformBrowser(platform)
        ? handleServer(req, next)
        : handleServer(req, next)
};

const handleBrowser: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    return next(req).pipe(tap((event) => {
        if (event instanceof HttpResponse) {
            console.log(event.body);
        }
    }));
};

const handleServer: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    if (req.responseType !== 'json' || req.url.includes('/invoices/') === false) {
        return next(req);
    }

    req = req.clone({ responseType: 'text' });

    return next(req).pipe(
        mergeMap(event => {
            if (
                event instanceof HttpResponse 
                // && event.headers.get('Content-Type') === 'application/octet-stream' 
                // && event.body instanceof ArrayBuffer
                && typeof event.body === 'string'
            ) {
                console.log(new TextEncoder().encode(event.body));
                
                return from(deserialize(z.object({ invoice }), new TextEncoder().encode(event.body).buffer)).pipe(
                    map(body => {
                        console.log('body', body);
        
                        return event.clone({ body });
                    }),
                    catchError(err => {
                        console.error(err)
                        console.log(req, event);

                        return of(event);
                    })
                )
            }

            return of(event);
        })
    );
};

