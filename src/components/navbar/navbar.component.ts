import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Rx';

import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'nav-bar',
  template: require('./navbar.component.html'),
  styles: [require('./navbar.component.css')]
})

/**
 * NavbarComponent renders the navbar.
 */
export class NavbarComponent {
  // 0 is unknown. 1 is logged in. -1 is not logged in.
  private loggedIn: number = 0;
  private loginSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginSubscription =
        this.authenticationService.loginState$.subscribe((state) => { this.loggedIn = state; });
  }

  ngOnDestroy() { this.loginSubscription.unsubscribe(); }

  login() { this.authenticationService.login(); }

  logout() { this.authenticationService.logout(); }
}
