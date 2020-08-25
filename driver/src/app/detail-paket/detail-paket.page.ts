import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../Constants.models';

@Component({
  selector: 'app-detail-paket',
  templateUrl: './detail-paket.page.html',
  styleUrls: ['./detail-paket.page.scss'],
})
export class DetailPaketPage implements OnInit {

  idx: any;
  id: any;
  Token = 'token';
  data: any;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.idx = (`${this.id}`);
    console.log(this.idx);
    localStorage.getItem('token');
  }

  ionViewDidEnter(){
    this.loadDetail();
   }

   dismiss() {
    this.modalCtrl.dismiss();
  }
 
   loadDetail() {
     let headers = new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'X-Api-Key': Constants.USER_API_KEY,
       'X-Token': localStorage.getItem(this.Token)
     })
     let options = {
         headers: headers
     }
 
     let httpResult = this.http.get(Constants.URL_API + "paket/detail?id_paket="+this.idx+"", options);
     httpResult.subscribe(res => {
       console.log(res);
       var parseObject = JSON.parse(JSON.stringify(res));
       console.log(parseObject['message'])
      //  if(parseObject['status'] == true){
      //    this.data = res['data']['paket'];
      //  } else if(parseObject['status'] == false) {
      //    alert(parseObject['message']);
      //  }
     }, err => {
       console.log("Connection error. Please logout or check your connection.");
     })
   }

}
