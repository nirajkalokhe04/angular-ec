import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/Ilogin';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User;
  loggedIn = new BehaviorSubject(this.user);
  constructor(private httpClient: HttpClient) { }

  isLoggedIn(): boolean {
    return true;
  }

  loginCustomer(loginData: String): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.httpClient.post<any>(`${environment.baseURL}Customers/login`, loginData, httpOptions);//.pipe(catchError(this.errorHandling.handleError);
  }

}