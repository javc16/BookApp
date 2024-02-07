import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {
  registerBook = this.fb.group({
    name:['', Validators.required],
    pages:['', Validators.required],
    publicationDate:['',Validators.required],
  })
  isSubmitted = false;
    constructor
    (
      private router: Router,
      private fb:FormBuilder,
      private bookService: BookService,

    ) {}

    cancel() {
      this.router.navigate(['']);
    }

    onSubmit():void{
      this.bookService.create(this.registerBook.value)
      .subscribe((res: any) => {
        console.log("Added");
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      })
      this.isSubmitted =true;
    }

}
