import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../Constants.models';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap, retry, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  id_driver: any;
  orders: any;

  constructor(
    private http: HttpClient,
    public router: Router,
    private storage: Storage
  ) { }

  ngOnInit(): void {
   
  }

  // get all order for current driver
  loadOrder(id: any): Observable<any> {
    return this.http.get<any>(Constants.URL_API + "transaksi_detail/all?filter="+ id +"&field=id_aauth_users")
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('get Details', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // log
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  private log(message: string) {
    console.log(message);
  }


}
