import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/Ilogin';
import { SignupComponent } from '../common/signup/signup.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {} as User;
  loginForm = new FormGroup({
    mobile: new FormControl(''),
    password: new FormControl('')
  });
  constructor(public dialogRef: MatDialogRef<LoginComponent>, private router: Router, public dialog: MatDialog,
    private loginService: LoginService) { }

  ngOnInit() {
   
  }
  login(){
    let loginData = "{mobile:'" + this.loginForm.controls['mobile'].value + "', password:'"+ this.loginForm.controls['password'].value +"'}";
    this.loginService.loginCustomer(loginData).subscribe((userObj: any)=>{
      this.user.mobileNumber = userObj.mobile;
      this.user.userId = userObj.id;
      this.loginService.loggedIn.next(this.user);
      sessionStorage.setItem('mobileNumber',userObj.mobile);
      sessionStorage.setItem('userId',userObj.id);
      this.onNoClick();
    }, err=>{
      console.log("Username or password is wrong. Please try again.");
    });
  }
  onSignUpClick(){
    this.dialogRef.close();
    setTimeout(() => {
      const dialogRef = this.dialog.open(SignupComponent, {
        data: {}
      });
      dialogRef.afterClosed().subscribe(
        res => console.log(res)
      );
    }, 300);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
