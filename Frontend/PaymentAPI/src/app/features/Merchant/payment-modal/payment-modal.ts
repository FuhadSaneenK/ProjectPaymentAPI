import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal';

export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
}

// export interface PaymentData {
//   accountId: string;
//   amount: number;
//   paymentMethodId: string;
//   referenceNo: string;
// }
export interface PaymentData {
  accountId: number;
  amount: number;
  paymentMethodId: number;
  referenceNo: string;
}


@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './payment-modal.html',
  styleUrls: ['./payment-modal.scss']
})
export class PaymentModalComponent {
  @Input() isOpen: boolean = false;
  // @Input() accountId: string = '';
  @Input() accountId: number = 0;

  @Input() accountHolderName: string = '';
  @Input() paymentMethods: PaymentMethod[] = [];
  
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitPayment = new EventEmitter<PaymentData>();

  amount: number = 0;
  paymentMethodId: string = '';
  isSubmitting: boolean = false;

  onClose() {
    this.resetForm();
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.isValid()) {
      this.isSubmitting = true;
      
      const paymentData: PaymentData = {
        accountId: this.accountId,
        amount: this.amount,
        paymentMethodId: Number(this.paymentMethodId),
        referenceNo: this.generateReferenceNumber()
      };

      this.submitPayment.emit(paymentData);
    }
  }

  isValid(): boolean {
    return this.amount > 0 && this.paymentMethodId.trim() !== '';
  }

  resetForm() {
    this.amount = 0;
    this.paymentMethodId = '';
    this.isSubmitting = false;
  }

  private generateReferenceNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TXN${timestamp}${random}`;
  }
}
