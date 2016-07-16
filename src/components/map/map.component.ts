import {Component} from '@angular/core';
import {GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core/directives-const';

@Component({
  selector: 'map',
  directives: [GOOGLE_MAPS_DIRECTIVES],
  template: require('./map.component.html'),
  styles: [require('./map.component.css')]
})

export class MapComponent {
  lat: number = 37.3992627;
  lng: number = -121.9302447;
}