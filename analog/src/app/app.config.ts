import { provideHttpClient, withFetch, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { withComponentInputBinding, withNavigationErrorHandler } from '@angular/router';
import { provideHoverStrategy, withHoverPreloading } from '../core/strategy/hover-strategy.di';
import { serializationInterceptor } from '../core/utility/interceptor';
import { provideKaasBackend } from '../core/http/provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKaasBackend(),
    provideHoverStrategy(),
    provideFileRouter(
      withComponentInputBinding(), 
      withNavigationErrorHandler(console.error),
      withHoverPreloading(),
    ),
    provideHttpClient(withFetch(), withInterceptors([ serializationInterceptor ])),
    provideClientHydration(),
  ],
};
