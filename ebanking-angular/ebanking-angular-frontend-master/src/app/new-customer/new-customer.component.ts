import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, ValidatorFn, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  newCustomerFormGroup! :FormGroup;


  constructor(private fb : FormBuilder,private customerservice:CustomerService, private router:Router) { }

  ngOnInit(): void {
    this.newCustomerFormGroup=this.fb.group({
      name : this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      email: this.fb.control(null,[Validators.required,Validators.email])
    })
  }

  handleSaverCustomer() {
let customer=this.newCustomerFormGroup.value;
this.customerservice.saveCustomers(customer).subscribe({
next:data=>{
  alert("Customer has been saved successfully!");
  //this.newCustomerFormGroup.reset();
  this.router.navigateByUrl("/customers");
},
  error : err=>{
  console.log(err);
    }
  });
}
}
