import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Navlink from '../../core/component/navlink.component';
// import { Title } from '@angular/platform-browser';
// import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { filter, map, mergeMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, Navlink],
  templateUrl: './(shell).page.html',
  styleUrls: ['./(shell).page.css', './(shell).page.css' ]
})
export default class ShellComponent implements OnInit {
    // private readonly titleService = inject(Title);
    // private readonly activatedRRoute = inject(ActivatedRoute);
    // private readonly router = inject(Router);

    ngOnInit() {
        // const appTitle = this.titleService.getTitle();

        // this.router.events
        //     .pipe(
        //         filter(event => event instanceof NavigationEnd),
        //         map(() => this.activatedRRoute),
        //         map(route => {
        //             while (route.firstChild) {
        //                 route = route.firstChild;
        //             }

        //             return route;
        //         }),
        //         filter(route => route.outlet === 'primary'),
        //         mergeMap(route => route.data),
        //     )
        //     .subscribe(event =>  this.titleService.setTitle(
        //         event['title'] !== undefined 
        //             ? `${appTitle} | ${event['title']}`
        //             : appTitle
        //     ));
    }
}

