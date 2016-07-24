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
  @Input() private tasks: FirebaseListObservable<any[]>;
  private geocoder: google.maps.Geocoder;
  private markers: google.maps.Marker[];
  private map: google.maps.Map;
  private taskSubscription: Subscription;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
    this.markers = [];
  }

  ngOnInit() {
    this.map = new google.maps.Map(
        document.getElementById('map'), {zoom: 1, center: {lat: -34.397, lng: 150.644}});

    this.taskSubscription = this.tasks.subscribe((tasks) => { this.updateMap(tasks); });
  }

  ngOnDestroy() { this.taskSubscription.unsubscribe(); }

  private updateMap(tasks: TaskItem[]) {
    this.resetMarkers();
    let bounds = new google.maps.LatLngBounds();
    tasks.forEach((location) => {
      if (location.placeId) {
        this.geocoder.geocode({'placeId': location.placeId}, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results[0].geometry.location) {
            let marker =
                new google.maps.Marker({map: this.map, position: results[0].geometry.location});
            this.markers.push(marker);
            bounds.extend(marker.getPosition());
            this.map.fitBounds(bounds);
          }
        });
      }
    });
  }

  private resetMarkers() {
    this.markers.forEach((marker) => { marker.setMap(null); });
    this.markers = [];
  }
}