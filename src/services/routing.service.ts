import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, Observable, Subscription} from 'rxjs/Rx';

const URL_BASE_PATH: string = 'choosetogo.hanaum.com/#';

@Injectable()
export class RoutingService {
  private urlPathSubscription: Subscription;
  private routeState: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public observableRouteState: Observable<string> = this.routeState.asObservable();

  constructor(private router: Router) {
    this.urlPathSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeState.next(URL_BASE_PATH + event.url);
      }

    });
  }

  /**
   *
   * @param listId
   */
  public navigateToList(listId: string) {
    let link: string[] = ['/list', listId];
    this.router.navigate(link);
  }

  public navigateToUserlist() {
    let link: string[] = ['/userlist'];
    this.router.navigate(link);
  }

  public navigateToHomepage() {
    let link: string[] = [''];
    this.router.navigate(link);
  }
}