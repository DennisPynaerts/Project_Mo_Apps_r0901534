import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {TrackAPI} from '../types/TrackAPI';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  readonly #baseURL = 'https://api-project-mobile-apps.azurewebsites.net/tracks';

  constructor(private http: HttpClient) { }

    getTracks():Observable<TrackAPI[]>{
        return this.http
            .get<TrackAPI[]>(
                this.#baseURL,
                 {
                     observe: 'body',
                     responseType: 'json'
                 }).pipe(
                tap(tracks => tracks.sort((a: {naam: string}, b:{naam: string})=> a.naam.localeCompare(b.naam)))
                // sorteer de tracks/circuits alfabetisch
            );
    }
}


