import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Diagnostic } from 'ionic-native';
import { CameraPreview, CameraPreviewRect } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  checkPermissions() {
    Diagnostic.isCameraAuthorized().then((authorized) => {
      if(authorized)
        this.initializePreview();
      else {
        Diagnostic.requestCameraAuthorization().then((status) => {
          if(status == Diagnostic.permissionStatus.GRANTED)
            this.initializePreview();
          else {
            // Permissions not granted
         /*   // Therefore, create and present toast
            this.toastCtrl.create(
                {
                  message: "Cannot access camera",
                  position: "bottom",
                  duration: 5000
                }
            ).present();*/
          }
        });
      }
    });
  }

  initializePreview() {
    // Make the width and height of the preview equal
    // to the width and height of the app's window
     let previewRect: CameraPreviewRect = {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Start preview
    CameraPreview.startCamera(
        previewRect,
        'rear',
        false,
        false,
        true,
        1
    );
  }

  takePicture() {
    CameraPreview.takePicture({maxWidth: 320, maxHeight: 320});
  }

  changeEffect() {
    // Create an array with 5 effects
    let effects: any = ['none', 'negative','mono', 'aqua', 'sepia'];

    let randomEffect: string = effects[Math.floor(
        Math.random() * effects.length)];
    CameraPreview.setColorEffect(randomEffect);
  }

}
