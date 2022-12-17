import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ModelAPI} from '../types/ModelAPI';

@Injectable({
  providedIn: 'root'
})
export class ModellenService {
  readonly #baseURL = 'https://api-project-mobile-apps.azurewebsites.net/modellen';

  constructor(private http: HttpClient) {}
  getModellen(merkId: string): Observable<ModelAPI[]> {
    return this.http
        .get<ModelAPI[]>(
            this.#baseURL,
            {
              observe: 'body',
              responseType: 'json'
            }).pipe(
                map(x => x.filter(y => y.merkId === merkId)),
                    tap(modellen => modellen.sort((a: {modelNaam: string}, b:{modelNaam: string})=> a.modelNaam.localeCompare(b.modelNaam))));
    // haal enkel modellen op van het juiste merk (check op merkId) & sorteer alfabetisch
  }
}
