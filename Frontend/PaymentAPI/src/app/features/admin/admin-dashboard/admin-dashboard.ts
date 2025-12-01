import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderButton, PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { DataTableComponent, TableAction, TableColumn } from '../../../shared/components/data-table/data-table';
import { CreateMerchantModalComponent, CreateMerchantData } from '../create-merchant-modal/create-merchant-modal';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent, DataTableComponent, CreateMerchantModalComponent],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent {
  isCreateMerchantModalOpen = false;

  constructor(private router: Router) {}

      headerButtons: HeaderButton[] = [
        {
          label: 'Add Merchant',
          icon: 'fa-plus',
          cssClass: 'primary',
          onClick: () => this.openCreateMerchantModal()
        }
      ];

        columns: TableColumn[] = [
          {
            key: 'MerchantId',
            label: 'Merchant ID'
          },
          {
            key: 'Name',
            label: 'Name'
          },
          {
            key: 'Email',
            label: 'Email'
          }
        ];

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

        merchants = [
            { MerchantId: 'M001', Name: 'John Traders',     Email: 'john@traders.com' },
            { MerchantId: 'M002', Name: 'Bright Electronics', Email: 'info@bright.com' },
            { MerchantId: 'M003', Name: 'Fashion Hub',       Email: 'support@fashionhub.com' },
            { MerchantId: 'M004', Name: 'Green Grocers',     Email: 'contact@greengrocers.com' },
            { MerchantId: 'M005', Name: 'Sports Planet',     Email: 'sales@sportsplanet.com' }
        ];

        viewAccounts(merchant: any) {
        console.log('View Accounts for', merchant);
        // Navigate to transaction history page
        this.router.navigate(['/admin/accounts', merchant.MerchantId]);
  }

  viewSummary(merchant: any) {
    console.log('View Summary for', merchant);
    this.router.navigate(['/admin/summary', merchant.MerchantId]);
  }

  openCreateMerchantModal() {
    this.isCreateMerchantModalOpen = true;
  }

  closeCreateMerchantModal() {
    this.isCreateMerchantModalOpen = false;
  }

  onMerchantSubmit(merchantData: CreateMerchantData) {
    console.log('Creating merchant:', merchantData);
    // TODO: Call API - POST /api/merchants with CreateMerchantCommand
    // API expects: { name: string, email: string }
    
    // For now, add to local array
    const newMerchant = {
      MerchantId: 'M' + String(this.merchants.length + 1).padStart(3, '0'),
      Name: merchantData.name,
      Email: merchantData.email
    };
    
    this.merchants = [...this.merchants, newMerchant];
    alert(`Merchant "${merchantData.name}" created successfully!`);
    this.closeCreateMerchantModal();
  }

}
