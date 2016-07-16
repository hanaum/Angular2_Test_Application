import {AuthMethods, AuthProviders} from 'angularfire2/angularfire2';

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCkIwlM9xp_nI93k8XmEAjXoCy5dLQAwOY',
  authDomain: 'choosetogo-61e03.firebaseapp.com',
  databaseURL: 'https://choosetogo-61e03.firebaseio.com',
  storageBucket: 'choosetogo-61e03.appspot.com',
};

export const FIREBASE_AUTH_CONFIG = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};
