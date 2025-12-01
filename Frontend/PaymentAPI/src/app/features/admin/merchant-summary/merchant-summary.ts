import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-merchant-summary',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './merchant-summary.html',
  styleUrls: ['./merchant-summary.scss']
})
export class MerchantSummary implements OnInit {
  merchantId: string = '';
  
  // Summary data from backend
  summary = {
    merchantId: '',
    merchantName: '',
    email: '',
    totalBalance: 0,
    totalTransactions: 0,
    totalPayments: 0,
    totalRefunds: 0,
    totalHolders: 0
  };

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.merchantId = params['MerchantId'];
      this.loadMerchantSummary();
    });
  }

  loadMerchantSummary() {
    this.isLoading = true;
    // TODO: Call API - GET /api/merchants/{merchantId}/summary
    // this.merchantService.getMerchantSummary(this.merchantId).subscribe(...)
    
    // Mock data for now
    setTimeout(() => {
      this.summary = {
        merchantId: this.merchantId,
        merchantName: 'John Traders',
        email: 'john@traders.com',
        totalBalance: 24570.75,
        totalTransactions: 156,
        totalPayments: 142,
        totalRefunds: 14,
        totalHolders: 4
      };
      this.isLoading = false;
    }, 500);
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}
