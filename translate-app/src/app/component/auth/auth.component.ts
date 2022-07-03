import {Component, DoCheck, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, DoCheck {

  loginFormToggle: boolean;
  loginFG: FormGroup;
  registerFG: FormGroup;

  registryCreation = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginFormToggle = false;
    this.loginFG = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.registerFG = this.fb.group({
      email: [null, Validators.required],
      telephone: [null, Validators.required],
      password: [null, Validators.required],
      rewritePassword: [null, Validators.required],
      name: [null, Validators.required],
      surname: [null, Validators.required],
      birthday: [null, Validators.required]
    })
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
    if (!this.registerFG.get('email').invalid
      && !this.registerFG.get('password').invalid
      && !this.registerFG.get('rewritePassword').invalid
      && this.registerFG.get('password').value === this.registerFG.get('rewritePassword').value) {
      this.registryCreation = true;
    } else {
      this.registryCreation = false;
    }
  }


  login() {
    this.loginService.login({
      email: this.loginFG.get('email').value,
      password: this.loginFG.get('password').value})
      .subscribe(result => {
        if (result.token) {
          localStorage.setItem('jwt', JSON.stringify(result.token));
          this.router.navigate(['/profile'])
        }
      });
  }


  registry() {
    this.loginService.register({
      email: this.registerFG.get('email').value,
      password: this.registerFG.get('password').value,
      telephone: this.registerFG.get('telephone').value,
      name: this.registerFG.get('name').value,
      surname: this.registerFG.get('surname').value,
      Date: this.registerFG.get('birthday').value
    })
      .subscribe(result => {
        if (result.token) {
          localStorage.setItem('jwt', JSON.stringify(result.token));
          this.router.navigate(['/profile'])
        }
      })
  }
  toggleForm() {
    this.loginFormToggle = !this.loginFormToggle;
  }


}
