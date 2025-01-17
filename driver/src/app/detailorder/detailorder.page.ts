import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from '../Constants.models';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DetailPaketPage } from '../detail-paket/detail-paket.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { DetailorderService } from '../services/detailorder.service';

@Component({
  selector: 'app-detailorder',
  templateUrl: './detailorder.page.html',
  styleUrls: ['./detailorder.page.scss'],
})
export class DetailorderPage implements OnInit {

  // scannedData: any;
  encodeData: any;
  barcodeScannerOptions: BarcodeScannerOptions;

  lat: any;
  lng: any;

  aktif: boolean = false;
  isVerif: boolean = false;
  bayarDisabled: boolean = true;
  backHidden: boolean = false;
  voucherDisabled: boolean = false;
  mydate: Date;
  today = Date();
  cardHidden: boolean = true;
  data: any;
  pesanSelesai: boolean = true;
  base64Image: any;
  cameraData: string;

  full_name: string;
  alamat_user: string;
  nama_marchant: string;
  alamat_merchant: string;
  telpUser: string;
  nama_paket: string;
  orders: any;
  id_trans: any;
  telponDriver: any;
  tel: any;
  start: boolean = false;
  end: boolean = true;
  noteDisabled: boolean = true;
  btnNote: boolean = true;
  kode: boolean = true;
  containerNotes: boolean = true;
  notes: string = "";

  Token = 'token';
  kdPenerimaan: any;
  kdVoucherPengiriman: string = "";
  statusPaket: any;
  kdVoucherTrx: string = "";
  kdv: any;
  isKdv: boolean = false;
  server: string;
  isCamera: boolean = true;

  constructor(
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
    private http: HttpClient,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    private launchNavigator: LaunchNavigator,
    public alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private geolocation: Geolocation,
    public modalCtrl: ModalController,
    public actionCtrl: ActionSheetController,
    public camera: Camera,
    private base64: Base64,
    public actionSheet: ActionSheetController,
    private detailOrderService: DetailorderService
  ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
   }

  ngOnInit() {
    this.mydate = new Date();
    this.mydate.setDate(this.mydate.getDate() + 1);
    this.orders = this.activatedRoute.params.subscribe(res => {
      console.log(res);
      this.id_trans = res.id_trans;
    });
    this.loadData();
    this.storage.get('users').then(res => {
      console.log(res);
      this.telpUser = res
    })
  }

  // scan kode penerimaan
  scanCode() {
    this.barcodeScanner
    .scan()
    .then(barcodeData => {
      // alert("Barcode Data:" + JSON.stringify(barcodeData));
      this.kdVoucherTrx = barcodeData['text'];
      this.cekKode(null, null, null);
    })
    .catch(err => {
      console.log("Error", err)
    });
  }

  ionViewDidEnter(){
    this.storage.get('id_trans').then(res => {
      if(res == null) {
        this.start = false;
        this.end = true;
      } else if(res == this.id_trans) {
        this.end = false;
        this.start = true;
        this.isCamera = false;
        this.noteDisabled = false;
      }
    })
  }
  
  back() {
    this.router.navigate(['tabs/tab2']);
  }

  // load isi orderan
  loadData() {
    this.detailOrderService.detailOrder(this.id_trans).subscribe(res => {
      console.log(res);
      this.data = res['data']['transaksi_detail'];
      if(this.data['status'] == "0") {
                this.statusPaket = 'Sedang Diproses';
                this.pesanSelesai = true;
                this.isCamera = true;
              } else if(this.data['status'] == "1") {
                this.statusPaket = 'Paket Sudah Diambil Driver';
                this.containerNotes = false;
              } else {
                this.statusPaket = 'Paket Diterima';
                this.pesanSelesai =  false;
                this.containerNotes = true;
                this.isCamera = true;
              }
    })
  }

  
 

  // actionsheet detail pesanan
  async detail_paket(id_paket) {
    const modal = await this.modalCtrl.create({
      component: DetailPaketPage,
      componentProps: {
        id: id_paket
      }
    });
    modal.present();
  }

