import { Component, OnInit } from '@angular/core';
import { NavItems } from '../../interfaces/ui-config/nav-items-config';
import { faChartBar, faHome, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Route, Router } from '@angular/router';
import { PollingService } from '../../services/pollingService';
import { filter, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-navbar',
  imports: [FontAwesomeModule, CommonModule],
  providers: [PollingService],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent implements OnInit{
  faSignOutAlt = faSignOutAlt;
  navItems: NavItems[] = [{
    name: 'Home',
    route: 'home',
    icon: faHome,
    active: false
  },
  {
    name: 'My Polls',
    route: 'my-polls',
    icon: faChartBar,
    active: false
  },
  {
    name: 'Create Polls',
    route: 'create-polls',
    icon: faPlus,
    active: false
  }]

  currentUser: any;
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe(rEvent => {
      if(rEvent instanceof NavigationEnd) {
        console.log(rEvent) ;
        this.authService.currentUser$.subscribe(usr => this.currentUser = usr);
        this.navItems.map(nItem => 
        {
          if(nItem.route) {
            nItem.active = rEvent.url.includes(nItem.route);
          }
        });
      }
    });
  }

  selectTab(item: NavItems) {
    const index = this.navItems.findIndex(tab => tab.name === item.name);
    this.navItems.map(nItem => nItem.active = this.navItems[index].name === nItem.name);
    this.router.navigateByUrl(this.navItems[index].route);
  }

  logOut() {
    this.authService.logoutUser();
    this.router.navigateByUrl('/login');
  }

  isSideNav() {
    return Object.keys(this.authService.getCurrentUser()).length > 0;
  }

}

