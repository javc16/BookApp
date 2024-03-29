import { Component } from '@angular/core';
import { book } from '../../models/book';
import { Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  books: book[];
  displayedColumns: string[] = ['id','name','pages','publicationDate','action'];
  constructor(
    private bookService: BookService,
    private router: Router,
    )
    {
      this.books = new Array<book>();
    }

    ngOnInit() {
      this.bookService.getData().subscribe((res: any[])=>{
        this.books= res;
      })
    }

    create(){
      this.router.navigate(['create']);
    }

    edit(book:book){
      const id = book.id;
      this.router.navigate(['edit',id]);
    }



    delete(book:book) {
       this.bookService.delete(book.id)
         .subscribe((res: any) => {
           this.bookService.getData().subscribe((res: any[])=>{
             this.books= res;
           })
         });
    }

}