    // rubah kode jadi barcode
    encodedText() {
      this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.data['kode_transaksi'])
      .then(
        encodedData => {
          console.log(encodedData);
          this.data['kode_transaksi'] = encodedData;
        },
        err => {
          console.log("Error oncured:", err);
        }
      )
    }


  // button mulai
  mulai(id_trans) {
    this.storage.get('id_trans').then(async res => {
      if(res == null) {
      this.storage.set('id_trans', id_trans)
      console.log(id_trans);
      this.start = true;
      this.end = false;
      this.kode = false;
      this.noteDisabled = false;
      this.btnNote = false;
      this.isCamera = false;
      
      // buka google maps
        let options: LaunchNavigatorOptions = {
          start: [this.data['id_merchant']['ltd_start'], this.data['id_merchant']['lng_start']],
          app: this.launchNavigator.APP.GOOGLE_MAPS
        }
    
        let destination = [this.data['ltd_end'], this.data['lng_end']];
    
        this.launchNavigator.navigate(destination, options)
        .then(success => {
        console.log(success);
        }, error => {
          console.log(error);
        });
      } else {
        const alert = await this.alertCtrl.create({
          message: "Ada order yang belum Anda selesaikan.",
          buttons: [{
            text: 'Ok',
            role: 'ok'
          }]
        });
        alert.present();
      }
    })
    

  }

  // maps to user
  toUser() {
    // this.router.navigate(['/direction']);

      this.geolocation.getCurrentPosition().then(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }, error => {
        console.log('error', error);
      })
      
        let options: LaunchNavigatorOptions = {
          start: [this.lat,this.lng],
          app: this.launchNavigator.APP.GOOGLE_MAPS
        }
    
        let destination = [this.data['ltd_end'], this.data['lng_end']];
    
        this.launchNavigator.navigate(destination, options)
        .then(success => {
        console.log(success);
        }, error => {
          console.log(error);
        })
  }
  // end maps to user

  // maps to merchant
  toMerchant() {
    // this.router.navigate(['/direction']);
      this.geolocation.getCurrentPosition().then(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }, error => {
        console.log('error', error);
      })
      
        let options: LaunchNavigatorOptions = {
          start: [this.lat,this.lng],
          app: this.launchNavigator.APP.GOOGLE_MAPS
        }
    
        let destination = [this.data['id_merchant']['ltd_start'], this.data['id_merchant']['lng_start']];
    
        this.launchNavigator.navigate(destination, options)
        .then(success => {
        console.log(success);
        }, error => {
          console.log(error);
        })
  }
  // end maps to merchant

  call() {
    window.open(`tel:${this.telponDriver}`, '_system');
    console.log(this.tel);
  }


  // button cek kode penerimaan
  cekKode(kdVoucherPengiriman, noTelp, vcrTrx) {
    if(this.kdVoucherTrx == "") {
      this.presentToast("Kode Penerimaan masih kosong", 1500);
    } else {
      this.detailOrderService.kodePenerimaan(
        kdVoucherPengiriman = this.kdVoucherTrx, 
        noTelp =  this.data['user_phone'], 
        vcrTrx =  this.data['kode_voucher']).subscribe(res => {
        console.log("cek kode",res);
        this.isKdv = true;
        this.kdv = this.kdVoucherTrx;
      });

    }
  }

//   cekKode() {
//       if(this.kdVoucherTrx == "") {
//         alert("Anda Belum Input Kode Penerimaan");
//       } else {
//         let headers = new HttpHeaders({
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'X-Api-Key': Constants.USER_API_KEY,
//           'X-Token': localStorage.getItem(this.Token)
//         })
//         let options = {
//             headers: headers
//         }
  
//         let body = new HttpParams();
//         body = body.append('noTelp', this.data['user_phone']);
//         body = body.append('kdVoucherPengiriman', this.data['kode_voucher']);
//         body = body.append('kdVoucherTrx', this.kdVoucherTrx);
  
