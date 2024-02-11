import { PreloadingFeature, withPreloading } from "@angular/router";
import { HoverPreloadStrategy } from "./hover-strategy";
import { Provider, inject } from "@angular/core";

export function withHoverPreloading(): PreloadingFeature {
    return withPreloading(HoverPreloadStrategy);
}

export function provideHoverStrategy(): Provider {
    return HoverPreloadStrategy;
}

export function injectHoverStrategy(): HoverPreloadStrategy {
    return inject(HoverPreloadStrategy);
}