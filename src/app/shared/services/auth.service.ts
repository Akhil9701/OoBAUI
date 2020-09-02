import { Injectable, Injector } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userData: any = [];
  public loginstatus;
  
  // reading rootURL from configURLs.json file
  root = environment.flaskRoot;

  private BASE_URL = `${this.root}/auth`;

  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  

  
  constructor(private http: Http, private router: Router, private cookieService: CookieService, private injector: Injector) {
    
    
  }


  


  login(user): Promise<any> {
    const url = `${this.BASE_URL}/login`;
    // console.log('auth service url:  ' , url );
    // console.log('auth service user :  ', user);
    // localStorage.setItem('currentUser',JSON.stringify(user));
    return this.http.post(url, user, { headers: this.headers }).toPromise();
    
  }

  // login(user):Observable<any>{
  //   const url = `${this.BASE_URL}/login`;
  //   console.log('data',JSON.stringify(user));
  //   return this.http.post(url, user, { headers: this.headers }).pipe(map(user=>{
  //     if(user){
  //       localStorage.setItem('currentUser',user.json().user_type);
  //       // localStorage.getItem('currentUser');
  //       // console.log('qqq',localStorage.getItem('currentUser'));
  //       // console.log('eee',user.json().user_type);
  //       // this.currentUserSubject.next(user);
  //     }
  //     return user;
  //   }));
    
  // }


  checkSpace(userdetails: any) {
    this.userData = userdetails;
    //  console.log('checking text', this.userData._body);
     localStorage.setItem('users',this.userData._body);

   
  }

  userDetails() {
    // console.log('checking texts', this.userData);
    return this.userData;

  }

  ensureAuthenticated(token): Promise<any> {
    const url = `${this.BASE_URL}/status`;
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get(url, { headers: headers }).toPromise();
  }


  getToken() {
    var token_cookie = this.getCookie("token");
    var token_LS = localStorage.getItem('token');
    if (token_cookie != token_LS) {
      // if (token_LS=="") {
      // token_cookie="";
      this.deleteCookie('token');
      // }
      localStorage.setItem('token', '');
      return ""
    }
    return token_cookie;
  }



  async getStatus() {
    let token = this.getToken();
    const url = `${this.BASE_URL}/status`;
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    await this.http.get(url, { headers: headers }).toPromise().then(
      (data) => {
        this.loginstatus = data;
      }
    ).catch((err) => {
      this.loginstatus = err;
    });
    // return true
  }

  async loggedIn(): Promise<any> {
    let token = this.getToken();
    if (token) {
      await this.getStatus();
      if (this.loginstatus.json().status === 'success') {

        return true;

      } else {
        localStorage.removeItem('token');
        localStorage.clear();
        return false;
      }
    } else {
      localStorage.clear();
      return false;
    }
  }

  logoutUser() {

    localStorage.removeItem('token');
    this.cookieService.deleteAll('../');
    this.deleteCookie('token');
    localStorage.clear();
    this.router.navigateByUrl('/login');

  }

  // Cookie API
  setCookie(key: string, value: string) {
    return this.cookieService.set(key, value);
  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  deleteCookie(key: string) {
    this.cookieService.delete(key);
  }
  checkCookie(key: string) {
    return this.cookieService.check(key);
  }
  getAllCookies() {
    return this.cookieService.getAll();
  }
  deleteAllCookies() {
    return this.cookieService.deleteAll('../');
  }


  registerUser(user): Promise<any> {
    const url = `${this.BASE_URL}/register`;
    console.log('auth service url:  ', url);
    console.log('auth service user :  ', JSON.stringify(user));
    return this.http.post(url, user, { headers: this.headers }).toPromise();
  }





  getAllUsers(token): Promise<any> {
    // let token = this.getToken();
    // console.log('token', token)
    var httpOptions = {
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF_8',
        'Authorization': `Bearer ${token}`
      })
    }
    const url = `${this.BASE_URL}/users`;
    // console.log('auth service url:  ', url);
    // console.log('headers', httpOptions);
    return this.http.get(url, httpOptions).toPromise();
  }

}
