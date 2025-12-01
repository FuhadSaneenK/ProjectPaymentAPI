import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { DataTableComponent, TableAction, TableColumn } from '../../../shared/components/data-table/data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  imports: [PageHeaderComponent,DataTableComponent],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class Accounts {

  constructor(private router: Router) {}
    columns: TableColumn[] = [
      {
        key: 'accountId',
        label: 'Account ID'
      },
      {
        key: 'holderName',
        label: 'Holder Name'
      },
      {
        key: 'balance',
        label: 'Balance',
        type: 'currency',
        cssClass: 'balance'
      }
    ];

      actions: TableAction[] = [
        {
          label: 'Transactions',
          icon: 'fa-receipt',
          onClick: (row) => this.viewTransactions(row)
        }
      ];

    accounts = [
        { accountId: 'ACC001', holderName: 'John Doe', balance: 15420.50 },
        { accountId: 'ACC002', holderName: 'Jane Smith', balance: 8750.25 },
        { accountId: 'ACC003', holderName: 'Bob Johnson', balance: 22100.00 }
    ];


      viewTransactions(account: any) {
        console.log('View transactions for', account);
        // Navigate to transaction history page
        this.router.navigate(['/admin/transactions', account.accountId]);
      }

}
