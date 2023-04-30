import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../service/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { ListItems } from '../lists';
import { Item } from '../item';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  uri = "http://localhost:3000";
  user_id = 2; //TODO LOGIN

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) {

     }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`itemService: ${message}`);
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/* GET users whose name contains search term */
searchItems(term: string): Observable<Item[]> {
  if (!term.trim()) {
    // if not search term, return empty User array.
    return of([]);
  }
  return this.http.get<Item[]>(`${this.uri}/items/${term}`).pipe(
    tap(x => x.length ?
       this.log(`found Items matching "${term}"`) :
       this.log(`no items matching "${term}"`)),
    catchError(this.handleError<Item[]>('searchitems', []))
  );
}


getItem(id: Number): Observable<Item>{
  return this.http.get<Item>(`${this.uri}/items/${id}`)
      .pipe(
        catchError(this.handleError<Item>('getId', ))
      );
} 
  
}
