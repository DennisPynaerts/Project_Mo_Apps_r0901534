import {Component, Input, OnInit} from '@angular/core';
import {TrackAPI} from '../../types/TrackAPI';
import {TrackService} from '../../services/track.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {

  @Input() track: TrackAPI
  constructor(public trackService: TrackService) { }

  ngOnInit() {}

}
