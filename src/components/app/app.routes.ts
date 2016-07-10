import {RouterConfig, provideRouter} from '@angular/router';

import {HomepageComponent} from '../homepage/homepage.component';
import {TaskListViewComponent} from '../taskListView/taskListView.component';
import {UserListViewComponent} from '../userListView/userListView.component';

const routes: RouterConfig = [
  {path: '', component: HomepageComponent as any},
  {path: 'list/:id', component: TaskListViewComponent as any},
  {path: 'userlist', component: UserListViewComponent as any}
];

export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];