import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  backendUrl = `http://localhost:5000`;

  constructor(
    private http: HttpClient
  ) { }

  register(user: any): Observable<any> {
    const endpoint = `${this.backendUrl}/api/auth/register`;
    return  this.http.post(endpoint, user);
  }
  login(user: any): Observable<any> {
    const endpoint = `${this.backendUrl}/api/auth/login`;
    return this.http.post(endpoint, user)
  }
  isSession(): Observable<any>{
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const endpoint = `${this.backendUrl}/api/auth/session-validation`;
    return this.http.post(endpoint, jwt);
  }
}
