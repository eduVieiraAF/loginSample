import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
  }

  registerForm = this.builder.group({
    id: this.builder.control('', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ])),
    email: this.builder.control('', Validators.compose([
      Validators.email,
      Validators.required
    ])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isActive: this.builder.control(false, Validators.required)
  })

  proceedRegistration() {
    if (this.registerForm.valid) {
      this.service.saveUser(this.registerForm.value).subscribe((res => {
        this.toastr.success("Contact admin to activate this account...", "USER SAVED", {
          positionClass: 'toast-top-center'
        })
        this.router.navigate(['login'])
      }))
    }
    else this.toastr.warning("Please enter valid data", "INVALID",
    { positionClass: 'toast-top-center' }
    )
  }
}
