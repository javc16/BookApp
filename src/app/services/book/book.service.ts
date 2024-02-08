import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url:string;

  constructor(private http: HttpClient)
  {
    this.url =  "https://localhost:7167/api/book";
  }

  getData(): Observable<book[]> {
    return this.http.get<book[]>(this.url);
  }

  create(book: Object) {
    return this.http.post(this.url, book);
  }

  update(id: number, book:Object ){
    return this.http.put(this.url+'/'+id, book);
  }

  getById(id: number){
    return this.http.get<book>(this.url+'/' +id);
  }

  delete(id: number ){
    return this.http.delete(this.url+'/'+id);
  }
}
