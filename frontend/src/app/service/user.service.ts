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
export class UserService {

  uri = "http://localhost:3000";
  user_id = 2; //TODO LOGIN

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) {

     }
     // URL to web apis
     private usersUrl = '/users';

  getLists(): Observable<ListItems[]>{
    return this.http.get<ListItems[]>(`${this.uri}/users/${this.user_id}/lists`)
        .pipe(
          catchError(this.handleError<ListItems[]>('getLists', []))
        );
  }

  getLibrary(): Observable<Item[]>{
    return this.http.get<Item[]>(`${this.uri}/users/${this.user_id}/library`)
        .pipe(
          catchError(this.handleError<Item[]>('getLibrary', []))
        );
  }

  getFollowers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.uri}/users/${this.user_id}/followers`)
        .pipe(
          catchError(this.handleError<User[]>('getFollowers', []))
        );
  } 

  getFollowing(): Observable<User[]>{
    return this.http.get<User[]>(`${this.uri}/users/${this.user_id}/following`)
        .pipe(
          catchError(this.handleError<User[]>('getFollowing', []))
        );
  } 

  //Temporário para testar
  getIdLogin(): Number{
    return this.user_id;
  } 

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
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

//Métodos que não são usados mas que podem ser úteis:

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.uri}/users`)
    .pipe(
      catchError(this.handleError<User[]>('getusers', []))
    );
}

getUser(id: number): Observable<User> {
  const url = `${this.uri}/user/${id}`;
  return this.http.get<User>(url).pipe(
    tap(_ => this.log(`fetched User id=${id}`)),
    catchError(this.handleError<User>(`getUser id=${id}`))
  );
}
/** PUT: update the User on the server */
updateUser(User: User): Observable<any> {
  return this.http.put(`${this.uri}/User/${User.id}`, User, this.httpOptions).pipe(
    tap(_ => this.log(`updated User id=${User.id}`)),
    catchError(this.handleError<any>('updateUser'))
  );
}
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


/** DELETE: delete the User from the server */
deleteUser(id: number): Observable<User> {
  //const url = `${this.usersUrl}/${id}`;
  const url = `${this.uri}/User/${id}`;
  return this.http.delete<User>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted User id=${id}`)),
    catchError(this.handleError<User>('deleteUser'))
  );
}

/* GET users whose name contains search term */
searchusers(term: string): Observable<User[]> {
  if (!term.trim()) {
    // if not search term, return empty User array.
    return of([]);
  }
  return this.http.get<User[]>(`${this.usersUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found Users matching "${term}"`) :
       this.log(`no users matching "${term}"`)),
    catchError(this.handleError<User[]>('searchusers', []))
  );
}

/** POST: add a new User to the server */
addUser(User: User): Observable<User> {
  return this.http.post<User>(this.usersUrl, User, this.httpOptions).pipe(
    tap((newUser: User) => this.log(`added User w/ id=${newUser.id}`)),
    catchError(this.handleError<User>('addUser'))
  );
}
  
}
