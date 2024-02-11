import { Component, computed } from "@angular/core";
import { RouterModule } from "@angular/router";
import { resource } from "../../../core/utilities/resource";
import { CommonModule } from "@angular/common";
import Navlink from "../../../core/component/navlink.component";
import { HoverPreloadStrategy } from "src/app/core/strategy/hover-strategy";
import { load } from "./invoices.component.server";

@Component({
    imports: [ CommonModule, RouterModule, Navlink ],
    providers: [ HoverPreloadStrategy ],
    standalone: true,
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.css',
})
export default class InvoicesComponent {
    readonly invoices = resource<typeof load>();

    shown = computed(() => {
        const i = { ...this.invoices() };

        i.value = i.value?.slice(0, 5);

        return i;
    });

    totalOverDue = computed(() => {
        const stateOfInvoices = this.invoices();

        if(stateOfInvoices.state !== 'idle') {
            return 0;
        }

        return stateOfInvoices.value.filter(i => i.status.status === 'overdue').reduce((t, i) => t + i.price.value, 0);
    });
}
