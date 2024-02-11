import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import Navlink from "../../../core/component/navlink.component";

@Component({
    imports: [ RouterModule, Navlink ],
    standalone: true,
    selector: 'app-sales',
    templateUrl: './sales.page.html',
    styleUrl: './sales.page.css',
    
})
export default class SalesComponent {
    title = 'SALES';
}