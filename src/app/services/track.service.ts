import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {TrackAPI} from '../types/TrackAPI';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  readonly #baseURL = 'https://api-project-mobile-apps.azurewebsites.net/tracks';

  constructor(private http: HttpClient) { }

    // getTracks(): Observable<TrackAPI<any>> {
//   return this.http
//       .get<TrackAPI<any>>(
//           `${this.#baseURL}`,
//           {
//             observe: 'body',
//             responseType: 'json'
//           });
// }

    getTracks(): Observable<TrackAPI> {
        return this.http
            .get<TrackAPI>(
                `${this.#baseURL}`,
                {
                    observe: 'body',
                    responseType: 'json'
                }
            ).pipe(
                //map<TrackAPI, TrackAPI>(t => t.naam),
                catchError(err => {
                    console.log(err);
                    return of(undefined);
                }),
                retry(3)
            );
    }
}


