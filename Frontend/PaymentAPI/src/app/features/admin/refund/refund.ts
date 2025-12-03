import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table';

import { AuthService } from '../../../core/services/auth.service';
import { RefundStatusService } from '../../../core/services/refund/refund-status.service.ts';

@Component({
  selector: 'app-refund',
  standalone: true,
  imports: [PageHeaderComponent, DataTableComponent],
  templateUrl: './refund.html',
  styleUrl: './refund.scss',
})
export class Refund implements OnInit {

  pendingRefunds: any[] = [];
  loading = false;

  constructor(
    private refundStatusService: RefundStatusService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPendingRefunds();
  }

  // ---------------------------------------
  // LOAD ALL PENDING REFUNDS FROM API
  // ---------------------------------------
  loadPendingRefunds() {
    this.loading = true;

    this.refundStatusService.getPendingRefunds().subscribe({
      next: (response: any) => {
        this.pendingRefunds = response.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load pending refunds:", err);
        alert("Failed to load pending refunds");
        this.loading = false;
      }
    });
  }

  // ---------------------------------------
  // TABLE COLUMNS
  // ---------------------------------------
  columns: TableColumn[] = [
    { key: 'id', label: 'Refund ID' },
    { key: 'originalPaymentReference', label: 'Original Ref' },
    { key: 'amount', label: 'Amount', type: 'currency' },
    { key: 'accountId', label: 'Account ID' },
    { key: 'reason', label: 'Reason' },
    { key: 'requestDate', label: 'Requested On' }
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

  // ---------------------------------------
  // APPROVE REFUND
  // ---------------------------------------
  approveRefund(refund: any) {
    const adminUserId = this.authService.getCurrentUser()?.id;

    if (!adminUserId) {
      alert("Invalid admin session");
      return;
    }

    this.refundStatusService.approveRefund(refund.id, adminUserId, "Approved by admin").subscribe({
      next: () => {
        alert(`Refund ${refund.id} approved successfully!`);
        this.loadPendingRefunds();
      },
      error: (err) => {
        console.error("Approval failed:", err);
        alert("Failed to approve refund");
      }
    });
  }

  // ---------------------------------------
  // REJECT REFUND
  // ---------------------------------------
  rejectRefund(refund: any) {
    const adminUserId = this.authService.getCurrentUser()?.id;

    if (!adminUserId) {
      alert("Invalid admin session");
      return;
    }

    const reason = prompt("Enter rejection reason:");

    if (!reason || reason.trim() === '') {
      alert("Rejection reason required");
      return;
    }

    this.refundStatusService.rejectRefund(refund.id, adminUserId, reason).subscribe({
      next: () => {
        alert(`Refund ${refund.id} rejected.`);
        this.loadPendingRefunds();
      },
      error: (err) => {
        console.error("Rejection failed:", err);
        alert("Failed to reject refund");
      }
    });
  }
}
