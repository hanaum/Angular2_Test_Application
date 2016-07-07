import {Injectable} from '@angular/core';
import {FirebaseAuth, FirebaseAuthState} from 'angularfire2/angularfire2';
import {BehaviorSubject, Observable} from 'rxjs/Rx';

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

  constructor(private firebaseAuth: FirebaseAuth) { this.subscribeToLoginState(); }

  getUid(): string {
    this.tryAuth();
    return this._getUid(this.authState);
  }

  getUserEmail(): string { return this.authState == null ? null : this.authState.auth.email; }

  subscribeToLoginState() {
    this.firebaseAuth.subscribe((auth) => {
      this.authState = auth;
      this.tryAuth();
      if (this.authState == null) {
        this.loginState.next(AuthenticationState.Unauthenticated);
      } else {
        this.loginState.next(AuthenticationState.Authenticated);
      }
    });
  }

  subscribeToUid(): Observable<FirebaseAuthState> { return this.firebaseAuth.asObservable(); }

  login() { this.firebaseAuth.login(); }

  logout() { this.firebaseAuth.logout(); }

  private _getUid(authState: FirebaseAuthState): string {
    return authState == null ? null : this.authState.uid;
  }

  private tryAuth() {
    if (this.authState == null) {
      this.authState = this.firebaseAuth.getAuth();
    }
  }
}
