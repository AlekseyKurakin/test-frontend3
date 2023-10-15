import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {DiagnosesModule} from "./components/diagnoses/diagnoses.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DiagnosesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
