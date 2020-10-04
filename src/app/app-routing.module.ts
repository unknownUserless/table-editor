import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextComponent } from './text/text.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path: '', component: TextComponent},
  {path: 'table', component: TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
