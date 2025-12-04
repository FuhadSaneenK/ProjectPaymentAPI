import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { fullName, username, password } = this.signupForm.value;
      
      this.authService.signup({ fullName, username, password }).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Navigation is handled by AuthService
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Signup failed. Please try again.';
          console.error('Signup error:', error);
        }
      });
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  signupWithGoogle(): void {
    console.log('Signup with Google');
    // TODO: Implement Google OAuth
  }

  signupWithGithub(): void {
    console.log('Signup with Github');
    // TODO: Implement Github OAuth
  }
}
