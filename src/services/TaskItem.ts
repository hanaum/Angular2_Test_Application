/**
 * Class representing a single task.
 */
export class TaskItem {
  constructor(
      public name: string,
      public priority: number,
      public visited: boolean,
      public description: string) {}
}