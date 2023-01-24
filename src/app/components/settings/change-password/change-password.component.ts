import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiError } from '@supabase/supabase-js';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  // Data
  isShow: boolean = false

  // Form
  form: FormGroup = new FormGroup({
    password: new FormControl(null)
  })
  formMsgs = {
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Mininum 8 characters' }
    ]
  }

  // Checker
  isLoading: boolean = false

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      password: new FormControl(
        null, Validators.compose([
          Validators.required
        ]))
    })
  }

  onSubmit(): void {
    if (!this.form.touched) this.form.markAllAsTouched()
    if (this.form.valid) this.doChange()
  }

  async doChange() {
    this.isLoading = true
    
    try {
     await this.authSvc.patchUser(this.form.value)
    } catch(err) {
      if (err instanceof(AuthApiError)) {
        // placeholder 422 error
      }
    } finally {
      this.isLoading = false
      this.toggle()
    }
  }

  toggle() {
    this.isShow = !this.isShow
  }

}
