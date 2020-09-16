import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../Constants.models';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailorderService implements OnInit {

  orders: any;
  id_trans: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    
  }

  detailOrder(id_transx): Observable<any> {
    return this.http.get<any>(Constants.URL_API + "transaksi_detail/detail?id_trans="+ id_transx +"")
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError('get details', []))
    )
  }

  kodePenerimaan(noTelp, vcrPengiriman, vcrTrx): Observable<any> {

    let body = new HttpParams();
    body = body.append('noTelp', noTelp);
    body = body.append('kdVoucherPengiriman', vcrPengiriman);
    body = body.append('kdVoucherTrx', vcrTrx)

    return this.http.post<any>(Constants.URL_API + "voucher/kdVoucherTrxverifikasi", body.toString())
    .pipe(
      map(res => {
        console.log(res.message['code'] == "00");
        if(res.message['code'] == "00") {
          alert("Verify")
        } else {
          alert(res.message['description'])
        }
      }),
      catchError(this.handleError('Error details', []))
    )
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
