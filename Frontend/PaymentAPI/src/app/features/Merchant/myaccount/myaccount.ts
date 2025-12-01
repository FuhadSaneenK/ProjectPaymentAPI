import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, HeaderButton } from '../../../shared/components/page-header/page-header';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table';
import { PaymentModalComponent, PaymentData, PaymentMethod } from '../payment-modal/payment-modal';
import { RefundModalComponent, RefundData } from '../refund-modal/refund-modal';
import { CreateAccountModalComponent, CreateAccountData } from '../create-account-modal/create-account-modal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, DataTableComponent, PaymentModalComponent, RefundModalComponent, CreateAccountModalComponent],
  templateUrl: './myaccount.html',
  styleUrls: ['./myaccount.scss']
})
export class DashboardComponent {
  // Modal states
  isPaymentModalOpen = false;
  isRefundModalOpen = false;
  isCreateAccountModalOpen = false;
  selectedAccount: any = null;
  
  // TODO: Get merchantId from authentication service
  merchantId: string = 'MERCH001';

  // Payment methods - TODO: Fetch from API
  paymentMethods: PaymentMethod[] = [
    { id: '1', name: 'Credit Card', description: 'Visa/Mastercard' },
    { id: '2', name: 'Debit Card', description: 'Bank debit card' },
    { id: '3', name: 'Bank Transfer', description: 'Direct bank transfer' },
    { id: '4', name: 'PayPal', description: 'PayPal account' },
    { id: '5', name: 'Cash', description: 'Cash payment' }
  ];

  constructor(private router: Router) {}
  headerButtons: HeaderButton[] = [
    {
      label: 'Create Account',
      icon: 'fa-plus',
      cssClass: 'primary',
      onClick: () => this.createAccount()
    }
  ];

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

  accounts = [
    { accountId: 'ACC001', holderName: 'John Doe', balance: 15420.50 },
    { accountId: 'ACC002', holderName: 'Jane Smith', balance: 8750.25 },
    { accountId: 'ACC003', holderName: 'Bob Johnson', balance: 22100.00 }
  ];

  createAccount() {
    this.isCreateAccountModalOpen = true;
  }

  viewTransactions(account: any) {
    console.log('View transactions for', account);
    // Navigate to transaction history page
    this.router.navigate(['/merchant/transactions', account.accountId]);
  }

  makePayment(account: any) {
    this.selectedAccount = account;
    this.isPaymentModalOpen = true;
  }

  processRefund(account: any) {
    this.selectedAccount = account;
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

  onCreateAccountSubmit(accountData: CreateAccountData) {
    console.log('Create account submitted:', accountData);
    // TODO: Call API to create account
    // For now, just add to the local array and close modal
    const newAccount = {
      accountId: `ACC${String(this.accounts.length + 1).padStart(3, '0')}`,
      holderName: accountData.holderName,
      balance: accountData.balance
    };
    
    this.accounts.push(newAccount);
    alert(`Account created successfully for ${accountData.holderName}!`);
    this.closeCreateAccountModal();
    
    // TODO: Refresh account data after successful creation
  }

  onPaymentSubmit(paymentData: PaymentData) {
    console.log('Payment submitted:', paymentData);
    // TODO: Call API to process payment
    // For now, just close the modal
    alert(`Payment of $${paymentData.amount} processed successfully!`);
    this.closePaymentModal();
    
    // TODO: Refresh account data after successful payment
  }

  onRefundSubmit(refundData: RefundData) {
    console.log('Refund submitted:', refundData);
    // TODO: Call API to process refund
    // For now, just close the modal
    alert(`Refund of $${refundData.amount} processed successfully!`);
    this.closeRefundModal();
    
    // TODO: Refresh account data after successful refund
  }
}
