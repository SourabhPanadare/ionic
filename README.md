# Initial Setup
  1. sudo apt install npm
  2. sudo apt install nodejs-legacy
  3. npm install -g ionic@latest
  4. curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
  5. sudo apt-get install -y nodejs

# Initial Process
  1. Open Ionic Dashboard -> New App -> App Name -> Create

  2. ionic start --pro-id yourappid
     cd ionicproject

  3. SSH Setting:-
       ionic ssh setup
       passphrase:- Office
       Private Key (../../.ssh/ionic/863797)
       Public Key (../../.ssh/ionic/863797.pub)
       Public Key SHA256:B0dApLr9La7EFTm6AyU3rnLuPS5gTYtB3oCdXjGjBRk

  4. ionic serve

# Cordova Plugin
  1. sudo npm install -g cordova
  2. ionic cordova platform add ios
  3. ionic cordova platform add android
  4. ionic cordova plugin add cordova-plugin-geolocation
  5. ionic cordova plugin add cordova-plugin-nativegeocoder

# Node Plugin
  1. npm install --save @ionic-native/native-geocoder
  2. npm install --save @ionic-native/geolocation

# Git Process
  1. ionic link
  2. git add *
  3. git commit -m 'Your Message'   
  4. git push ionic master

# Ionic Structure
  IonicAppName:-
    src:-
      app:-   app.module.ts
      assets:-images,js,css
      pages:- home
              :- home.html
              :- home.scss
              :- home.ts

  app.module.ts

    import { Geolocation } from '@ionic-native/geolocation';
    import { HttpClientModule } from '@angular/common/http';

    @NgModule({
      imports: [
        HttpClientModule,
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        Geolocation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
      ]
    })

  index.html

    <script src="http://maps.google.com/maps/api/js?key=AIzaSyDTHeEmWADpCEfjlZ_6FbN3p2by__-Tygg&libraries=places">
    </script>

  home.html

    <ion-header>
      <ion-navbar>
          <ion-title>Page1</ion-title>
      </ion-navbar>

      <ion-toolbar>
          <ion-title>Subheader</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>

          <ion-col>
            <ion-item tappable (click)="goButton()"></ion-item>
          </ion-col>

          <ion-col>
          </ion-col>

        </ion-row>
      </ion-grid>
    </ion-content>

  home.scss

    page-home {

    }

  home.ts

    import { HttpClient } from '@angular/common/http';

    declare var google;
    let latLng,lat,long;

    @Component({
      selector: 'page-home',
      templateUrl: 'home.html'
    })

    export class HomePage {
      map: any;
      location: any;

      utocompleteItems;
      autocompleteName;

      constructor(public navCtrl: NavController, public httpClient: HttpClient) {
          this.autocomplete = { input: '' };
          this.autocompleteItems = [];
      }

      ionViewDidLoad(){
        this.loadMap();
       }

       loadMap(){
         this.googleApi(lat,long);
       }

       googleApi(lat,long){

       }

       goButton() {

       }
    }
