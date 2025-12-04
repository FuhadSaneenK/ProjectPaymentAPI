import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal';

export interface CreateMerchantData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-create-merchant-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './create-merchant-modal.html',
  styleUrls: ['./create-merchant-modal.scss']
})
export class CreateMerchantModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() submitMerchant = new EventEmitter<CreateMerchantData>();

  merchantData: CreateMerchantData = {
    name: '',
    email: ''
  };

  onClose() {
    this.resetForm();
    this.close.emit();
  }

  onSubmit() {
    if (this.merchantData.name && this.merchantData.email) {
      this.submitMerchant.emit({ ...this.merchantData });
      this.resetForm();
    }
  }

  resetForm() {
    this.merchantData = {
      name: '',
      email: ''
    };
  }
}
