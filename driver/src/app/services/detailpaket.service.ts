import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from '../Constants.models';

@Injectable({
  providedIn: 'root'
})
export class DetailpaketService implements OnInit {

  idx: any;
  id: any;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.idx = (`${this.id}`);
    console.log(this.idx);
  }

  ionViewDidEnter(){
   this.detailPaket(null);
  }

  detailPaket(id): Observable<any> {
    return this.http.get<any>(Constants.URL_API + "paket/detail?id_paket=" + id +"").pipe(
      tap(_=> this.log('response received') )
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
