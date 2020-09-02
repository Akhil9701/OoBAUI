import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  // userResponse;
  registerFailed;
  tableBody: any = [];
  tableHeading;
  userRes;
  showUserRegErrPop = false;
  showUserRegSucPop = false;
  respMessage;
  usersList = [];

  // model: any = {};

  value = "normal";

  public options = [
    { value: "normal", id: "Off" },
    { value: "admin", id: "On" }
  ]

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
    // console.log('1   constructor');
    // this.form.value.user_type = this.value;
    // for (let i = 1; i <= 10; i++) {
    //   this.tableBody.push('tb ${i}')
    // }


  }





  ngOnInit() {

    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      user_type: ['normal', [Validators.required]]
      // confirmPassword: ['', Validators.required]
    },
      // {
      //     validator: MustMatch('password', 'confirmPassword')
      //   }
    );

    // console.log('2   ngOnInit');
    // this.form.value.user_type = this.value;
    // console.log('in ngOnint user type', this.form.value.user_type )

    this.auth.getAllUsers(localStorage.getItem('token')).then((res) => {
      // console.log(res)
      this.registeredUsers(res);
    }).catch(err => {
      // console.log(err);
      this.showPopup('Server Error' + err.json.status)
    });



  }

  // get f() {
  //   return this.form.controls;
  // }

  registeredUsers(usersList: any) {
    if (usersList.json().status === 'fail') {
      console.log(' msessage :  ', usersList.json().message);
      this.showPopup(usersList.json().message);
    } else if (usersList.json().status === '0') {
      this.showPopup('Server Error');
    } else {
      this.userRes = usersList.json().user_table;
      this.tableHeading = this.userRes[0];
      this.tableBody = this.userRes;

    }
  }


  showPopup(message) {
    this.respMessage = message;
    this.showUserRegErrPop = true;
    this.showUserRegSucPop = true;
  }

  onSelectionChange(entry) {
    // debugger
    // console.log(entry)
    this.value = entry;
    this.form.value.user_type = entry;
    // console.log('--', this.form.value.user_type);

  }
  // changed() {
  //   this.value1 = this.value
  //   if (this.value === 'admin') {
  //     this.userForm.value.userType = 'admin';
  //   } else {
  //     this.userForm.value.userType = 'normal';
  //   }

  // }

  onSubmit() {
    this.submitted = true;
    // console.log('submit ', this.form.value);
    // console.log('dddddddddd', this.form.invalid);
    if (this.form.invalid) {
      this.showPopup('Invalid details');
      this.showUserRegSucPop = false;
      return;

    }
    var user = this.form.value;
    this.auth.registerUser(user).then((userResponse) => {
      console.log(userResponse)
      console.log('response', userResponse.json())

      if (userResponse.json().status === 'success') {
        // confirm('Registration suceessfully');
        this.showPopup('Registration suceessfully');
        this.showUserRegErrPop = false;
        this.ngOnInit();

      } else {
        this.showPopup('Invalid details');
      }

    })
      .catch((err) => {
        console.log(err)
        this.registerFailed = err.json().message;
        this.submitted = !this.submitted

      })
    this.ngOnInit();
  }

  // onSubmit() {
  //   this.auth.registerUser(this.form.value)
  //     .then((user) => {
  //       localStorage.setItem('token', user.json().auth_token);
  //       alert('User Registration successfull')
  //     })
  //     .catch((err) => {
  //       alert('Invalid credentials')
  //       console.log(err);
  //     });
  // }



}
