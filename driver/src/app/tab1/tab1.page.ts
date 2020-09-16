import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular'
import { Router } from '@angular/router';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  full_name: any;
  subscription: any;
  UniqueDeviceID:string;

  constructor( 
    private storage: Storage,
    private platform : Platform,
    public router: Router,
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit() {
   this.storage.get('users').then(res => {
     console.log(res)
     this.full_name = res.full_name;
   })
  }

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
  });
  }

  
  ionViewWillLeave(){
    this.subscription.unsubscribe();
}

onClick() {
  this.router.navigate(['/maps'])
}

  direction() {
    this.router.navigate(['/direction'])
  }
  

}
