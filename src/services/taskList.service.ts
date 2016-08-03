import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/angularfire2';  // tslint:disable-line
import {Observable} from 'rxjs/Rx';

import {TaskList} from './taskList';
import {AuthenticationService} from "./authentication.service";

const DEFAULT_TASK_LIST_NAME: string = 'New List';
const TASK_LIST_METADATA_PATH: string = 'task_list_metadata';

@Injectable()
export class TaskListService {
  constructor(
      private angularFire: AngularFire,
      private authenticationService: AuthenticationService
  ) {}

  /**
   * @returns {string} id of newly created task list.
   */
  public createNewTaskList(uuid: string): string {
    let id = this.getNewTaskListID();
    let update = this.generateCreateTaskListInstructions(id, uuid);

    this.angularFire.database.object('').update(update);
    return id;
  }

  /**
   * @param taskListId
   * @returns {any}
   */
  public getTaskList(taskListId: string): FirebaseListObservable<any[]> {
    if (taskListId == null) {
      return null;
    }
    return this.angularFire.database.list('task_list/' + taskListId + '/tasks');
  }

  /**
   * @param taskListId
   * @returns {any}
   */
  public getListName(taskListId: string): FirebaseObjectObservable<any[]> {
    if (taskListId == null) {
      return null;
    }
    return this.angularFire.database.object(TASK_LIST_METADATA_PATH + '/' + taskListId + '/name');
  }

  /**
   * @param taskListId
   * @returns {any}
   */
  public getListOwner(taskListId: string): FirebaseObjectObservable<any[]> {
    if (taskListId == null) {
      return null;
    }
    return this.angularFire.database.object(TASK_LIST_METADATA_PATH + '/' + taskListId + '/owner');
  }

  // TODO There has to be a better way.
  public getUserLists(uuidObservable: Observable<string>):
      Observable<Observable<FirebaseObjectObservable<any>[]>> {
    return uuidObservable.map((uuid) => {
      return this.angularFire.database.list('users/' + uuid + '/task_lists').map((taskLists) => {
        return taskLists.map((taskList) => {
          return this.angularFire.database.object(TASK_LIST_METADATA_PATH + '/' + taskList['$key']);
        });
      });
    });
  }

  public removeTaskList(id: string) {
    let userId = this.authenticationService.getUserId();
    let instructions = this.generateRemoveTaskListInstructions(id, userId);
    this.angularFire.database.object('').update(instructions);
  }

  /**
   * Creates an object containing instructions to create a new task list.
   * @param id Task list id.
   * @param userId
   * @returns {any} Object containing transaction instructions.
   */
  private generateRemoveTaskListInstructions(id: string, userId: string): any {
    let update = {};
    update[TASK_LIST_METADATA_PATH + '/' + id] = null;
    update['task_list/' + id] = null;
    if (userId != null) {
      update['users/' + userId + '/task_lists/' + id] = null;
    }

    return update;
  }

  /**
   * Creates an object containing instructions to create a new task list.
   * @param id Task list id.
   * @param userId
   * @returns {any} Object containing transaction instructions.
   */
  private generateCreateTaskListInstructions(id: string, userId: string): any {
    let update = {};
    update[TASK_LIST_METADATA_PATH + '/' + id] = new TaskList(DEFAULT_TASK_LIST_NAME, userId);
    if (userId != null) {
      update['users/' + userId + '/task_lists/' + id] = true;
    }

    return update;
  }

  /**
   * Generates and returns a unique id for a task list.
   * @returns {string}
   */
  private getNewTaskListID(): string {
    let taskLists: FirebaseListObservable<any[]> =
        this.angularFire.database.list(TASK_LIST_METADATA_PATH);
    return taskLists.push(null).key;
  }
}
