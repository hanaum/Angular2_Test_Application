import {Injectable} from '@angular/core';

import {TASKS} from './mock-taskList';
import {TaskItem} from './taskItem';

@Injectable()
export class TaskListService {
  getTaskList(): Promise<TaskItem[]> { return Promise.resolve(TASKS); }
}