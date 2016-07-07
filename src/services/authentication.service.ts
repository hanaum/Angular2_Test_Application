import {Injectable} from '@angular/core';
import {AngularFire, FirebaseAuthState} from 'angularfire2/angularfire2';
import {BehaviorSubject} from 'rxjs/Rx';

export enum AuthenticationState {
  Unauthenticated,
  Unknown,
  Authenticated
}

@Injectable()
export class AuthenticationService {
  private loginState: BehaviorSubject<AuthenticationState> =
      new BehaviorSubject<number>(AuthenticationState.Unknown);
  private authState: FirebaseAuthState;
  loginState$ = this.loginState.asObservable();

  constructor(private af: AngularFire) { this.subscribeToAuth(); }

  getUserId(): string {
    this.tryAuth();
    return this.authState == null ? null : this.authState.uid;
  }

  getUserEmail(): string { return this.authState == null ? null : this.authState.auth.email; }

  subscribeToAuth() {
    this.af.auth.subscribe((auth) => {
      this.authState = auth;
      this.tryAuth();
      if (this.authState == null) {
        this.loginState.next(AuthenticationState.Unauthenticated);
      } else {
        this.loginState.next(AuthenticationState.Authenticated);
      }
    });
  }

  login() { this.af.auth.login(); }

  logout() { this.af.auth.logout(); }

  private tryAuth() {
    if (this.authState == null) {
      this.authState = this.af.auth.getAuth();
    }
  }
}
