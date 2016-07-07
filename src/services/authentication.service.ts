import {Injectable} from '@angular/core';
import {AngularFire, FirebaseAuthState} from 'angularfire2/angularfire2';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  // TODO change this to an enum.
  private loginState: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private authState: FirebaseAuthState;
  loginState$ = this.loginState.asObservable();

  constructor(private af: AngularFire) { this.subscribeToAuth(); }

  getUserId(): string {
    if (this.authState == null) {
      this.authState = this.af.auth.getAuth();
    }
    return this.authState == null ? null : this.authState.uid;
  }

  getUserEmail(): string { return this.authState == null ? null : this.authState.auth.email; }

  subscribeToAuth() {
    this.af.auth.subscribe((auth) => {
      if (auth == null) {
        // Workaround for the bug when login -> logout -> login.
        auth = this.af.auth.getAuth();
      }
      this.authState = auth;
      if (this.authState == null) {
        this.loginState.next(-1);
      } else {
        this.loginState.next(1);
      }
    });
  }

  login() { this.af.auth.login(); }

  logout() { this.af.auth.logout(); }
}
