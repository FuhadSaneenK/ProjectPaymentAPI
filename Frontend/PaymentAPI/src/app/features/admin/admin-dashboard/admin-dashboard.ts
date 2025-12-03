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








// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { HeaderButton, PageHeaderComponent } from '../../../shared/components/page-header/page-header';
// import { DataTableComponent, TableAction, TableColumn } from '../../../shared/components/data-table/data-table';
// import { CreateMerchantModalComponent, CreateMerchantData } from '../create-merchant-modal/create-merchant-modal';

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [CommonModule, RouterModule, PageHeaderComponent, DataTableComponent, CreateMerchantModalComponent],
//   templateUrl: './admin-dashboard.html',
//   styleUrls: ['./admin-dashboard.scss']
// })
// export class AdminDashboardComponent {
//   isCreateMerchantModalOpen = false;

//   constructor(private router: Router) {}

//       headerButtons: HeaderButton[] = [
//         {
//           label: 'Add Merchant',
//           icon: 'fa-plus',
//           cssClass: 'primary',
//           onClick: () => this.openCreateMerchantModal()
//         }
//       ];

//         columns: TableColumn[] = [
//           {
//             key: 'MerchantId',
//             label: 'Merchant ID'
//           },
//           {
//             key: 'Name',
//             label: 'Name'
//           },
//           {
//             key: 'Email',
//             label: 'Email'
//           }
//         ];

//         actions: TableAction[] = [
//           {
//             label: 'Accounts',
//             icon: 'fa-wallet',
//             onClick: (row) => this.viewAccounts(row)
//           },
//           {
//             label: 'Summary',
//             icon: 'fa-credit-card',
//             onClick: (row) => this.viewSummary(row)
//           }
//         ];

//         merchants = [
//             { MerchantId: 'M001', Name: 'John Traders',     Email: 'john@traders.com' },
//             { MerchantId: 'M002', Name: 'Bright Electronics', Email: 'info@bright.com' },
//             { MerchantId: 'M003', Name: 'Fashion Hub',       Email: 'support@fashionhub.com' },
//             { MerchantId: 'M004', Name: 'Green Grocers',     Email: 'contact@greengrocers.com' },
//             { MerchantId: 'M005', Name: 'Sports Planet',     Email: 'sales@sportsplanet.com' }
//         ];

//         viewAccounts(merchant: any) {
//         console.log('View Accounts for', merchant);
//         // Navigate to transaction history page
//         this.router.navigate(['/admin/accounts', merchant.MerchantId]);
//   }

//   viewSummary(merchant: any) {
//     console.log('View Summary for', merchant);
//     this.router.navigate(['/admin/summary', merchant.MerchantId]);
//   }

//   openCreateMerchantModal() {
//     this.isCreateMerchantModalOpen = true;
//   }

//   closeCreateMerchantModal() {
//     this.isCreateMerchantModalOpen = false;
//   }

//   onMerchantSubmit(merchantData: CreateMerchantData) {
//     console.log('Creating merchant:', merchantData);
//     // TODO: Call API - POST /api/merchants with CreateMerchantCommand
//     // API expects: { name: string, email: string }
    
//     // For now, add to local array
//     const newMerchant = {
//       MerchantId: 'M' + String(this.merchants.length + 1).padStart(3, '0'),
//       Name: merchantData.name,
//       Email: merchantData.email
//     };
    
//     this.merchants = [...this.merchants, newMerchant];
//     alert(`Merchant "${merchantData.name}" created successfully!`);
//     this.closeCreateMerchantModal();
//   }

// }
