import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListPropositionPage } from './list-proposition.page';
import { ListPropositionResolver } from './list-proposition.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListPropositionPage,
    resolve: {
      data: ListPropositionResolver
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
  declarations: [ListPropositionPage],
  providers: [
    ListPropositionResolver
  ]
})
export class ListPropositionPageModule {}
