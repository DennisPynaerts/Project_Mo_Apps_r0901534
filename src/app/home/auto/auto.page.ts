import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AutoService} from '../../services/auto.service';
import {Network} from '@capacitor/network';
import {Observable} from 'rxjs';
import {AutoAPI} from '../../types/IAutoAPI';
import {Haptics} from '@capacitor/haptics';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.page.html',
  styleUrls: ['./auto.page.scss'],
})
export class AutoPage implements OnInit {
  verticalFabPosition: ('bottom' | 'top') = 'bottom';
  fabIsVisible = true;
  autos: Observable<AutoAPI[]>;

  ionViewWillEnter() {
    this.autos = this.autoService.getAutos();
    // initialiseer auto's voordat de component ingeladen/reset wordt
  }

  constructor(public navController: NavController, public autoService: AutoService) { }

  ngOnInit() {
    this.logCurrentNetworkStatus();
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
    });
  }

  async logCurrentNetworkStatus(): Promise<void> {
    const status = await Network.getStatus();
    if (!status.connected) {
      await this.hapticsVibrate();
      alert('Geen verbinding!');
    }
    // Nakijken of er verbinding is, alert sturen als er geen is + trillen
  };

  async hapticsVibrate(): Promise<void> {
    await Haptics.vibrate({duration: 500});
  }
}
