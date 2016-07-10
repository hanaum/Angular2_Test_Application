import {Injectable} from '@angular/core';
import {FirebaseAuth, FirebaseAuthState} from 'angularfire2/angularfire2';
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

  constructor(private firebaseAuth: FirebaseAuth) { this.subscribeToAuth(); }

  public getUserId(): string { return this.authState == null ? null : this.authState.uid; }

  public login() { this.firebaseAuth.login(); }

  public logout() { this.firebaseAuth.logout(); }

  private subscribeToAuth() {
    this.firebaseAuth.subscribe((auth) => {
      this.authState = auth;
      if (this.authState == null) {
        this.loginState.next(AuthenticationState.LOGGED_OUT);
      } else {
        this.loginState.next(AuthenticationState.LOGGED_IN);
      }
    });
  }
}
