import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserIOComponent } from './components/user-io/user-io.component';
import { LogTableComponent } from './components/log-table/log-table.component';
import { BookTradesComponent } from './components/book-trades/book-trades.component';
import { HomeComponent } from './components/home/home.component';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    UserIOComponent,
    LogTableComponent,
    BookTradesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
