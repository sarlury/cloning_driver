import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Constants } from '../Constants.models';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  Token = 'token';
  id_driver: number;
  datas: any;
  statusPaket: any;
  pesanKosong: boolean = true;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    public router: Router,
    public navCtrl: NavController,
    public loadCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.storage.get('users_storage').then(res => {
      console.log(res);
      this.id_driver = JSON.parse(res['id']);
      console.log(this.id_driver);
    });
  }
  ionViewDidEnter(){
    this.loadOrder(null);
    localStorage.getItem('token');
    
  }

  loadOrder(event) {
    this.presentToast();
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Api-Key': Constants.USER_API_KEY,
      'X-Token': localStorage.getItem(this.Token)
    });

    let options = {
        headers: headers
    }

    let httpResult = this.http.get(Constants.URL_API + "transaksi_detail/all?filter="+this.id_driver+"&field=id_aauth_users", options);
    httpResult.subscribe(res => {
      console.log(res);
      setTimeout(() => {
        event.target.complete();
      }, 2000);
      var parseObject = JSON.parse(JSON.stringify(res));
      if(parseObject['status'] == true){
        if(parseObject['total'] == 0) {
          this.pesanKosong = false;
        } else {
          this.datas = res['data']['transaksi_detail'];
          console.log(this.datas);
          this.storage.set('order_storage', this.datas);
          this.datas.forEach(e => {
            if(e['status'] == "0") {
              e['status'] = 'Sedang Diproses'
            } else if(e['status'] == "1") {
              e['status'] = 'Paket Sudah Diambil Driver'
            } else{
              e['status'] = 'Paket Diterima'
            }
          });

        }
      }
    }, err => {
      alert("Connection Error. Please Logout or check your connection.")
    });
  }

  detailOrder(id_trans) {
    this.router.navigate(['/detailorder/' + id_trans + '/']);
  }

  async presentToast() {
    const loading = await this.loadCtrl.create({
      spinner: 'dots',
      duration: 1500
    });
    loading.present();
  }

}
