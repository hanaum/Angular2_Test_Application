import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {TaskItem} from '../../services/taskItem';

import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'add-task',
  template: require('./addTask.component.html'),
  styles: [require('./addTask.component.css')],
})

/**
 * TaskListComponent renders the table containing a list of TaskItems.
 */
export class AddTaskComponent implements OnInit {
  private autoComplete: google.maps.places.Autocomplete;

  @Output() taskEmitter = new EventEmitter<TaskItem>();

  ngOnInit() {
    // TODO investigate using @viewChild.
    let taskNameInputBox = document.getElementById('add-task-name');
    this.autoComplete = new google.maps.places.Autocomplete(taskNameInputBox as any);
  }

  onSubmit(name: string, priority: number, description?: string) {
    let details: PlaceResult = this.autoComplete.getPlace() || null;
    if (details != null && details.name.length < name.length) {
      name = details.name;
    }
    description = description || '';

    let placeId = details ? details.place_id : null;
    let lat = details ? details.geometry.location.lat() : null;
    let lng = details ? details.geometry.location.lng() : null;

    this.taskEmitter.emit(new TaskItem(name, priority, description, placeId, lat, lng, null, null));
  }
}
