package org.sid.ebankingbeckend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.ebankingbeckend.entities.BankAccount;
import org.sid.ebankingbeckend.enums.OperationType;

import javax.persistence.*;
import java.util.Date;

@Data

public class AccountOperationDTO {
     private Long id;

    private Date operationDate;
    private double amount;
     private OperationType type;
     private String description;
}
