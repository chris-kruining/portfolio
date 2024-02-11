import { HttpBackend, HttpEvent, HttpRequest, ɵPRIMARY_HTTP_BACKEND } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable, Observer } from "rxjs";

export function provideKaasBackend(): Provider {
    return KaasBackend;
}

@Injectable()
export class KaasBackend implements HttpBackend {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        console.log(req);

        return new Observable<HttpEvent<any>>((observer: Observer<HttpEvent<any>>) => {
            observer.next({ type: 0 });

            // Cancellation handler.
            return () => {

            };
        });
    }

}