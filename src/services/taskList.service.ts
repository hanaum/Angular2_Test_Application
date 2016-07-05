import {Injectable} from '@angular/core';

import {TaskItem} from './taskItem';

/**
 * Service providing TaskItems.
 */
@Injectable()
export class TaskListService {
  private tasks: TaskItem[];

  constructor() { this.tasks = new Array<TaskItem>(0); }

  /**
   * @returns {Promise<TaskItem[]>}
   */
  getTaskList(): Promise<TaskItem[]> { return Promise.resolve(this.tasks); }
}