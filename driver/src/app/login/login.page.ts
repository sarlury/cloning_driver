import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Constants } from '../Constants.models';
import { UsersService } from '../services/users.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Token = 'token';
  username: string = "";
  password: string = "";
  isLogin: 'status';
  users: any;
  constructor(
    private http: HttpClient,
    public router: Router,
    public navCtrl: NavController,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    private userService: UsersService
  ) { }

  ngOnInit() {
  }

  ionViewCanEnter(){
   
  }

  // async login() {
  //   if(this.username == null) {
  //     const alert = await this.alertCtrl.create({
  //       message: "Masukan No Handphone Anda",
  //       backdropDismiss: true
  //     });
  //     alert.present();
  //   } else if(this.password == null) {
  //     const alert = await this.alertCtrl.create({
  //       message: "Masukan Password Anda",
  //       backdropDismiss: true
  //     });
  //     alert.present();
  //   } else {
  //     const loading = await this.loadCtrl.create({
  //       message: "Login...",
  //       duration: 2000
  //     });
  //     loading.present();
  //     let headers = new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'X-Api-Key': Constants.USER_API_KEY
  //     })
  //     let options = {
  //         headers: headers
  //     }
  
  //     let body = new HttpParams();
  //     body = body.append('username', this.username);
  //     body = body.append('password', this.password);
  
  //     let httpResult = this.http.post(Constants.URL_API + "user/login", body.toString(), options);
  //     httpResult.subscribe(async res => {
  //       console.log(res);
  //         var parseObject = JSON.parse(JSON.stringify(res));
  //         if(parseObject['status'] == true) {
  //           // console.log("xxxxx");
  //           if(parseObject['data']['banned'] == 0) {
  //             // console.log("ccc");
  //           localStorage.setItem(this.isLogin, parseObject['status']);
  //           localStorage.setItem(this.Token, parseObject['token']);
  //           this.storage.set('token_storage', parseObject['token']);
  //           this.storage.set('users_storage', parseObject['data']);
  //           this.storage.set('username_storage', parseObject['data']['username']);
  //           this.storage.set('email_storage', parseObject['data']['email']);
  //           this.storage.set('pass_storage', parseObject['data']['pass']);
  //           this.navCtrl.navigateRoot(['/']);
  //           this.presentToast(parseObject['message'], 1500);
  //           }
  //         } else {
  //           const alert = await this.alertCtrl.create({
  //             message: parseObject['message'],
  //             backdropDismiss: true
  //           });
  //           alert.present();
  //         }
  //     }, (error) => {
  //       alert("Kombinasi No Hp & Password Salah Atau User Tidak Terdaftar")
  //     });
  //   }
  // }

  async login(username, password) {
    if(this.username == "") {
      this.presentToast("Masukan Nomor Hp Anda", 1500)
    } else if(this.password == "") {
      this.presentToast("Masukan Password Anda", 1500)
    } else {
      this.userService.loginUser(username = this.username, password = this.password).subscribe(res => {
        this.navCtrl.navigateRoot(['/']);
      }
      )

    }
  }


  async presentToast(a, b) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: b,
      position: "middle"
    });
    toast.present();
  }

}
