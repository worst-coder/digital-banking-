package org.sid.ebankingbeckend.repositories;

import org.sid.ebankingbeckend.entities.BankAccount;
import org.sid.ebankingbeckend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository extends JpaRepository<BankAccount,String>   {
}
