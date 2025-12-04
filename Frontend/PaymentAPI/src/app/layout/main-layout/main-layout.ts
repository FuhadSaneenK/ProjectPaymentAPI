import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { TopbarComponent } from '../topbar/topbar';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, TopbarComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent {
  isSidebarCollapsed = false;

  onToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}