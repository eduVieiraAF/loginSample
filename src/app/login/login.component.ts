import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData: any

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) { }

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.getUserById(this.loginForm.value.username).subscribe((res) => {
        this.userData = res;
        if (this.userData.id === this.loginForm.value.username) {
          if (this.userData.password === this.loginForm.value.password) {
            if (this.userData.isActive) {
              sessionStorage.setItem('username', this.userData.id);
              sessionStorage.setItem('role', this.userData.role);

              this.toastr.success("Login Successful", "LOGIN", {
                positionClass: 'toast-top-center'
              });
              this.router.navigate(['user']);
            } else {
              this.toastr.warning("User is not active, please contact admin", "INACTIVE USER", {
                positionClass: 'toast-top-center'
              });
            }
          } else {
            this.toastr.error("Invalid password", "NOT ALLOWED", {
              positionClass: 'toast-top-center'
            });
          }
        }
      },
        (error) => {
          console.error(error);
          this.toastr.error("User does not exist", "USER NOT FOUND", {
            positionClass: 'toast-top-center'
          });
        }
      );
    } else {
      this.toastr.warning("Please enter valid data", "INVALID", {
        positionClass: 'toast-top-center'
      });
    }
  }

}
