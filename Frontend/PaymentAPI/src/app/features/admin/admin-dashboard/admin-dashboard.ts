import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderButton, PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { DataTableComponent, TableAction, TableColumn } from '../../../shared/components/data-table/data-table';
import { CreateMerchantModalComponent, CreateMerchantData } from '../create-merchant-modal/create-merchant-modal';
import { MerchantService } from '../../../core/services/merchant/merchant';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent, DataTableComponent, CreateMerchantModalComponent],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent implements OnInit {

  isCreateMerchantModalOpen = false;
  merchants: any[] = [];

  constructor(
    private router: Router,
    private merchantService: MerchantService
  ) {}

  ngOnInit(): void {
    this.loadMerchants();
  }

  // ----------------------------
  // LOAD MERCHANT LIST (GET)
  // ----------------------------
  loadMerchants() {
    this.merchantService.getMerchants().subscribe({
      next: (response: any) => {
        // Assuming API returns: { isSuccess, data: merchants }
        this.merchants = response.data || [];
      },
      error: (err) => {
        console.error('Failed to load merchants', err);
        alert('Failed to load merchants');
      }
    });
  }

  // ----------------------------
  // HEADER BUTTONS
  // ----------------------------
  headerButtons: HeaderButton[] = [
    {
      label: 'Add Merchant',
      icon: 'fa-plus',
      cssClass: 'primary',
      onClick: () => this.openCreateMerchantModal()
    }
  ];

  // ----------------------------
  // TABLE COLUMNS
  // ----------------------------
  columns: TableColumn[] = [
    { key: 'id', label: 'Merchant ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  // ----------------------------
  // TABLE ACTIONS
  // ----------------------------
  actions: TableAction[] = [
    {
      label: 'Accounts',
      icon: 'fa-wallet',
      onClick: (row) => this.viewAccounts(row)
    },
    {
      label: 'Summary',
      icon: 'fa-credit-card',
      onClick: (row) => this.viewSummary(row)
    }
  ];

  // ----------------------------
  // ACTION HANDLERS
  // ----------------------------
  viewAccounts(merchant: any) {
    this.router.navigate(['/admin/accounts', merchant.id]);
  }

  viewSummary(merchant: any) {
    this.router.navigate(['/admin/summary', merchant.id]);
  }

  // ----------------------------
  // MODAL OPEN/CLOSE
  // ----------------------------
  openCreateMerchantModal() {
    this.isCreateMerchantModalOpen = true;
  }

  closeCreateMerchantModal() {
    this.isCreateMerchantModalOpen = false;
  }

  // ----------------------------
  // CREATE MERCHANT (POST)
  // ----------------------------
  onMerchantSubmit(merchantData: CreateMerchantData) {

    this.merchantService.createMerchant(merchantData).subscribe({
      next: (response: any) => {
        alert('Merchant created successfully!');
        
        // Reload merchant list
        this.loadMerchants();

        // Close modal
        this.closeCreateMerchantModal();
      },
      error: (err) => {
        console.error('Create merchant failed', err);
        alert('Failed to create merchant');
      }
    });
  }
}
