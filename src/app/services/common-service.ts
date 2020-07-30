import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })

  export class CommonService{

    baseURL = environment.baseURL;
    constructor(private httpClient: HttpClient){
        
    }

    getAllCategpries(): Observable<any> {
        return this.httpClient.get(this.baseURL+"category/");
    }

    

  }