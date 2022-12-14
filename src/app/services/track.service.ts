import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITrackAPI} from '../types/TrackAPI';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  readonly #baseURL = 'https://api-production-4a1f.up.railway.app/tracks';

  constructor(private http: HttpClient) { }

    getTracks():Observable<ITrackAPI[]>{
        return this.http
            .get<ITrackAPI[]>(
                this.#baseURL,
                 {
                     observe: 'body',
                     responseType: 'json'
                 }).pipe(
                tap(tracks => tracks.sort((a: {naam: string}, b:{naam: string})=> a.naam.localeCompare(b.naam)))
                // sorteer de tracks/circuits alfabetisch
            );
    }
    getTrackById(id: string):Observable<ITrackAPI>{
        return this.http
            .get<ITrackAPI>(
                this.#baseURL + '/' + id,
                {
                    observe: 'body',
                    responseType: 'json'
                }
            );
    }

    async verwijderCircuit(circuitId: string): Promise<void> {
        await this.http.delete<any>(`${this.#baseURL}/delete/${circuitId}`).subscribe();
    }

    async updateCircuit(circuitId: string, naam: string, land: string): Promise<void> {
        await this.http.put<any>(`${this.#baseURL}/update/${circuitId}`,
            { naam: `${naam}`, land: `${land}`}).subscribe();
    }

    async maakNieuwCircuitAan(naam: string, land: string): Promise<void> {
        await this.http.post<any>(`${this.#baseURL}/create`,

            { naam: `${naam}`, land: `${land}`}).subscribe();
    }
}


