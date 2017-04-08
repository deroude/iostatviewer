import { ChartComponent } from './components/chart.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not_found.component';

const routes: Routes = [
    { path: '', redirectTo: '/viewer', pathMatch: 'full' },
    { path: 'viewer', component: ChartComponent },
    { path: '**', component: NotFoundComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }