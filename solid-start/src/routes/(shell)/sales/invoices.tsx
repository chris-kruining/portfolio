import { RouteSectionProps } from "@solidjs/router";



export default function Invoices({ children }: RouteSectionProps) {
    return <>
        <h2>Total due</h2>

        <header>
            some header
        </header>

        <h3>Invoices</h3>

        <nav>
            <a href="/sales/invoices/10">10</a>
        </nav>

        <main>
            {children}
        </main>
    </>;
}