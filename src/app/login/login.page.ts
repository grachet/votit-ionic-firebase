import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
    'email': [
      {type: 'required', message: 'L\'email est requis.'},
      {type: 'pattern', message: 'Veuillez entrer une adresse mail valide.'}
    ],
    'password': [
      {type: 'required', message: 'Le mot de passe est requis.'},
      {type: 'minlength', message: 'Le mot de passe doit avoir au minimum 5 caractères.'}
    ]
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/home']);
      }, err => {
        this.errorMessage = err.message;
        console.log(err);
      });
  }

  goRegisterPage() {
    this.router.navigate(['/register']);
  }
}
