import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  {path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
  {path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule'},
  {path: 'home', loadChildren: './home/home.module#HomePageModule'},
  {path: 'list-proposition/:id', loadChildren: './list-proposition/list-proposition.module#ListPropositionPageModule'},
  {path: 'new-task', loadChildren: './new-task/new-task.module#NewTaskPageModule'},
  {path: 'search', loadChildren: './search/search.module#SearchGroupPageModule'},

  // { path: 'new-task-modal', loadChildren: './new-task-modal/new-task-modal.module#NewTaskModalPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
