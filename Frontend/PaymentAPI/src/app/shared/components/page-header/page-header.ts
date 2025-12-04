import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HeaderButton {
  label: string;
  icon?: string;
  cssClass?: string;
  onClick: () => void;
}

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.scss']
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() icon: string = '';
  @Input() showBackButton: boolean = false;
  @Input() buttons: HeaderButton[] = [];

  @Input() isCollapsed: boolean = false;
  
    onBackClick() {
    window.history.back();
    }
  

  onButtonClick(button: HeaderButton, event: Event) {
    event.stopPropagation();
    button.onClick();
  }
}
