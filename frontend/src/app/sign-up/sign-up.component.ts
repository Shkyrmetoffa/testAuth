import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { AuthService }       from '../services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  private newUser: any = {
    username: '',
    password: '',
    extra: ''
  };
  private stream: any;
  constructor( private _authService: AuthService,
               private _router: Router ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.stream = this._authService.onSignUp(this.newUser)
      .subscribe( user => {
        this._authService.onSignIn( { username: this.newUser.username, password: this.newUser.password, extra: this.newUser.extra } )
          .subscribe( user => {
            window.localStorage.setItem('NJTPUserToken', `Bearer ${user.token}`);
            this._router.navigate(['reports']);
          })
    })
  }
}
