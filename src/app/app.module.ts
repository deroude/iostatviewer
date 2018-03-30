import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ParseService } from './services/parse.service';
import { NotFoundComponent } from './components/not_found/not_found.component';
import { ChartComponent } from './components/chart/chart.component';
import { ZingChartDirective } from './directives/zingchart.directive';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ChartComponent,
    ZingChartDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ParseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
