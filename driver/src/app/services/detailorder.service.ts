import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../Constants.models';
import { Observable, of } from 'rxjs';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DetailorderService implements OnInit {

  orders: any;
  id_trans: any;

  constructor(
    private http: HttpClient,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController
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

  kodePenerimaan(kdVoucherPengiriman, noTelp, vcrTrx): Observable<any> {
    let body = new HttpParams();
    body = body.append('kdVoucherPengiriman', kdVoucherPengiriman);
    body = body.append('noTelp', noTelp);
    body = body.append('kdVoucherTrx', vcrTrx)

    this.loadPresent();
    return this.http.post<any>(Constants.URL_API + "/voucher/kdVoucherTrxverifikasi", body.toString())
    .pipe(
      map(async res => {
        console.log(res.message['code'] == "00");
        if(res.message['code'] == "00") {
          const toast = await this.toastCtrl.create({
            message: res.message['description'],
            position: 'middle',
            animated: true,
            color: 'success',
            duration: 3000
          });
          toast.present();
        } else {
          const toast = await this.toastCtrl.create({
            message: res.message['description'],
            position: 'middle',
            animated: true,
            color: 'danger',
            duration: 3000
          });
          toast.present();
        }
      }),
      tap(_ => this.log('respons oke')),
      finalize(async () => {
        this.loadCtrl.dismiss();
      }),
      catchError(this.handleError('Error details', []))
    )
  }

  // selesai order
  selesaiOrder(id_trans, kdVoucherTrx, status, notes, cameraData): Observable<any> {
    let body = new HttpParams();
    body = body.append('id_trans', id_trans);
    body = body.append('kode_penerimaan', kdVoucherTrx);
    body = body.append('status', status);
    body = body.append('notes', notes);
    body = body.append('gambar_penerimaan', cameraData);

    this.loadPresent();
    return this.http.post(Constants.URL_API + "transaksi_detail/updatepenerimaan?id_trans="+ id_trans +"", body.toString()).pipe(
      map(async res => {
        console.log(res);
        const toast = await this.toastCtrl.create({
          message: res['message'],
          animated: true,
          position: 'middle',
          duration: 2000,
          color: "success"
        });
        toast.present();
      }),
      finalize(async() => {
        this.loadCtrl.dismiss();
      }),
      catchError(this.handleError('Error details', []))
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

  async loadPresent() {
    const loading = await this.loadCtrl.create({
      message: `<img src="../../assets/spin.gif" class="spiner">`,
      spinner: null
    });
    loading.present();
  }

}
