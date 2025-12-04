import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PageHeaderComponent, HeaderButton } from '../../../shared/components/page-header/page-header';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table';
import { PaymentModalComponent, PaymentData, PaymentMethod } from '../payment-modal/payment-modal';
import { RefundModalComponent, RefundData } from '../refund-modal/refund-modal';
import { CreateAccountModalComponent, CreateAccountData } from '../create-account-modal/create-account-modal';
import { AccountsService } from '../../../core/services/accounts/accounts';
import { AuthService } from '../../../core/services/auth.service';
import { PayRefundService } from '../../../core/services/pay-refund/pay-refund';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    DataTableComponent,
    PaymentModalComponent,
    RefundModalComponent,
    CreateAccountModalComponent
  ],
  templateUrl: './myaccount.html',
  styleUrls: ['./myaccount.scss']
})
export class DashboardComponent implements OnInit {

  // For modals
  isPaymentModalOpen = false;
  isRefundModalOpen = false;
  isCreateAccountModalOpen = false;
  selectedAccount: any = null;

  // Merchant ID from JWT
  merchantId!: number;

  // Accounts list
  accounts: any[] = [];
  loading = false;

  // Dummy payment methods (API later)
  paymentMethods: PaymentMethod[] = [
    { id: '1', name: 'Credit Card', description: 'Visa/Mastercard' },
    { id: '2', name: 'Debit Card', description: 'Bank debit card' },
    { id: '3', name: 'Bank Transfer', description: 'Direct bank transfer' },
    { id: '4', name: 'PayPal', description: 'PayPal account' },
    { id: '5', name: 'Cash', description: 'Cash payment' }
  ];

  constructor(
    private router: Router,
    private accountsService: AccountsService,
    private authService: AuthService,
      private payRefundService: PayRefundService
  ) {}

  ngOnInit(): void {
    // ✔ Load merchantId from JWT token
    this.merchantId = this.authService.getMerchantId();
    console.log("Merchant ID:", this.merchantId);

    // ✔ Load accounts belonging ONLY to this merchant
    this.loadAccounts();
  }

  // ---------------------------------------------------
  // LOAD ACCOUNTS
  // ---------------------------------------------------
  loadAccounts() {
    this.loading = true;

    this.accountsService.getAccountsByMerchant(this.merchantId).subscribe({
      next: (response: any) => {
        this.accounts = response.data.items || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load accounts:', err);
        alert('Failed to load accounts');
        this.loading = false;
      }
    });
  }

  // ---------------------------------------------------
  // TABLE HEADERS
  // ---------------------------------------------------
  headerButtons: HeaderButton[] = [
    {
      label: 'Create Account',
      icon: 'fa-plus',
      cssClass: 'primary',
      onClick: () => this.createAccount()
    }
  ];

  columns: TableColumn[] = [
    { key: 'id', label: 'Account ID' },          // ✔ backend correct key
    { key: 'holderName', label: 'Holder Name' },
    { key: 'balance', label: 'Balance', type: 'currency', cssClass: 'balance' }
  ];

  actions: TableAction[] = [
    {
      label: 'Transactions',
      icon: 'fa-receipt',
      onClick: (row) => this.viewTransactions(row)
    },
    {
      label: 'Pay',
      icon: 'fa-credit-card',
      onClick: (row) => this.makePayment(row)
    },
    {
      label: 'Refund',
      icon: 'fa-rotate-left',
      onClick: (row) => this.processRefund(row)
    }
  ];

  // ---------------------------------------------------
  // UI ACTIONS
  // ---------------------------------------------------
  createAccount() {
    this.isCreateAccountModalOpen = true;
  }

  viewTransactions(account: any) {
    this.router.navigate(['/merchant/transactions', account.id]);
  }

  makePayment(account: any) {
    this.selectedAccount = {
      ...account,
      accountId: Number(account.id || account.accountId)  // convert to number
    };
    this.isPaymentModalOpen = true;
  }

  // processRefund(account: any) {
  //   this.selectedAccount = account;
  //   this.isRefundModalOpen = true;
  // }
  processRefund(account: any) {
  this.selectedAccount = {
    ...account,
    accountId: Number(account.id)   // ✔ ensure backend receives number
  };
  this.isRefundModalOpen = true;
}


  closePaymentModal() {
    this.isPaymentModalOpen = false;
    this.selectedAccount = null;
  }

  closeRefundModal() {
    this.isRefundModalOpen = false;
    this.selectedAccount = null;
  }

  closeCreateAccountModal() {
    this.isCreateAccountModalOpen = false;
  }

  // ---------------------------------------------------
  // SUBMIT HANDLERS (API connection later)
  // ---------------------------------------------------
  // onCreateAccountSubmit(accountData: CreateAccountData) {
  //   console.log('Create account submitted:', accountData);

  //   // TODO: Connect to API POST /api/accounts
  //   alert(`Account created successfully for ${accountData.holderName}!`);
  //   this.closeCreateAccountModal();
  // }
  onCreateAccountSubmit(accountData: CreateAccountData) {
  console.log('Creating account:', accountData);

  this.accountsService.createAccount(accountData).subscribe({
    next: (response: any) => {
      alert('Account created successfully!');

      // Reload updated accounts
      this.loadAccounts();

      // Close modal
      this.closeCreateAccountModal();
    },
    error: (err) => {
      console.error("Account creation failed", err);
      alert("Failed to create account");
    }
  });
}


  // onPaymentSubmit(paymentData: PaymentData) {
  //   console.log('Payment submitted:', paymentData);

  //   // TODO: Connect to API POST /api/transactions/payment
  //   alert(`Payment of $${paymentData.amount} processed successfully!`);
  //   this.closePaymentModal();
  // }
  onPaymentSubmit(paymentData: PaymentData) {
  console.log("Submitting payment:", paymentData);

  this.payRefundService.makePayment(paymentData).subscribe({
    next: (response: any) => {
      alert("Payment successful!");
      this.loadAccounts();
      this.closePaymentModal();
    },
    error: (err) => {
      console.error("Payment failed:", err);
      alert("Payment failed");
    }
  });
}


  // onRefundSubmit(refundData: RefundData) {
  //   console.log('Refund submitted:', refundData);

  //   // TODO: Connect to API POST /api/transactions/refund
  //   alert(`Refund of $${refundData.amount} processed successfully!`);
  //   this.closeRefundModal();
  // }
  onRefundSubmit(refundData: RefundData) {
  console.log("Submitting refund:", refundData);

  this.payRefundService.makeRefund(refundData).subscribe({
    next: (response: any) => {
      alert(response.message || "Refund request submitted!");
      
      // Reload accounts (balance changes only AFTER admin approves)
      this.loadAccounts();

      this.closeRefundModal();
    },
    error: (err) => {
      console.error("Refund failed:", err);

      const message =
        err?.error?.message ??
        "Refund request failed";

      alert(message);
    }
  });
}

}
