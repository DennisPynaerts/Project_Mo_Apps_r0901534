import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AutoAPI} from '../types/AutoAPI'
import {TrackAPI} from '../types/TrackAPI';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  readonly #baseURL = 'https://api-project-mobile-apps.azurewebsites.net/autos';

  constructor(private http: HttpClient) {}
    getAutos(): Observable<AutoAPI[]> {
      return this.http
          .get<AutoAPI[]>(
              this.#baseURL,
              {
                observe: 'body',
                responseType: 'json'
              }).pipe(
              tap(autos => autos.sort((a: {merkNaam: string}, b:{merkNaam: string})=> a.merkNaam.localeCompare(b.merkNaam))));
            // sorteer de auto's alfabetisch op merknaam
    }
  }

