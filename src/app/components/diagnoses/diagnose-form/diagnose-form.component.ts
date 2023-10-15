import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormArray, Validators} from "@angular/forms";
import {DiagnosesService} from "../../../services/diagnoses.service";
import {catchError, throwError} from "rxjs";
import {IDiagnose} from "../../../common/interfaces";
import {mockData} from "./mock";

@Component({
  selector: 'diagnose-form',
  templateUrl: './diagnose-form.component.pug',
  styleUrls: ['./diagnose-form.component.scss']
})
export class DiagnoseFormComponent implements OnInit {
  diagnoses: IDiagnose[] = mockData;
  form: FormGroup;

  get userDiagnosesControl(): UntypedFormArray {
    return this.form.get('userDiagnoses') as UntypedFormArray;
  }

  constructor(
    private fb: FormBuilder,
    private diagnosesService: DiagnosesService
  ) {
    this.form = this.fb.group({
      date: [null, [Validators.required]],
      userDiagnoses: this.fb.array([
        this.fb.group({
          userDiagnose: [null, [Validators.required]],
          comment: [null]
        })
      ])
    })
  }

  ngOnInit() {
    // this.userDiagnosesControl.push(this.fb.group({
    //   userDiagnose: [null, [Validators.required]],
    //   comment: [null]
    // }));
   // this.requestDiagnoses();
  }

  requestDiagnoses(search?: string) {
    this.diagnosesService.getList({
      IsPublic: true,
      ...(search && { search })
    }).pipe(
      catchError(error => throwError(error))
    ).subscribe((diagnoses: IDiagnose[]) => {
      this.diagnoses = diagnoses;
    })
  }

  onSubmit() {

  }
}
