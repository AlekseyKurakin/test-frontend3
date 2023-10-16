import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  url = 'https://global.lakmus.org/'; // 'http://localhost:3001/'; //must be set in env file

  static prepareOptions(params: HttpParams) {
    return {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'ngsw-bypass': 'true'
      }),
      params
    };
  }

  static prepareParams(params): HttpParams {
    if (!params) {
      return null;
    }

    let httpParams: HttpParams = new HttpParams();

    for (const item in params) {

      if (params.hasOwnProperty(item)) {
        httpParams = httpParams.append(item, params[item]);
      }
    }

    return httpParams;
  }

  constructor(private http: HttpClient) { }

  baseUrl(url: string): string {
    return `${this.url}${url}`;
  }

  getData(url: string, params?: HttpParams): Observable<any> {
    return this.http.get(url, {params});
  }
}
