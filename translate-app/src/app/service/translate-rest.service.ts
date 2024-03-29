import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslateRestService {

  backendUrl = `http://localhost:5000`;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    const endpoint = `${this.backendUrl}/api/users/`;
    return this.http.get(endpoint);
  }
  getTranslate(word: string): Observable<any> {
    const endpoint = `${this.backendUrl}/api/translate/${word}`;
    return this.http.get(endpoint);
  }
}
