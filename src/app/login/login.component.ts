import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { URLHelper } from '../URLHelper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  loginFailed;
  invalidUser = false;
  urls=URLHelper.urls;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    if (this.auth.loggedIn()) {
      // this.router.navigate(['/datavis']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])], password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    var user = this.form.value;
    user.email = user.uname;
    delete user.uname;
    // console.log('login user details  ', user);
    this.auth.login(user)
      .then((user) => {
        localStorage.setItem('token', user.json().auth_token);
        localStorage.setItem('sssss',user.json().user_type);
        this.auth.setCookie('token', user.json().auth_token);
        this.auth.checkSpace(user);
        //  console.log(user.json());
        // if (user.json().user_type === 'executive') {
          this.router.navigateByUrl('datavis/reporting');
          // call checkSpace (user) of reportComponnent
          // this.auth.checkSpace(user);
        // } else if (user.json().user_type === 'admin') {
          // this.urls.user = true;
          // this.router.navigateByUrl('datavis/reporting');
          
        // } else { 
          // this.urls.user =false;
          // this.router.navigateByUrl('datavis/reporting');
        // }
      })
      .catch((err) => {
        console.log(err);
        this.loginFailed = err.json().message;
        this.invalidUser = !this.invalidUser;
        console.log('error ', this.loginFailed);
      });
  }
}
