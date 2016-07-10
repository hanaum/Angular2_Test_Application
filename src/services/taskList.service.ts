import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/angularfire2';  // tslint:disable-line

import {AuthenticationService} from './authentication.service';
import {TaskList} from './taskList';

const DEFAULT_TASK_LIST_NAME: string = 'New List';
const TASK_LIST_METADATA_PATH: string = 'task_list_metadata';

@Injectable()
export class TaskListService {
  constructor(
      private angularFire: AngularFire, private authenticationService: AuthenticationService) {}

  /**
   * @returns {string} id of newly created task list.
   */
  public createNewTaskList(): string {
    let id = this.getNewTaskListID();
    let userId: string = this.authenticationService.getUserId();
    let update: Map<any, any> = this.generateCreateTaskListInstructions(id, userId);

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
   * Creates an object containing instructions to create a new task list.
   * @param id Task list id.
   * @param userId
   * @returns {Map<any, any>} Object containing transaction instructions.
   */
  private generateCreateTaskListInstructions(id: string, userId: string): Map<any, any> {
    let update = new Map();
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
