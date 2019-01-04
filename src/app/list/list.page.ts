import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  books: any;
  displayedColumns = ['isbn', 'title', 'image', 'description'];

  constructor(private api: RestApiService, public router: Router) {}

  ngOnInit() {
    this.api.getBooks()
    .subscribe(res => {
      console.log(res);
      this.books = res;
    }, err => {
      console.log(err);
    });
  }
  

  showDetail(id) {
    this.router.navigate(['/detail', JSON.stringify(id)]);
  }
}
