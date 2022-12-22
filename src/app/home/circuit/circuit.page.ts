import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {TrackService} from '../../services/track.service';
import {Network} from '@capacitor/network';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.page.html',
  styleUrls: ['./circuit.page.scss'],
})
export class CircuitPage implements OnInit {
  verticalFabPosition: ('bottom' | 'top') = 'bottom';
  fabIsVisible = true;
  tracks = this.trackService.getTracks();

  constructor(public navController: NavController, public trackService: TrackService) { }

  ngOnInit() {
    this.logCurrentNetworkStatus();
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
    });
  }

  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    if (!status.connected) {
      alert('Geen verbinding!');
    }
    // Nakijken of er verbinding is, alert sturen als er geen is
  };

}
