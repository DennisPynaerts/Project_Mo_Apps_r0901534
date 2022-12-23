import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAutoAPI} from '../types/IAutoAPI'
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AutoService {
    readonly #baseURL = 'https://azureapi-production.up.railway.app/autos';

    constructor(private http: HttpClient) {
    }

    getAutos(): Observable<IAutoAPI[]> {
        return this.http
            .get<IAutoAPI[]>(
                this.#baseURL,
                {
                    observe: 'body',
                    responseType: 'json'
                }).pipe(
                tap(autos => autos.sort((a: { merkNaam: string }, b: { merkNaam: string }) =>
                    a.merkNaam.localeCompare(b.merkNaam))));
        // sorteer de auto's alfabetisch op merknaam
    }

    getMerkIdByName(naam: string): Observable<IAutoAPI[]> {
        return this.http
            .get<IAutoAPI[]>(
                this.#baseURL + '/' + naam,
                {
                    observe: 'body',
                    responseType: 'json'
                })
    }

    getAutoById(id: string):Observable<IAutoAPI>{
        return this.http
            .get<IAutoAPI>(
                this.#baseURL + '/' + id,
                {
                    observe: 'body',
                    responseType: 'json'
                }
            );
    }
}