import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../Model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
accountFormGroup! : FormGroup;
currentPage:number=0;
pageSize:number=5;
operationFromGroup! : FormGroup;
accountObservable!:Observable<AccountDetails>
errorMessage!:string;
  constructor(private fb : FormBuilder,private accountService:AccountsService) { }

  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
       accountId :this.fb.control('')

    });
    this.operationFromGroup=this.fb.group({
      operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null)
    })}

  handleSearchAccount() {
let accountId : string = this.accountFormGroup.value.accountId;
this.accountObservable=this.accountService.getAccount(accountId,this.currentPage,this.pageSize).pipe(
  catchError(err => {
    this.errorMessage=err.error().message;
    return throwError(err);

    })
);
  }

  gotoPage(page: number) {
  this.currentPage=page;
  this.handleSearchAccount();

  }

  handleAccountOperation() {
let accountID : string=this.accountFormGroup.value.accountId;
let  operationtType=this.operationFromGroup.value.operationType;
let amount: number=this.operationFromGroup.value.amount;
let description: string=this.operationFromGroup.value.description;
let accountdestination: string=this.operationFromGroup.value.accountDestination;
if (operationtType=='DEBIT'){
  this.accountService.debit(accountID,amount,description).subscribe({
    next :(data)=>{
      alert("Success Debit");
      this.operationFromGroup.reset();
      this.handleSearchAccount()
    },
    error:(err)=>{
      console.log(err);
    }
  });

}else if (operationtType=="CREDIT"){
  this.accountService.credit(accountID,amount,description).subscribe({
    next :(data)=>{
      alert("Success Credit");
      this.operationFromGroup.reset();
      this.handleSearchAccount()
    },
    error:(err)=>{
      console.log(err);
    }
  });

}else if (operationtType=="TRANSFER"){
  this.accountService.transfer(accountID,accountdestination,amount,description).subscribe({
    next :(data)=>{
      alert("Success transfer");
      this.operationFromGroup.reset();
      this.handleSearchAccount()
    },
    error:(err)=>{
      console.log(err);
    }
  });

}

  }
}
