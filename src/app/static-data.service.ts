import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor(private http: HttpClient ) { }

  //load data via AJAX from static asset file
  public getStaticData(): Observable<any> {
    return this.http.get("./assets/data.json");
  }
}