//         let httpResult = this.http.post(Constants.URL_API + "voucher/kdVoucherTrxverifikasi", body.toString(), options);
//         httpResult.subscribe(res => {
//           console.log(res);
//           var parseObject = JSON.parse(JSON.stringify(res));
//           if(parseObject['message']['code'] == "00") {
//             alert("kode Terverifikasi");
//             this.isKdv = true;
//             this.kdv = this.kdVoucherTrx;
//           } else {
//             alert(parseObject['message']['description']);
//           }
//         }, err => {
//           alert("Connection Error. Please Logout or check your connection.");
//         });

//       }
// }

// camera

async presentActionSheet() {
  let actionSheet = await this.actionSheet.create({
    header: 'Select Image Source',
    mode: 'md',
    buttons: [
      {
        text: 'Load From Library',
        icon: 'image',
        handler: () => {
          this.openGallery();
        }
      },
      {
        text: 'Use Camera',
        icon: 'camera',
        handler: () => {
          this.openCamera();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
  });
  actionSheet.present();
}



openCamera() {
  const options: CameraOptions = {
    quality: 100,
    targetHeight: 300,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData = imageData;
    this.base64Image = `data:image/png;base64,${imageData}`;
  });
}

openGallery() {
  const options: CameraOptions = {
    quality: 100,
    targetHeight: 300,
    targetWidth: 600,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData = imageData;
    this.base64Image = `data:image/png;base64,${imageData}`;
  }); 
}

// end camera


// button selesai ini akan update ke tabel detail transaksi
    selesai(id_trans, kdVoucherTrx, status, notes, cameraData) {
      if(this.notes == "") {
        this.presentToast("Anda belum mengisi Notes", 1500);
      } else {
        this.detailOrderService.selesaiOrder(
          id_trans = this.id_trans, 
          kdVoucherTrx = this.kdVoucherTrx, 
          status = '2', 
          notes = this.notes,
          cameraData = this.cameraData).subscribe(async res => {
          console.log("berhasil disimpan",res);
          this.storage.remove("id_trans");
          // const alert = await this.alertCtrl.create({
          //           message: "Paket Berhasil Dikirim",
          //           backdropDismiss: true,
          //           buttons: [{
          //             text: "Ok"
          //           }]
          //         });
          //         alert.present();
                  this.router.navigate(['/tabs']); 
        });

      }
    }
  // async selesai() {
  //   this.storage.remove('id_trans');
  //   if(this.notes == "") {
  //     alert("Anda Belum Mengisi Notes");
  //   } else if(this.cameraData == null) {
  //     alert("Anda Belum Memfoto Customer");
  //   } else {
  //     let headers = new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'X-Api-Key': Constants.USER_API_KEY,
  //       'X-Token': localStorage.getItem(this.Token)
  //     })
  //     let options = {
  //         headers: headers
  //     }
  
  //     let body = new HttpParams();
  //     body = body.append('id_trans', this.id_trans)
  //     body = body.append('kode_penerimaan', this.kdVoucherTrx);
  //     body = body.append('status', "2");
  //     body = body.append('notes', this.notes);
  //     body = body.append('gambar_penerimaan', this.cameraData)
  
  //     let httpResult = this.http.post(Constants.URL_API + "transaksi_detail/updatepenerimaan?id_trans"+this.id_trans+"", body.toString(), options);
  //     httpResult.subscribe(async (res) => {
  //       console.log(res);
        
  //       const alert = await this.alertCtrl.create({
  //         message: "Paket Berhasil Dikirim",
  //         backdropDismiss: true,
  //         buttons: [{
  //           text: "Ok"
  //         }]
  //       });
  //       alert.present();
  //       this.router.navigate(['/tabs']);
  //     }, err => {
  //       alert("Connection Error. Please Logout or check your connection.");
  //     });

  //   }
  // }

async presentToast(a, b) {
  const toast = await this.toastCtrl.create({
    message: a,
    duration: b,
    position: 'middle'
  });
  toast.present();
}

async loadingPresent(a) {
  const loading = await this.loadCtrl.create({
    message: a
  });
  loading.present();
}



}
