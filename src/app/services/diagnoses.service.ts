import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class DiagnosesService {
  path = 'Dictionaries/icpc2'; // 'api/diagnoses';

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) {
  }

  getList(params: any) {
    return this.globalService.getData(this.globalService.baseUrl(this.path), GlobalService.prepareParams(params));
  }
}
