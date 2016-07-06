import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2/angularfire2';

@Injectable()
export class TaskListService {
  private taskLists: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) { this.taskLists = this.af.database.list('task_list'); }

  getNewTaskListId(): string { return this.taskLists.push({}).key; }
}
