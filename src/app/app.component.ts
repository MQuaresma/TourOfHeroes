import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Tour Of Heroes';
    menuRoutes: MenuRoute[] = [
        {menu: 'Dashboard', path: '/dashboard'},
        {menu: 'Heroes', path: '/heroes'},
        {menu: 'Log', path: '/log'},
        {menu: 'About', path: '/about'}
    ];
}

class MenuRoute {
    menu: string;
    path: string;
}
