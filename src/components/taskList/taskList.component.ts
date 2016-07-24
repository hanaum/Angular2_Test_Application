import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Observable, Subscription} from 'rxjs/Rx';

import {AuthenticationService} from '../../services/authentication.service';
import {TaskItem} from '../../services/taskItem';
import {TaskListService} from '../../services/taskList.service';
import {AddTaskComponent} from '../addTask/addTask.component';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'task-list',
  template: require('./taskList.component.html'),
  styles: [require('./taskList.component.css')],
  directives: [AddTaskComponent as any, MapComponent as any],
  providers: [TaskListService]
})

/**
 * TaskListComponent renders the table containing a list of TaskItems.
 */
export class TaskListComponent implements OnInit {
  private isInputFocused: boolean;
  private id: string;
  private isEditable: boolean;
  private editableSubscription: Subscription;
  private tasksSubscription: Subscription;
  private tasksObservable: FirebaseListObservable<any[]>;
  private listName: FirebaseObjectObservable<any[]>;
  private tasks: TaskItem[];
  private distanceMatrixService: google.maps.DistanceMatrixService;
  private currentPosition: google.maps.LatLng;

  constructor(
      private route: ActivatedRoute,
      private taskListService: TaskListService,
      private authenticationService: AuthenticationService) {
    navigator.geolocation.watchPosition((position) => {
      this.currentPosition =
          new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.setDistances();
    }, () => {}, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0});

    this.distanceMatrixService = new google.maps.DistanceMatrixService();
  }

  ngOnInit() {
    this.isInputFocused = false;
    this.id = this.route.snapshot.params['id'];
    this.tasksObservable = this.taskListService.getTaskList(this.id);
    this.listName = this.taskListService.getListName(this.id);
    this.editableSubscription =
        Observable
            .combineLatest(
                this.authenticationService.observableUserId,
                this.taskListService.getListOwner(this.id))
            .subscribe((ids) => { this.isEditable = ids[0] === ids[1]['$value']; });

    this.tasksSubscription = this.tasksObservable.subscribe((tasks) => {
      this.tasks = tasks;
      this.setDistances();
    });
  }

  ngOnDestroy() {
    this.editableSubscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
  }

  /**
   * @param task
   */
  addTask(task: TaskItem) { this.tasksObservable.push(task); }

  /**
   *
   * @param taskId
   */
  removeTask(taskId: string) { this.tasksObservable.remove(taskId); }

  editListName(newName: string) {
    this.listName.set(newName);
    this.isInputFocused = !this.isInputFocused;
  }

  private setDistances() {
    if (this.tasks && this.currentPosition) {
      this.tasks.forEach((task: TaskItem) => {
        if (task.lat && task.lng) {
          this.distanceMatrixService.getDistanceMatrix(
              {
                origins: [this.currentPosition],
                destinations: [new google.maps.LatLng(task.lat, task.lng)],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL
              },
              (result: google.maps.DistanceMatrixResponse,
               status: google.maps.DistanceMatrixStatus) => {
                if (status === google.maps.DistanceMatrixStatus.OK) {
                  task.distance = result.rows[0].elements[0].distance;
                  task.duration = result.rows[0].elements[0].duration;
                }
              });
        }
      });
    }
  }
}