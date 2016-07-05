import {TASKS} from './mock-taskList';
import {TaskItem} from './taskItem';

/**
 * Mock of TaskListService for testing.
 */
export class MockTaskListService {
  lastPromise: Promise<TaskItem[]>;  // To spy on promise for tests.

  getTaskList(): Promise<TaskItem[]> {
    this.lastPromise = Promise.resolve(TASKS);
    return this.lastPromise;
  }
}