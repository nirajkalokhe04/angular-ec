import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/login/login.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    password: new FormControl('')
  });

  
  constructor(public dialogRef: MatDialogRef<SignupComponent>,private productservice:ProductService, public dialog: MatDialog) { }

  ngOnInit() {
    
  }
  onLoginClick() {
    this.dialogRef.close();
    setTimeout(() => {
      const dialogRef = this.dialog.open(LoginComponent, {
        data: {}
      });
      dialogRef.afterClosed().subscribe(
        res => console.log(res)
      );
    }, 300);
  }
  onRegister(){
    let formData=this.signupForm.value;
    console.log("formData "+formData);
 

  this.productservice.addCustomer(formData).subscribe((loginUser:any)=>{
    let userObj=loginUser;
  
    sessionStorage.setItem('token',userObj.token);
  //   sessionStorage.setItem('userType',userObj.role);
   
  
   


  },err=>{
    //alert("login failer ::: "+err.error.message);
   alert('error login');
})
}

}
