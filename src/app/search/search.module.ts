import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SearchGroupPage} from './search.page';
import {SearchGroupResolver} from './search.resolver';

const routes: Routes = [
  {
    path: '',
    component: SearchGroupPage,
    resolve: {
      data: SearchGroupResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchGroupPage],
  providers: [
    SearchGroupResolver
  ]
})
export class SearchGroupPageModule {
}
