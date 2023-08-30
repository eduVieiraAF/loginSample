import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdatepopupComponent>,
    private toastr: ToastrService
  ) { }

  editedData: any

  ngOnInit(): void {
    if (this.data.id != null && this.data.id != '') {
      this.service.getUserById(this.data.id).subscribe((res) => {
        this.editedData = res
        this.registerForm.setValue({
          id: this.editedData.id,
          name: this.editedData.name,
          email: this.editedData.email,
          gender: this.editedData.gender,
          role: this.editedData.role,
          isActive: this.editedData.isActive
        })
      })
    }
  }

  registerForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    name: this.builder.control(', ', Validators.required),
    email: this.builder.control('',  Validators.required),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isActive: this.builder.control(false)
  })

  role = ['admin', 'user']

  updateUser() {
    if (this.registerForm.valid) {
      this.service.updateUser(this.registerForm.value.id, this.registerForm.value).subscribe((res) => {
        this.toastr.success("This user has been updated", "USER UPDATED", {
          positionClass: 'toast-top-center'
        })
        this.dialogRef.close()
      })
    }
    else this.toastr.warning("Please enter valid data", "INVALID",
      { positionClass: 'toast-top-center' }
    )
  }
}
