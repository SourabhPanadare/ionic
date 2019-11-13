# Reference
  https://www.djamware.com/post/5d12b5b880aca754f7a9d1f6/ionic-4-angular-8-tutorial-learn-to-build-crud-mobile-apps

# Application Process (rest-api.service.ts)
  $ ionic serve -l:- localhost:8200:- Main Project
  $ json-server -p 4000 --watch db.json:- localhost:4000:- Json Server to serve json files as database

# Initial Setup

  $ sudo npm install -g ionic
  $ ionic start ionic4-angular6-crud sidemenu --type=angular
  $ cd ./ionic4-angular6-crud
  $ npm install --save-dev @ionic/lab
  $ ng add @angular/material
  $ ionic serve -l

# Library Installation

  $ ionic g service rest-api, ionic g module material
  $ ionic g page detail, ionic g page edit, ionic g page create

# Json Server Configuration For Testing

  $ npm config set registry http://registry.npmjs.org/
  $ npm config set strict-ssl false
  $ sudo npm install -g json-server
  json-server -v
  json-server -p 4000 --watch db.json

# Project structure

  src/app
      app-routing.module.ts, app.component.html, app.component.ts, app.module.ts, rest-api.service.ts
      create/
        create.module.ts, create.page.html, create.page.scss, create.page.ts
      detail/
        detail.module.ts, detail.page.html, detail.page.scss, detail.page.ts
      edit/
        edit.module.ts, edit.page.html, edit.page.scss, edit.page.ts
      list/
        list.module.ts, list.page.html, list.page.scss, list.page.ts
      material/
        material.module.ts

  src/assets
      icon/
        favicon.png
      images/
        application images

  index.html
  db.json

# Project File Roles

  db.json:- act as api server during debugging locally.(or we can use http://angularbookkeeping.sourabhportfolio.in/api)

  src/app/rest-api.service.ts:-

    import { Observable, of, throwError } from 'rxjs';
    import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

    @Injectable({
      providedIn: 'root'
    })
    export class RestApiService {
      constructor(private http: HttpClient) { }

      getBooks(): Observable<any> {}
      getBook(id: string): Observable<any> {}
      postBook(data): Observable<any> {}
      updateBook(id: string, data): Observable<any> {}
      deleteBook(id: string): Observable<{}> {}
   }

  src/app/app.module.ts:-

    import {} from '';
    @NgModule({
      declarations: [AppComponent],
      entryComponents: [],
      imports: [.....],
      providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule {}

  src/app/app.component.ts:-

    import { Platform } from '@ionic/angular';
    import { SplashScreen } from '@ionic-native/splash-screen/ngx';
    import { StatusBar } from '@ionic-native/status-bar/ngx';

    export class AppComponent {
      public appPages = [{title: 'Home',url: '/home',icon: 'home'},{title: 'List',url: '/list',icon: 'list'}];

      constructor(private platform: Platform,private splashScreen: SplashScreen,private statusBar: StatusBar){
        this.initializeApp();
      }

      initializeApp() {
        this.platform.ready().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });
      }
    }

  src/app/app-routing.module.ts:-

    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';

    const routes: Routes = [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
      },
      {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule'
      },
      {
        path: 'detail/:id',
        loadChildren: './detail/detail.module#DetailPageModule'
      },
      {
        path: 'edit/:id',
        loadChildren: './edit/edit.module#EditPageModule'
      },
      {
        path: 'create',
        loadChildren: './create/create.module#CreatePageModule'
      }
    ];

    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule {}
