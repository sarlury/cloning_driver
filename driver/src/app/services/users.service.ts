import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, retry, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Constants } from '../Constants.models';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  username: string;
  password: string;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  loginUser(username, password): Observable<any> {

    let body = new HttpParams();
    body = body.append('username', username);
    body = body.append('password', password);

    return this.http.post(Constants.URL_API + "user/login", body.toString())
      .pipe(
        map(res => {
          var parseObject = JSON.parse(JSON.stringify(res));
          localStorage.setItem('token', parseObject['token']);
          this.storage.set('users', parseObject['data']);
        }),
        tap(_ => console.log('respon login')),
        // catchError(this.handleError('login failed', []))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      alert(error.error.message); 
      // this.router.navigate(['/notfound']);
      // alert(error.ok);

      // better job of transforming error for user consumption
      this.log(`${operation} failled: ${error.message}`);

      // let app running by returning an empty result
      return of(result as T);
    };
  }

  // log a heroservice message with the message service
  private log(message: string) {
    console.log(message);
  }

}
