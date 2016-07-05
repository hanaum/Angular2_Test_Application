import {TestComponentBuilder} from '@angular/compiler/testing';
import {ComponentFixture, addProviders, async, inject} from '@angular/core/testing';
import {ConcreteType} from '@angular/platform-browser-dynamic/src/facade/lang';

import {TASKS} from '../../services/mock-taskList';
import {MockTaskListService} from '../../services/mockTaskList.service';
import {TaskListService} from '../../services/taskList.service';

import {TaskListComponent} from './taskList.component';

describe('TaskListComponent', () => {
  let taskListComponent: TaskListComponent;
  let mockTaskListService: MockTaskListService;

  beforeEach(() => {
    mockTaskListService = new MockTaskListService();
    addProviders([{provide: TaskListService, useValue: mockTaskListService}]);
  });

  it('can instantiate', inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
       tcb.createAsync(TaskListComponent as ConcreteType<TaskListComponent>);
     }));

  it('should NOT have tasks before OnInit',
     async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
       tcb.createAsync(TaskListComponent as ConcreteType<TaskListComponent>)
           .then((componentFixture: ComponentFixture<TaskListComponent>) => {
             taskListComponent = componentFixture.debugElement.componentInstance;

             expect(taskListComponent.tasks).toBeUndefined();
           });
     })));

  it('should NOT have tasks after OnInit',
     async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
       tcb.createAsync(TaskListComponent as ConcreteType<TaskListComponent>)
           .then((componentFixture: ComponentFixture<TaskListComponent>) => {
             taskListComponent = componentFixture.debugElement.componentInstance;
             componentFixture.detectChanges();  // Runs ngOnInit.

             expect(taskListComponent.tasks).toBeUndefined();
           });
     })));

  it('should HAVE tasks after OnInit',
     async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
       tcb.createAsync(TaskListComponent as ConcreteType<TaskListComponent>)
           .then((componentFixture: ComponentFixture<TaskListComponent>) => {
             taskListComponent = componentFixture.debugElement.componentInstance;
             componentFixture.detectChanges();  // Runs ngOnInit.

             mockTaskListService.lastPromise.then(() => {
               expect(taskListComponent.tasks).toBeDefined();
               expect(taskListComponent.tasks.length).toEqual(TASKS.length);
             });
           });
     })));

  it('should HAVE display after OnInit',
     async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
       tcb.createAsync(TaskListComponent as ConcreteType<TaskListComponent>)
           .then((componentFixture: ComponentFixture<TaskListComponent>) => {
             taskListComponent = componentFixture.debugElement.componentInstance;
             componentFixture.detectChanges();  // Runs ngOnInit.

             mockTaskListService.lastPromise.then(() => {
               componentFixture.detectChanges();  // Update bindings.
               const element = componentFixture.debugElement.nativeElement;

               expect(element).toBeDefined();
               expect(element.querySelectorAll('table').length).toBe(1);
               expect(element.querySelectorAll('thead').length).toBe(1);
               expect(element.querySelectorAll('tbody').length).toBe(1);
               expect(element.querySelectorAll('tr').length).toBe(TASKS.length + 1);
             });
           });
     })));
});