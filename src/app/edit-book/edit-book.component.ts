import { Component, OnInit } from '@angular/core';
import { book } from '../models/book';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent implements OnInit{
  registeredBook = this.fb.group({
    id:['',Validators.required],
    name:['', Validators.required],
    pages:['', Validators.required],
    publicationDate:['',Validators.required],
  })
  isSubmitted = false;

  constructor(
    activatedRoute:ActivatedRoute,
    private router: Router,
    private fb:FormBuilder,
    private bookService: BookService,
    )
    {
    activatedRoute.params.subscribe(params => {
      this.getById(params['id']);
    });
  }

  ngOnInit(): void {}



  getById(id: number) {
    this.bookService.getById(id).subscribe((res: any) => {

      let data =res.data;
      data.publicationDate = new Date(data.publicationDate);
      data.publicationDate = data.publicationDate.toISOString().split('T')[0];

      this.registeredBook.patchValue(data);
    });
  }


  onSubmit():void{
    this.bookService.update(parseInt(this.registeredBook.value.id!),this.registeredBook.value)
    .subscribe((res: any) => {
      console.log("Added");
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    })
    this.isSubmitted =true;
  }

  cancel() {
    this.router.navigate(['']);
  }

}
