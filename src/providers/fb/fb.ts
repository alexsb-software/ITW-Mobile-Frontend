import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import 'rxjs/add/operator/map';


@Injectable()
export class FbProvider {

  private _logedIn: boolean = false;
  private FB_APP_ID = 855905901238851;

  constructor(private fb: Facebook) {
    this.fb.browserInit(this.FB_APP_ID, "v2.10")
  }
  onLogin() {
    return this.fb.login(['public_profile','user_friends', 'email']);
  }
  checkIn() {
    this.fb.getLoginStatus()
      .then((res) => {
        if (res.status == 'connected') {
          let options={
            method : 'share',
            href: 'https://www.facebook.com/IEEE.AlexSB.ITW/',
            hashtag: '#ITW17#IEEE#IEEE_AlexSB'
          };
          this.openDialog(options);
        }

      })
      .catch(e => console.log("Error in Check in", e));
  }



  get logedIn(): boolean {
    return this._logedIn;
  }

  set logedIn(value: boolean) {
    this._logedIn = value;
  }
  share(){
    let options={
      method : 'share'
    };
    this.openDialog(options);
  }

  openDialog(options) {
    this.fb.showDialog(options)
      .then(res => console.log(res))
      .catch(e => console.log("Error in Share ", e));
  }

}
