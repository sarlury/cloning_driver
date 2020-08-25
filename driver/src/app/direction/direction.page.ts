import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.page.html',
  styleUrls: ['./direction.page.scss'],
})
export class DirectionPage implements OnInit {


  constructor(
    public navCtrl: NavController,
    private storage: Storage
  ) { 
   
  }

  ngOnInit() {
   
  }

  ionViewDidLoad(){
  }


 

}
