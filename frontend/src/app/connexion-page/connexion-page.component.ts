import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrls: ['./connexion-page.component.css']
})
export class ConnexionPageComponent {
  constructor(private router: Router) {}

  signUpForm = {
    name: '',
    email: '',
    password: ''
  };

  signInForm = {
    email: '',
    password: ''
  };

  togglePanel() {
    const container = document.getElementById('container');
    // @ts-ignore
    container.classList.toggle("right-panel-active");
  }

  onSignUp() {
    // Handle sign up logic here
    console.log('Sign up form data:', this.signUpForm);
  }

  onSignIn() {
    // Handle sign in logic here
    console.log('Sign in form data:', this.signInForm);
    this.router.navigate(['/chat']);
  }
}
