import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

declare var google;
let latLng,lat,long,infoWindow,marker,contentString,address;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  location: any;

  GoogleAutocomplete;
  autocompleteItems;
  autocompleteName;
  autocomplete;

  constructor(public navCtrl: NavController, public httpClient: HttpClient, private zone: NgZone) {
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
      this.autocompleteName = [];
  }

  ionViewDidLoad(){
    this.loadMap();
   }

   loadMap(){
              lat = '19.0760';
              long = '72.8777';

              latLng = new google.maps.LatLng(lat,long);

              let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              }

              this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

              marker = new google.maps.Marker({
                map: this.map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: this.map.getCenter()
              });

              marker.setMap(this.map);

              infoWindow = new google.maps.InfoWindow({
                 maxWidth: 420
               });

               this.googleApi(lat,long);

              google.maps.event.addListener(this.map, 'click', (evt) => {
                  lat = evt.latLng.lat();
                  long = evt.latLng.lng();
                  this.googleApi(lat,long);
              });

              google.maps.event.addListener(marker,'click',(evt) => {
                contentString = "<div class='infowindow'>";
                contentString += this.location+"</div>";
                infoWindow.setContent(contentString);
                infoWindow.open(this.map,marker);
              });


    }

    goButton() {
         let ionicheader = document.querySelector('.slider');
         let ionicbutton = document.querySelector('.menu');

         ionicbutton.classList.remove("closed");
         ionicheader.classList.add("closed");

         this.httpClient.get('http://maps.googleapis.com/maps/api/geocode/json?address='+this.autocompleteName+'&sensor=false').subscribe(data => {

            lat = data['results'][0].geometry.location.lat;
            long = data['results'][0].geometry.location.lng;
            this.googleApi(lat,long);
          });
     }

     openNav() {
         let ionicheader = document.querySelector('.slider');
         let ionicbutton = document.querySelector('.menu');

         ionicheader.classList.remove("closed");
         ionicbutton.classList.add("closed");


     }

     updateSearchResults(){

       if (this.autocomplete.input == '') {
         this.autocompleteItems = [];
         this.autocompleteName = [];
         return;
       }

       this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
     	 (predictions, status) => {
         this.autocompleteItems = [];
         this.autocompleteName = [];
         this.zone.run(() => {
           predictions.forEach((prediction) => {
             this.autocompleteItems.push(prediction.description);
             this.autocompleteName.push(prediction.structured_formatting.main_text);
           });
         });
        });
      }

    googleApi(lat,long){
      this.httpClient.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true').subscribe(data => {
          address = data['results'][0];
          if(address){
            this.location=address.formatted_address;
          }else{
            this.location='Invalid Address';
          }
      });
      latLng = new google.maps.LatLng(lat,long);
      marker.setPosition(latLng);
      this.map.setCenter(latLng);
      infoWindow.close();
    }
}
