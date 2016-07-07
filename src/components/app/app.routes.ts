import {RouterConfig, provideRouter} from '@angular/router';

import {HomepageComponent} from '../homepage/homepage.component';
import {TaskListViewComponent} from '../taskListView/taskListView.component';

const DEFAULT_ROUTE: string = '';
const TASKLIST_ROUTE: string = 'list/:id';

const routes: RouterConfig = [
  {path: DEFAULT_ROUTE, component: HomepageComponent as any},
  {path: TASKLIST_ROUTE, component: TaskListViewComponent as any}
];

export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];