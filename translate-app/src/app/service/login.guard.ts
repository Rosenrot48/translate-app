import { Injectable } from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoginService} from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService,
              protected router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    const url = state.url;
    return this.loginService.isSession().pipe(
      map(value => {
        if (!value) {
          this.router.navigate(['/login']);
          return false;
        }
        this.router.navigate([url]);
        return true;
      })
    )
  }
}
