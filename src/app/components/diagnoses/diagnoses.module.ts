import { NgModule } from "@angular/core";
import { DiagnoseFormComponent } from "./diagnose-form/diagnose-form.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    DiagnoseFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgSelectModule
  ],
  exports: [
    DiagnoseFormComponent
  ]
})

export class DiagnosesModule {}
