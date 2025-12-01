import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table';

@Component({
  selector: 'app-refund',
  imports: [PageHeaderComponent, DataTableComponent],
  templateUrl: './refund.html',
  styleUrl: './refund.scss',
})
export class Refund {
  pendingRefunds = [
    {
      referenceNumber: 'REF001',
      originalRef: 'TXN123456',
      amount: 450.00,
      account: 'ACC001'
    },
    {
      referenceNumber: 'REF002',
      originalRef: 'TXN789012',
      amount: 1200.50,
      account: 'ACC002'
    }
  ];

  columns: TableColumn[] = [
    {
      key: 'referenceNumber',
      label: 'Reference Number'
    },
    {
      key: 'originalRef',
      label: 'Original Ref'
    },
    {
      key: 'amount',
      label: 'Amount',
      type: 'currency'
    },
    {
      key: 'account',
      label: 'Account'
    }
  ];

  actions: TableAction[] = [
    {
      label: 'Approve',
      icon: 'fa-check',
      cssClass: 'btn-success',
      onClick: (row) => this.approveRefund(row)
    },
    {
      label: 'Reject',
      icon: 'fa-times',
      cssClass: 'btn-danger',
      onClick: (row) => this.rejectRefund(row)
    }
  ];

  approveRefund(refund: any) {
    console.log('Approving refund:', refund);
    // TODO: Call API to approve refund
    alert(`Refund ${refund.referenceNumber} approved successfully!`);
  }

  rejectRefund(refund: any) {
    console.log('Rejecting refund:', refund);
    // TODO: Call API to reject refund
    if (confirm(`Are you sure you want to reject refund ${refund.referenceNumber}?`)) {
      alert(`Refund ${refund.referenceNumber} rejected.`);
    }
  }
}
