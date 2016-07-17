import PlaceResult = google.maps.places.PlaceResult;
/**
 * Class representing a single task.
 */
export class TaskItem {
  constructor(
      public name: string,
      public priority: number,
      public description: string,
      public details: PlaceResult) {}
}