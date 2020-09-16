import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
   this.detailPaket();
  }

  detailPaket(): Observable<any> {
    return this.http.get<any>(Constants.URL_API + "paket/detail?id_paket=" + this.idx +"").pipe(
      map(response => console.log(response))
    )
  }
}
