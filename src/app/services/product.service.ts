import { Injectable } from '@angular/core';
import { timeout, delay } from 'q';
import { Observable, of } from 'rxjs';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = "http://localhost:3000";
  baseURL =environment.baseURL;
  constructor(private loadingService: LoadingService, private httpClient: HttpClient) { }


  getAllProducts(): Observable<any> {
    return this.httpClient.get(this.api+"/products");
    
  }

  getAllItems(): Observable<any> {
    return this.httpClient.get(environment.baseURL+"item");
    
  }

  getSimillarProducts(): Observable<any> {
    return this.httpClient.get(this.api+"/simillarProducts");
  }

  // public getSingleProduct(id: string): Observable<any> {
  //   return this.httpClient.get(this.baseURL+"/item/itemId/"+id);
  // }

  getSingleProduct(itemId :String):Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}item/itemId/${itemId}`);

  }
  getdashboardvegetables(): Observable<any> {
    return this.httpClient.get(this.baseURL+"vegetable-products/");
  }

  getdashboardfruits(): Observable<any> {
    return this.httpClient.get(this.baseURL+"fruits-products/");
  }

  getdashboardoffers(): Observable<any> {
    return this.httpClient.get(this.baseURL+"offer-products/");
  }

  addCustomer(formData): Observable<any> {
    return this.httpClient.post<any>(this.baseURL+"Customers",formData);
  }
}
