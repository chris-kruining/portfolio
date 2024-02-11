import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import Navlink from "src/app/core/component/navlink.component";
import { HoverPreloadStrategy } from "src/app/core/strategy/hover-strategy";

@Component({
    imports: [ RouterModule, Navlink ],
    providers: [ HoverPreloadStrategy ],
    standalone: true,
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrl: './sales.component.css',
    
})
export default class Sales {
    title = 'SALES';
}