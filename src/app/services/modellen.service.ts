import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ModelAPI} from '../types/ModelAPI';

@Injectable({
  providedIn: 'root'
})
export class ModellenService {
  readonly #baseURL = 'https://azureapi-production.up.railway.app/autos';

  constructor(private http: HttpClient) {}
  getModellen(merkId: string): Observable<ModelAPI[]> {
    return this.http
        .get<ModelAPI[]>(
            this.#baseURL + `/${merkId}/modellen`,
            {
              observe: 'body',
              responseType: 'json'
            }).pipe(
                map(x => x.filter(y => y.merkId === merkId)), //auto's filter waar merkId gelijk is aan binnenkomend merkId
                    tap(modellen => modellen.sort((a: {modelNaam: string}, b:{modelNaam: string})=> a.modelNaam.localeCompare(b.modelNaam))));
    // haal enkel modellen op van het juiste merk (check op merkId) & sorteer alfabetisch
  }

    getModelById(modelNaam: string): Observable<ModelAPI[]> {
        return this.http
            .get<ModelAPI[]>(
                this.#baseURL + `/modellen/${modelNaam}`,
                {
                    observe: 'body',
                    responseType: 'json'
                })
    }
}
