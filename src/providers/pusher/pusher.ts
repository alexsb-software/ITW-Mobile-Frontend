import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController} from "ionic-angular";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Storage} from "@ionic/storage";

/*
 Generated class for the PusherProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
declare var Pusher: any;

@Injectable()
export class PusherProvider {

  constructor(public http: Http,private toastCtrl: ToastController , private localnotifications: LocalNotifications,
              private storage: Storage) {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    let env = this;
    var pusher = new Pusher('a77c6db33a10e6568489', {
      cluster: 'eu',
      encrypted: true
    });
    this.storage.set('updates',[]);
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      console.log("Pusher data are : \n",data);
      env.storage.get('updates')
        .then(res=> res.push(data.message))
        .catch(e => console.log(e));
      //uncomment this to show toast
      // env.presentToast(data.message);
      env.localnotifications.schedule({
        id: 1,
        title: "ITW",
        text: data.message
      });
    });
  }

  presentToast(messege: string) {
    let toast = this.toastCtrl.create({
      message: messege,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
