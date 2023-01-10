import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {IModelAPI, ModelAPI} from '../types/IModelAPI';

@Injectable({
  providedIn: 'root'
})
export class ModellenService {
  readonly #baseURL = 'https://api-production-4a1f.up.railway.app/autos';

  constructor(private http: HttpClient) {}
    // oude methode, verwijderen voor project inzenden
  // getModellen(merkId: string): Observable<IModelAPI[]> {
  //   return this.http
  //       .get<IModelAPI[]>(
  //           this.#baseURL + `/${merkId}/modellen`,
  //           {
  //             observe: 'body',
  //             responseType: 'json'
  //           }).pipe(
  //               map(x => x.filter(y => y.merkId === merkId)), //auto's filter waar merkId gelijk is aan binnenkomend merkId
  //                   tap(modellen => modellen.sort((a: {modelNaam: string}, b:{modelNaam: string})=> a.modelNaam.localeCompare(b.modelNaam))));
  //   // haal enkel modellen op van het juiste merk (check op merkId) & sorteer alfabetisch
  // }

    getModellen(merkId: string): Observable<IModelAPI[]> {
        return this.http
            .get<IModelAPI[]>(
                this.#baseURL + `/${merkId}/modellen`,
                {
                    observe: 'body',
                    responseType: 'json'
                }).pipe(
                map(x => x.filter(y => y.merkId === merkId)), //auto's filter waar merkId gelijk is aan binnenkomend merkId
                tap(modellen => modellen.sort((a: {modelNaam: string}, b:{modelNaam: string}) =>
                    a.modelNaam.localeCompare(b.modelNaam))),
                map(x => x.map(y => {
                    const z = new ModelAPI();
                    Object.assign(z, y);
                    return z;
                }))
            );
            // haal enkel modellen op van het juiste merk (check op merkId) & sorteer alfabetisch
            // maak van binnenkomende modellen instanties van ModelAPI
    }

    getModelById(modelId: string, merkId: string): Observable<IModelAPI> {
        return this.http
            .get<IModelAPI>(
                this.#baseURL + `/${merkId}/modellen/${modelId}`,
                {
                    observe: 'body',
                    responseType: 'json'
                })
    }
}
