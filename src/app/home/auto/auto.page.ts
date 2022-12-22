import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AutoService} from '../../services/auto.service';
import {Network} from '@capacitor/network';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.page.html',
  styleUrls: ['./auto.page.scss'],
})
export class AutoPage implements OnInit {
  verticalFabPosition: ('bottom' | 'top') = 'bottom';
  fabIsVisible = true;
  autos = this.autoService.getAutos();


  constructor(public navController: NavController, public autoService: AutoService) { }

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
