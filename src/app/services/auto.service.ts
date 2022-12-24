import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAutoAPI} from '../types/IAutoAPI'
import {tap} from 'rxjs/operators';
import {ModelAPI} from '../types/IModelAPI';
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

    async maakInitieleAutoAanZonderModellen(merkNaam: string, land: string): Promise<void> {
        await this.http.post<any>('https://azureapi-production.up.railway.app/autos/create',
            {merkNaam: `${merkNaam}`, land: `${land}`}).subscribe();
        // kan niet meteen modellen toevoegen omdat die een merkId nodig hebben
    }

    async updateNieuwAangemaakteAutoEnVoegModelToe(merkId: string, merkNaam: string, land: string, modellen: ModelAPI): Promise<void> {
        await this.http.put<any>(
            `https://azureapi-production.up.railway.app/autos/modellen/update/${merkId}`,
            {
                merkNaam: merkNaam,
                land: land,
                modellen: modellen
            }).toPromise()
    }

    async verwijderAuto(merkId: string): Promise<void> {
        await this.http.delete<any>(`https://azureapi-production.up.railway.app/autos/delete/${merkId}`).subscribe();
    }

    async updateAutoZonderModellen(merkId: string, merkNaam: string, land: string): Promise<void> {
        await this.http.put<any>(`https://azureapi-production.up.railway.app/autos/update/${merkId}`,
            { merkNaam: `${merkNaam}`, land: `${land}`}).subscribe();
        // Updaten werkt, lijst auto's update nog trager dan lijst circuits
    }

    async pasAutoAan(merkId: string, merkNaam: string, land: string, modellen: ModelAPI[]): Promise<void> {
        await this.http.put<any>(
            `https://azureapi-production.up.railway.app/autos/modellen/update/${merkId}`,
            {
                merkNaam: merkNaam,
                land: land,
                modellen: modellen
            }
        ).toPromise()
    }
}