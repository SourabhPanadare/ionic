import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

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
  		this.getBook(this.route.snapshot.params['id']);
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

  getBook(id) {
    this.api.getBook(id).subscribe(data => {
      this.id = data.id;
      this.bookform.setValue({
        isbn: data.isbn,
        title: data.title,
        image: data.image,
        author: data.author,
        description: data.description,
        published_year: data.published_year,
        publisher: data.publisher,
        updated_date: data.updated_date
      });
    });
   }

   onFormSubmit(form:NgForm) {
    this.api.updateBook(this.id, form)
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
