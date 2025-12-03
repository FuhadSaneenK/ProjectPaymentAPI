import { Component, OnInit } from '@angular/core';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from '../../../core/services/transactions/transactions';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [PageHeaderComponent, DataTableComponent],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss'],
})
export class Transactions implements OnInit {

  accountId!: number;
  transactions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.accountId = Number(this.route.snapshot.paramMap.get('accountId'));
    console.log("Account ID:", this.accountId);

    this.loadTransactions();
  }

  columns: TableColumn[] = [
    { key: 'referenceNo', label: 'Reference ID' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' }
  ];

  loadTransactions() {
    this.transactionsService.getTransactionsByAccount(this.accountId).subscribe({
      next: (response: any) => {
        this.transactions = response.data.items || [];
        console.log("Loaded Transactions:", this.transactions);
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
        alert('Failed to load transactions');
      }
    });
  }
}




// import { Component } from '@angular/core';
// import {DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table';
// import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';

// @Component({
//   selector: 'app-transactions',
//   imports: [PageHeaderComponent,DataTableComponent],
//   templateUrl: './transactions.html',
//   styleUrl: './transactions.scss',
// })
// export class Transactions {

//     columns: TableColumn[] = [
//       {key: 'referenceID',label: 'Reference ID'},
//       {key: 'type',label: 'Type'},
//       {key: 'status',label: 'Status'},
//       {key: 'amount',label: 'Amount'},
//       {key: 'date',label: 'Date'}
//     ];

//     transactions = [
//   { referenceID: 'TXN1001', type: 'Payment', status: 'Completed', amount: 2500.00, date: '2024-01-12 10:45 AM' },
//   { referenceID: 'TXN1002', type: 'Refund', status: 'Pending', amount: 450.00, date: '2024-01-13 02:16 PM' },
//   { referenceID: 'TXN1003', type: 'Payment', status: 'Completed', amount: 7800.50, date: '2024-01-14 09:30 AM' },
//   { referenceID: 'TXN1004', type: 'Payment', status: 'Failed', amount: 1200.25, date: '2024-01-15 05:42 PM' },
//   { referenceID: 'TXN1005', type: 'Refund', status: 'Completed', amount: 300.00, date: '2024-01-16 11:10 AM' },
//   { referenceID: 'TXN1006', type: 'Payment', status: 'Completed', amount: 980.75, date: '2024-01-17 07:25 PM' },
//   { referenceID: 'TXN1007', type: 'Payment', status: 'Pending', amount: 4000.00, date: '2024-01-18 08:14 AM' },
//   { referenceID: 'TXN1008', type: 'Refund', status: 'Completed', amount: 550.00, date: '2024-01-19 04:02 PM' },
//   { referenceID: 'TXN1009', type: 'Payment', status: 'Completed', amount: 3100.90, date: '2024-01-20 03:40 PM' },
//   { referenceID: 'TXN1010', type: 'Refund', status: 'Failed', amount: 275.00, date: '2024-01-21 12:55 PM' }
// ];

// }
