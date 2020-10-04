import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TextComponent } from './text/text.component';
import { TableComponent } from './table/table.component';
import { DownloadingComponent } from './downloading/downloading.component';
import { Parsers } from './services/parsers.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TextComponent,
    TableComponent,
    DownloadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [Parsers],
  bootstrap: [AppComponent],
  exports: [NgModel]
})
export class AppModule { }
