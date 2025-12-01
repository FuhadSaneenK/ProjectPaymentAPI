import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal';

export interface CreateAccountData {
  holderName: string;
  balance: number;
  merchantId: string;
}

@Component({
  selector: 'app-create-account-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './create-account-modal.html',
  styleUrls: ['./create-account-modal.scss']
})
export class CreateAccountModalComponent {
  @Input() isOpen: boolean = false;
  @Input() merchantId: string = '';
  
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitAccount = new EventEmitter<CreateAccountData>();

  holderName: string = '';
  balance: number = 0;
  isSubmitting: boolean = false;

  onClose() {
    this.resetForm();
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.isValid()) {
      this.isSubmitting = true;
      
      const accountData: CreateAccountData = {
        holderName: this.holderName,
        balance: this.balance,
        merchantId: this.merchantId
      };

      this.submitAccount.emit(accountData);
    }
  }

  isValid(): boolean {
    return this.holderName.trim() !== '' && this.balance >= 0;
  }

  resetForm() {
    this.holderName = '';
    this.balance = 0;
    this.isSubmitting = false;
  }
}
