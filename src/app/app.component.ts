import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordChecker } from './custom-validators/password-checker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'signup-app';
  registerForm!: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTermsAndConditions: [false, Validators.requiredTrue],
      },
      {
        validators: passwordChecker('password', 'confirmPassword'),
      }
    );
  }

  get formHelper() {
    return this.registerForm.controls;
  }

  onSubmitForm = () => {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    alert('Successful Signup!');
  };

  onResetForm = () => {
    this.submitted = false;
    this.registerForm.reset();
  };
}
