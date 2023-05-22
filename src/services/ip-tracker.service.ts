import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPGeo, ILocalIP, ICredits } from '../dto/ip-tracker.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

const ipifyKey = 'at_RXWC6X81gaM2vkxSmIlOxjjaWkpW3';

@Injectable()
export class TrackerService {
  constructor(private http: HttpClient) {}

  public getRemainingCredits() {
    const apiURL = `https://geo.ipify.org/service/account-balance?apiKey=${ipifyKey}`;
    const request = this.http.get<ICredits>(apiURL);

    return request;
  }

  public getLocalIp() {
    const apiURL = 'https://api.ipify.org/?format=json'
    const request = this.http.get<ILocalIP>(apiURL);

    return request;
  }

  public ipTracker(address: string): Observable<IPGeo> {
    const apiURL= `https://geo.ipify.org/api/v2/country,city?apiKey=${ipifyKey}&ipAddress=${address}&domain=${address}`;
    const request = this.http.get<IPGeo>(apiURL).pipe(catchError(this.handleError));

    return request;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}



