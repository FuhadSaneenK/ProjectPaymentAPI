import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { DataTableComponent, TableAction, TableColumn } from '../../../shared/components/data-table/data-table';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../../core/services/accounts/accounts';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [PageHeaderComponent, DataTableComponent],
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.scss'],
})
export class Accounts implements OnInit {

  merchantId!: number;
  accounts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    // Read the merchantId from route
    this.merchantId = Number(this.route.snapshot.paramMap.get('merchantId'));
    console.log("Merchant ID:", this.merchantId); // should show correct value
    // Load accounts for this merchant
    this.loadAccounts();
  }

  // -----------------------------
  // TABLE CONFIG
  // -----------------------------
  columns: TableColumn[] = [
    { key: 'id', label: 'Account ID' },
    { key: 'holderName', label: 'Holder Name' },
    { key: 'balance', label: 'Balance', type: 'currency', cssClass: 'balance' }
  ];

  actions: TableAction[] = [
    {
      label: 'Transactions',
      icon: 'fa-receipt',
      onClick: (row) => this.viewTransactions(row)
    }
  ];

  // -----------------------------
  // API CALL
  // -----------------------------
  loadAccounts() {
  this.accountsService.getAccountsByMerchant(this.merchantId).subscribe({
    next: (response: any) => {
      console.log(response); // check structure
      this.accounts = response.data.items || [];
    },
    error: (err) => {
      console.error('Error loading accounts:', err);
      alert('Failed to load accounts');
    }
    });
  }


  // -----------------------------
  // NAVIGATION
  // -----------------------------
  viewTransactions(account: any) {
    this.router.navigate(['/admin/transactions', account.id]);
  }
}
