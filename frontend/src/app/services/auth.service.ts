import { Injectable }     from '@angular/core';
import { Http,
         Response,
         Headers,
         RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs';

@Injectable()
export class AuthService {
  public URL = 'http://localhost:3001';
  constructor(private _http: Http) {}

  isSignIn() {
      return !!window.localStorage.getItem('NJTPUserToken');
  }

  onSignUp(newUser) {
    console.log(`${this.URL}/users`, newUser);
    return this._http.post(`${this.URL}/users`, newUser)
                     .map(this.extractData)
                     .catch(this.handleError);
  }

  onSignIn(user) {
    return this._http.post(`${this.URL}/sessions/create`, user)
                     .map(this.extractData)
                     .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
