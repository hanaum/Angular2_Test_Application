import {Injectable} from '@angular/core';

import {TASKS} from './mock-taskList';
import {TaskItem} from './taskItem';

/**
 * Service handles TaskItem data.
 */
@Injectable()
export class TaskListService {
  /**
   * @returns {Promise<TaskItem[]>}
   */
  getTaskList(): Promise<TaskItem[]> { return Promise.resolve(TASKS); }
}