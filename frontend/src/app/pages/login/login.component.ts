import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { User, UserData } from '../../polling.model';
import { ToastrService } from 'ngx-toastr';
import { PollingService } from '../../services/pollingService';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  providers: [AuthService, PollingService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  faGoogle = faGoogle;
  faHome = faHome;
  loginForm!: FormGroup;
  isUserLoggedIn: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', Validators.required)
    })
  }
  
  goToRegister() {
    this.router.navigateByUrl('register');
  }

  signIn() {
    let userData = {} as User;
    userData.email = this.loginForm.get('email')?.value;
    userData.password = this.loginForm.get('password')?.value;
    this.authService.loginExistingUser(userData).subscribe({
      next: (res: UserData) => {
        this.authService.setCurrentUser(res);
        this.toastr.success("Successfully logged in");
        this.router.navigateByUrl('home'); 
      },
      error: (err: any) => {
        this.toastr.error(err.error?.message || "Invalid credentials");
        this.loginForm.reset();
      }}
    );
  }

  handleGoggleLogin(){
    console.log(this.loginForm);
  }
}
