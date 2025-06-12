import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../polling.model';
import { PollingService } from '../../services/pollingService';

export function PasswordMatchValidator(formGroup: AbstractControl) : ValidationErrors | null {
  const password = formGroup.get('password')?.value;
  const cPassword = formGroup.get('confirmPassword')?.value;
  if(password != cPassword) {
    formGroup.get('password')?.setErrors({invalidPassword: true});
    formGroup.get('confirmPassword')?.setErrors({invalidPassword: true});
    return {passwordMismatch: true};
  }
  formGroup.get('password')?.setErrors(null);
  formGroup.get('confirmPassword')?.setErrors(null);
  return null;
}

@Component({
  selector: 'app-register',
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [AuthService, PollingService]
})
export class RegisterComponent {

  faGoogle = faGoogle;
  registerForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private toastr:ToastrService) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', Validators.required),
      confirmPassword: this.fb.control('',Validators.required)
    }, {validators: PasswordMatchValidator});
    console.log(this.registerForm);
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }

  registerUser() {
    if(this.registerForm.valid) {
      console.log(this.registerForm);
      let userData = {} as User;
      userData.userName = this.registerForm.get('name')?.value;
      userData.email = this.registerForm.get('email')?.value;
      userData.password = this.registerForm.get('password')?.value;
      this.authService.saveUser(userData).subscribe(val => {
        console.log(val);
        if(val){
          this.toastr.success('Succesfully registered an account');
          this.authService.setCurrentUser(val);
          this.router.navigateByUrl('');
          console.log(this.authService.getCurrentUser());
        }
      });
    }
  }
}
