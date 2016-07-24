import {Component, Input, OnInit} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2';
import {Subscription} from 'rxjs/Rx';
import {TaskItem} from '../../services/taskItem';

@Component({
  selector: 'map',
  template: require('./map.component.html'),
  styles: [require('./map.component.css')],
})

/**
 * MapComponent renders the map of TaskItems.
 */
export class MapComponent implements OnInit {
  // TOOD figure out how to trigger function on new Input and replace below with TaskItem[];
  @Input() private tasks: FirebaseListObservable<any[]>;
  private markers: google.maps.Marker[];
  private map: google.maps.Map;
  private taskSubscription: Subscription;

  constructor() { this.markers = []; }

  ngOnInit() {
    this.map = new google.maps.Map(
        document.getElementById('map'), {zoom: 1, center: {lat: -34.397, lng: 150.644}});

    this.taskSubscription = this.tasks.subscribe((tasks) => {
      console.log(tasks);
      this.updateMap(tasks);
    });
  }

  ngOnDestroy() { this.taskSubscription.unsubscribe(); }

  private updateMap(tasks: TaskItem[]) {
    this.resetMarkers();
    let bounds = new google.maps.LatLngBounds();
    tasks.forEach((location) => {
      if (location.lat && location.lng) {
        let marker = new google.maps.Marker(
            {map: this.map, position: new google.maps.LatLng(location.lat, location.lng)});
        this.markers.push(marker);
        bounds.extend(marker.getPosition());
        this.map.fitBounds(bounds);
      }
    });
  }

  private resetMarkers() {
    this.markers.forEach((marker) => { marker.setMap(null); });
    this.markers = [];
  }
}