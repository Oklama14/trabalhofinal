import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
    providedIn: 'root'
})


export class ApiService {
    constructor(private http: HttpClient) { }
        getAdvise(): Observable<any> {
        return this.http.get<any>("https://api.adviceslip.com/advice");}
        getData( ): Observable<ResponseModel> {
        return this.http.get<any>("http://worldtimeapi.org/api/timezone/Etc/GMT-3");
        }    
}
