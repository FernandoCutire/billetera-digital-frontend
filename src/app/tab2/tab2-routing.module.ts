import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),  ReactiveFormsModule, FormsModule,],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
