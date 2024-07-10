import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {GraphqlService} from "../Services/graphql.service";

@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrls: ['./connexion-page.component.css']
})
export class ConnexionPageComponent {
  constructor(private router: Router,
              private graphqlService: GraphqlService) {}

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
    this.graphqlService.createUser(this.signInForm.email,this.signUpForm.name, this.signInForm.password).subscribe(
      (user) => {
        console.log('User created in:', user);

        sessionStorage.setItem('ID-user', String(user.id));
      },
      (error) => {
        console.error('Error created in:', error);
      }
    );
  }

  onSignIn() {
    this.graphqlService.login(this.signInForm.email, this.signInForm.password).subscribe(
      (user) => {
        if(user == null){
          alert("Mot de passe ou identifiants incorrect")
        }
        else{
          alert("connexion reussi")
          sessionStorage.setItem('ID-user', String(user.id));
          this.router.navigate(['/chat/0']);
        }
        console.log('User logged in:', user);
      },
      (error) => {
        console.error('Error logging in:', error);
      }
    );
  }
}
