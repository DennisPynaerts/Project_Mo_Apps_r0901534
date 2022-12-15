import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {TrackService} from '../../../services/track.service';
import {TrackAPI} from '../../../types/TrackAPI';
import {from, Subscription} from 'rxjs';

@Component({
  selector: 'app-circuit-detail',
  templateUrl: './circuit-detail.page.html',
  styleUrls: ['./circuit-detail.page.scss'],
})
export class CircuitDetailPage implements OnInit {
  id: string = undefined
  track = this.trackService.getTrackById('');
  tracks = this.trackService.getTracks();
  naam: string;
  land: string;
  trackArray: TrackService[] = []
  #subscriptions: Subscription[] = []

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute, public trackService: TrackService) { }

  ngOnInit() {
    console.log(this.track);
    this.setData();
    this.track = this.trackService.getTrackById(this.setData());
    console.log(this.track);
    // const subscribe = from([this.tracks]).subscribe(trackObj => this.trackArray.push(trackObj));
    // this.#subscriptions.push(subscribe);
  }

  ngOnDestroy() {
    this.#subscriptions.forEach(sub => sub.unsubscribe());
  }

  setData(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return id;
    //console.log(id); Haal id op van circuit dat gekozen is op Circuit page en return
  }

}
