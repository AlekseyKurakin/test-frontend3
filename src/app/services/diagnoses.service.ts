import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class DiagnosesService {
  path = 'api/diagnoses'; //'Dictionaries/icpc2';

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) {
  }

  getList(params: any) {
    return this.globalService.getData(this.globalService.baseUrl(this.path), GlobalService.prepareParams(params));
  }
}
