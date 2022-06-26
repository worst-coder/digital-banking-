import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../Model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }
  public getAccount(accountId:string,page:number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendhost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);

  }
  public debit(accountId : string,amount :number,description : string){
    let data = {accountId: accountId , amount: amount,description:description}
    return this.http.post(environment.backendhost+"/accounts/debit",data);

  }
  public  credit(accountId : string,amount :number,description : string){
    let data = {accountId: accountId , amount: amount,description:description}
    return this.http.post(environment.backendhost+"/accounts/credit",data);

  }
  public  transfer(accountsource : string,accountdestination : string,amount :number,description : string){
    let data = {accountsource , accountdestination,amount,description}
    return this.http.post(environment.backendhost+"/accounts/transfer",data);

  }
}
