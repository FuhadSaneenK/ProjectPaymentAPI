import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss']
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showCloseButton: boolean = true;
  @Input() closeOnBackdropClick: boolean = true;
  @Input() closeOnEscape: boolean = true;
  
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if (this.closeOnBackdropClick && (event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isOpen && this.closeOnEscape) {
      this.onClose();
    }
  }
}
