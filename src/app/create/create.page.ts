import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  bookform: FormGroup;
  id:string = '';
  isbn:string = '';
  title:string = '';
  image:string = '';
  author:string = '';
  description:string = '';
  published_year:string = '';
  publisher:string = '';
  updated_date:string='';

  constructor(private router: Router, private route: ActivatedRoute, private api: RestApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const today = new Date();
  	this.bookform = this.formBuilder.group({
	      'isbn' : [null, Validators.required],
	      'title' : [null, Validators.required],
        'image' : [null, Validators.required],
        'author' : [null, Validators.required],
	      'description' : [null, Validators.required],
	      'published_year' : [null, Validators.required],
	      'publisher' : [null, Validators.required],
        'updated_date': [null, Validators.required]
	   });
  }

  onFormSubmit(form:NgForm) {
    this.api.postBook(form)
      .subscribe(res => {
          let id = res['id'];
          this.router.navigate(['/detail', id]);
        }, (err) => {
          console.log(err);
        }
      );
   }

  bookDetails() {
	   this.router.navigate(['/detail', this.id]);
  }
}
