import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  

  bookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder ,
    private apiService:APIService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      author: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      description: ['', Validators.required],
      publicationYear: ['', [Validators.required, Validators.pattern('^\\d{4}$')]],
      isbn: ['', [Validators.required, Validators.pattern('^\\d{13}$')]]
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      var bookDetails = this.bookForm.value

      this.apiService.postData(bookDetails , '/book/createNewBook').subscribe((res:any)=>{
        if(res.status){
          this.bookForm.reset();
          // this.router.navigate(['/']);/
          window.location.href = '/';
          
        }
      })

    }
  }

}
