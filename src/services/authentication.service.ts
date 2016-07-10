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
  private userId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private authState: FirebaseAuthState = this.firebaseAuth.getAuth();
  public observableAuthenticationState: Observable<AuthenticationState> =
      this.loginState.asObservable();
  public observableUserId: Observable<string> = this.userId.asObservable();

  constructor(private firebaseAuth: FirebaseAuth) { this.subscribeToAuth(); }

  public getUserId(): string { return this.authState == null ? null : this.authState.uid; }

  public login() { this.firebaseAuth.login(); }

  public logout() { this.firebaseAuth.logout(); }

  private subscribeToAuth() {
    this.firebaseAuth.subscribe((auth) => {
      // Workaround since auth might be incorrectly be null.
      if (auth == null) {
        auth = this.firebaseAuth.getAuth();
      }
      this.authState = auth;
      if (this.authState == null) {
        this.loginState.next(AuthenticationState.LOGGED_OUT);
        this.userId.next(null);
      } else {
        this.loginState.next(AuthenticationState.LOGGED_IN);
        this.userId.next(this.authState.uid);
      }
    });
  }
}
