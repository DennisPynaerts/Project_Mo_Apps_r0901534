import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {TrackService} from '../../services/track.service';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.page.html',
  styleUrls: ['./circuit.page.scss'],
})
export class CircuitPage implements OnInit {
  verticalFabPosition: ('bottom' | 'top') = 'bottom';
  fabIsVisible = true;
  tracks = this.trackService.getTracks();
  log = console.log(this.tracks);

  constructor(public navController: NavController, public trackService: TrackService) { }

  ngOnInit() {

  }

}
