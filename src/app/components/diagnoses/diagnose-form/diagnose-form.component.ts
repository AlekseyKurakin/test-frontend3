import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormArray, Validators } from "@angular/forms";
import { DiagnosesService } from "../../../services/diagnoses.service";
import { catchError, Subscription, SubscriptionLike, throwError } from "rxjs";
import { IDiagnose, IResultJson } from "../../../common/interfaces";
import { mockData } from "./mock";
import * as moment from "moment";

@Component({
  selector: 'diagnose-form',
  templateUrl: './diagnose-form.component.pug',
  styleUrls: ['./diagnose-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiagnoseFormComponent implements OnInit, OnDestroy {
  diagnoses: IDiagnose[]; // = mockData; set if you dont want to run node server
  form: FormGroup;
  todayDate = moment().format('YYYY-MM-DD');
  jsonResult = '';

  userDiagnosesControlSubscription: SubscriptionLike = Subscription.EMPTY;

  get userDiagnosesControl(): UntypedFormArray {
    return this.form.get('userDiagnoses') as UntypedFormArray;
  }

  constructor(
    private fb: FormBuilder,
    private diagnosesService: DiagnosesService
  ) {
    this.form = this.fb.group({
      date: [this.todayDate, [Validators.required]],
      userDiagnoses: this.fb.array([
        this.fb.group({
          diagnose: null,
          comment: ''
        })
      ])
    })
  }

  ngOnInit() {
    this.requestDiagnoses();

    this.userDiagnosesControlSubscription = this.userDiagnosesControl.valueChanges.subscribe( changes => {
      const excludedIds = changes.reduce((acc, cur) => {
        if (cur.diagnose?.id) {
          acc.push(cur.diagnose?.id);
        }
        return acc;
      }, []);

      this.diagnoses = mockData.filter(diagnose => !excludedIds.includes(diagnose.id)); // this line shouldn't exist, excludedIds must be passed to BE endpoint and be handled when we make request to database
    });
  }

  ngOnDestroy() {
    this.userDiagnosesControlSubscription.unsubscribe();
  }

  requestDiagnoses(search?: string) {
    this.diagnosesService.getList({
      IsPublic: true,
      ...(search && { search })
    }).pipe(
      catchError((error) => {
        this.diagnoses = mockData; // this line shouldn't exist. Added in case if endpoint doesn't work because of cors error
        return throwError(error)
      })
    ).subscribe((diagnoses: IDiagnose[]) => {
      this.diagnoses = diagnoses;
    })
  }

  onAddControl() {
    this.userDiagnosesControl.push(this.fb.group({
      diagnose: null,
      comment: ''
    }))
  }

  onSubmit() {
    const date = moment(this.form.get('date').value).format();

    if (!this.form.valid) {
      this.jsonResult = 'помилка, дата не може бути порожньою'
      return;
    } else if (moment().diff(moment(date), 'days') > 0) {
      this.jsonResult = 'помилка, дата не може бути у минулому'
      return;
    }

    const userDiagnosesWithComments = this.form.get('userDiagnoses').value;
    const jsonData: IResultJson = {
      encounter: {
        date
      },
      conditions: []
    }

    userDiagnosesWithComments.forEach(userDiagnose => {
      if (userDiagnose.diagnose) {
        jsonData.conditions.push({
          id: crypto.randomUUID(), // only for localhost application, should be replaced with uuid npm package 'npm install uuid'
          context: {
            identifier: {
              type: {
                coding: [
                  {
                    system: "eHealth/resources", // hardcoded param
                    code: userDiagnose.diagnose.code
                  }
                ]
              },
              value: userDiagnose.diagnose.id
            }
          },
          code: {
            coding: [
              {
                system: "eHealth/CPC2/condition_codes", // hardcoded param
                code: userDiagnose.diagnose.code
              }
            ]
          },
          notes: userDiagnose.comment,
          onset_date: date
        })
      }
    })

    if  (!jsonData.conditions.length) {
      delete jsonData.conditions
    }

    this.jsonResult = `${JSON.stringify(jsonData, null, 2)}`
  }
}
