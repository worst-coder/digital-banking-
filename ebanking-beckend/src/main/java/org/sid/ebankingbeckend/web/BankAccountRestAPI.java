package org.sid.ebankingbeckend.web;

import org.sid.ebankingbeckend.dtos.AccountHistoryDTO;
import org.sid.ebankingbeckend.dtos.AccountOperationDTO;
import org.sid.ebankingbeckend.dtos.BankAccountDTO;
import org.sid.ebankingbeckend.exceptions.BankAccountNotFoundException;
import org.sid.ebankingbeckend.services.BankAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

 @RestController
 @CrossOrigin("*")


 public class BankAccountRestAPI {

    private BankAccountService bankAccountService;


     public BankAccountRestAPI(BankAccountService bankAccountService) {
         this.bankAccountService = bankAccountService;
     }

    @GetMapping("/accounts/{accountId}")
    public BankAccountDTO getBankAccount(@PathVariable String accountId) throws BankAccountNotFoundException {
        return bankAccountService.getBankAccount(accountId);
    }
     @GetMapping("/accounts")
     public List<BankAccountDTO> listAccounts(){
         return bankAccountService.bankAccountList();
     }



     @GetMapping("/accounts/{accountId}/operations")
     public List<AccountOperationDTO> getHistory(@PathVariable String accountId){
         return bankAccountService.accountHistory(accountId);
     }

    @GetMapping("/accounts/{accountId}/pageOperations")
    public AccountHistoryDTO getAccountHistory(
            @PathVariable String accountId,
            @RequestParam(name="page",defaultValue = "0") int page,
            @RequestParam(name="size",defaultValue = "5")int size) throws BankAccountNotFoundException {
        return bankAccountService.getAccountHistory(accountId,page,size);
    }



}



