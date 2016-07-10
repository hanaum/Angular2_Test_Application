import {Injectable} from '@angular/core';
import {AngularFire, FirebaseAuthState} from 'angularfire2/angularfire2';
import {BehaviorSubject, Observable} from 'rxjs/Rx';

export enum AuthenticationState {
  UNKNOWN,
  LOGGED_IN,
  LOGGED_OUT
}

@Injectable()
export class AuthenticationService {
  private loginState: BehaviorSubject<AuthenticationState> =
      new BehaviorSubject<AuthenticationState>(AuthenticationState.UNKNOWN);
  private authState: FirebaseAuthState;
  public loginState$: Observable<AuthenticationState> = this.loginState.asObservable();

  constructor(private af: AngularFire) { this.subscribeToAuth(); }

  public getUserId(): string { return this.authState == null ? null : this.authState.uid; }

  public login() { this.af.auth.login(); }

  public logout() { this.af.auth.logout(); }

  private subscribeToAuth() {
    this.af.auth.subscribe((auth) => {
      this.authState = auth;
      if (this.authState == null) {
        this.loginState.next(AuthenticationState.LOGGED_OUT);
      } else {
        this.loginState.next(AuthenticationState.LOGGED_IN);
      }
    });
  }
}
