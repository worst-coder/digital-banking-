import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../Model/customer.model";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  public getCustomers():Observable<Array<Customer>>{
return this.http.get<Array<Customer>> (environment.backendhost+"/customers")
}
  public SearchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>> (environment.backendhost+"/customers/search?keyword="+keyword)
  }
  public saveCustomers(customer:Customer):Observable<Customer>{
    return this.http.post<Customer> (environment.backendhost+"/customers",customer)
  }
  public deleteCustomers(id:number){
    return this.http.delete(environment.backendhost+"/customers/"+id)
  }
}

