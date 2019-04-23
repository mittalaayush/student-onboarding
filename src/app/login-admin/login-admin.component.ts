import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentService, AdminI } from '../student.service';
import { FormBuilder, Validators, FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  userForm: FormGroup;
  admins : AdminI[];
  @Output() notify : EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {
    this.student.fetchAdmins();
  }

  constructor(public student: StudentService,public fb: FormBuilder ) {
    
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['',Validators.required]
    });
   }

  userName="";
  password="";  
  loginResult = "";  

  login(){
    this.student.fetchAdmins();
    for (var i = this.student.admin$.value.length - 1; i >= 0; --i) {
      if (this.student.admin$.value[i].username == this.userForm.value.userName
        && this.student.admin$.value[i].password==this.userForm.value.password) {
            localStorage.setItem('admin',JSON .stringify(this.student.admin$.value[i]))
            this.notify.emit(this.student.admin$.value[i].adminName)
      }
  }
      this.loginResult = "Invalid Credentials";
  }

  reset(){
    this.userForm.reset();
  }

}
