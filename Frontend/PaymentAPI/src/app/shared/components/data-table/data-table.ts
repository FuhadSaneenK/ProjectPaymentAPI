import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'date' | 'badge';
  cssClass?: string;
  format?: (value: any, row?: any) => string;
  badgeConfig?: {
    colorMap: { [key: string]: string };
  };
}

export interface TableAction {
  label: string;
  icon?: string;
  cssClass?: string;
  visible?: (row: any) => boolean;
  onClick: (row: any) => void;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.scss']
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'No data available';
  @Input() sectionTitle: string = '';
  @Input() sectionSubtitle: string = '';
  
  @Output() rowClick = new EventEmitter<any>();

  getCellValue(row: any, column: TableColumn): string {
    const value = row[column.key];
    
    if (column.format) {
      return column.format(value, row);
    }

    switch (column.type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD' 
        }).format(value || 0);
      
      case 'number':
        return new Intl.NumberFormat('en-US').format(value || 0);
      
      case 'date':
        if (!value) return '-';
        return new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      
      default:
        return value?.toString() || '-';
    }
  }

  getBadgeClass(row: any, column: TableColumn): string {
    if (column.type !== 'badge' || !column.badgeConfig) return '';
    
    const value = row[column.key];
    return column.badgeConfig.colorMap[value] || '';
  }

  isActionVisible(action: TableAction, row: any): boolean {
    return action.visible ? action.visible(row) : true;
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  onActionClick(action: TableAction, row: any, event: Event) {
    event.stopPropagation();
    action.onClick(row);
  }
}
