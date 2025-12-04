import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  isCollapsed = false;
  menuItems: MenuItem[] = [];
  portalTitle = 'Merchant Portal'; // Add this property

  merchantMenuItems: MenuItem[] = [
    { icon: 'fa-wallet', label: 'My Accounts', route: '/merchant/dashboard' }
  ];

  adminMenuItems: MenuItem[] = [
    { icon: 'fa-house', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'fa-undo', label: 'Refund Approvals', route: '/admin/refund-approvals'}
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateMenuAndTitle();

    // Subscribe to route changes to update menu dynamically
    this.router.events.subscribe(() => {
      this.updateMenuAndTitle();
    });
  }

  updateMenuAndTitle() {
    const url = this.router.url;
    if (url.startsWith('/admin')) {
      this.menuItems = this.adminMenuItems;
      this.portalTitle = 'Admin Portal';
    } else {
      this.menuItems = this.merchantMenuItems;
      this.portalTitle = 'Merchant Portal';
    }
  }

  onToggle() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSidebar.emit();
  }

  onLogout() {
    localStorage.clear();
    window.location.href = '/login'; 
  }
}