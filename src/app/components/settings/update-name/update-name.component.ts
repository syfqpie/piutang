import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'app-update-name',
  templateUrl: './update-name.component.html',
  styleUrls: ['./update-name.component.css']
})
export class UpdateNameComponent implements OnInit {
  
  // Data
  isShow: boolean = false

  // Form
  form: FormGroup = new FormGroup({
    name: new FormControl(null)
  })
  formMsgs = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'minlength', message: 'Mininum 3 characters' }
    ]
  }

  // Checker
  isLoading: boolean = false

  constructor(
    private fb: FormBuilder,
    private profileSvc: ProfileService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      name: new FormControl(
        this.profileSvc.currentProfile?.name, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ]))
    })
  }

  onSubmit(): void {
    if (!this.form.touched) this.form.markAllAsTouched()
    if (this.form.valid) this.doSave()
  }

  doSave() {
    this.isLoading = true
    
    this.profileSvc.patch(this.form.value)
        .finally(() => {
          this.isLoading = false
          this.toggle()
        })
  }

  toggle() {
    this.isShow = !this.isShow
  }

}
