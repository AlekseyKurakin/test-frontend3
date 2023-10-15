import { NgModule } from "@angular/core";
import { DiagnoseFormComponent } from "./diagnose-form/diagnose-form.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    DiagnoseFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DiagnoseFormComponent
  ]
})

export class DiagnosesModule {}
