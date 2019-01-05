import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  
  books = <any>{};

  breakpoint: number;

  constructor(private route: ActivatedRoute, private api: RestApiService, public router: Router) { }

  ngOnInit() {
  	this.getBookDetails(this.route.snapshot.params['id']);
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  getBookDetails(id) {
   this.api.getBook(id)
     .subscribe(data => {
       console.log(data);
       this.books = data;
     });
  }

  deleteBook(id) {
    console.log(id);
    this.api.deleteBook(id)
      .subscribe(res => {
          this.router.navigate(['/list']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
