/**
 * Class representing a single task.
 */
export class TaskItem {
  constructor(
      public name: string,
      public priority: number,
      public description: string,
      public placeId?: string,
      public lat?: number,
      public lng?: number,
      public distance?: google.maps.Distance,
      public duration?: google.maps.Duration) {}
}