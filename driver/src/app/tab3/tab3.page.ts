import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  full_name: any;
  email: any;
  phone: any;

  constructor(
    private storage: Storage,
    public navCtrl: NavController
  ) {}

  ionViewDidEnter(){
    this.storage.get('users').then(res => {
      this.full_name = res.full_name;
      this.email = res.email;
      this.phone = res.username;
    })
  }


  logout() {
    this.storage.remove('pass_storage');
    this.storage.remove('token');
    this.storage.remove('username_storage');
    this.storage.remove('users');
    this.storage.remove('order_storage');
    localStorage.removeItem('token');
    localStorage.removeItem('undefined');
    this.navCtrl.navigateRoot(['/login']);
  }

}
