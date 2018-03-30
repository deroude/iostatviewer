import { ChartComponent } from './components/chart.component';
import { ZingChartDirective } from './directives/zingchart.directive';
import { ParseService } from './services/parse.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { NotFoundComponent } from './components/not_found.component';

@NgModule({
  imports: [BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent,
    NotFoundComponent,
    ChartComponent,
    ZingChartDirective
  ],
  providers: [
    ParseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
