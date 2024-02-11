import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideServiceWorker } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import Navlink from "./core/component/navlink.component";
import { HoverPreloadStrategy } from './core/strategy/hover-strategy';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        provideClientHydration(),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        HoverPreloadStrategy,
    ],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        AppRoutingModule,
        Navlink,
    ]
})
export class AppModule { }
