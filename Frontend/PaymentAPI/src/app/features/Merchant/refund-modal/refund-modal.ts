import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal';

export interface RefundData {
  accountId: number;
  amount: number;
  referenceNo: string;
  reason: string;
}

@Component({
  selector: 'app-refund-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './refund-modal.html',
  styleUrls: ['./refund-modal.scss']
})
export class RefundModalComponent {
  @Input() isOpen: boolean = false;
  @Input() accountId: number = 0;
  @Input() accountHolderName: string = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitRefund = new EventEmitter<RefundData>();

  amount: number = 0;
  referenceNo: string = '';
  reason: string = '';
  isSubmitting: boolean = false;

  onClose() {
    this.resetForm();
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.isValid()) {
      this.isSubmitting = true;

      const refundData: RefundData = {
        accountId: Number(this.accountId),
        amount: Number(this.amount),
        referenceNo: this.referenceNo.trim(),
        reason: this.reason.trim()
      };

      this.submitRefund.emit(refundData);
    }
  }

  isValid(): boolean {
    return (
      this.amount > 0 &&
      this.referenceNo.trim() !== '' &&
      this.reason.trim() !== ''
    );
  }

  resetForm() {
    this.amount = 0;
    this.referenceNo = '';
    this.reason = '';
    this.isSubmitting = false;
  }
}



// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ModalComponent } from '../../../shared/components/modal/modal';

// export interface RefundData {
//   accountId: string;
//   amount: number;
//   referenceNo: string;
//   reason: string;
// }

// @Component({
//   selector: 'app-refund-modal',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ModalComponent],
//   templateUrl: './refund-modal.html',
//   styleUrls: ['./refund-modal.scss']
// })
// export class RefundModalComponent {
//   @Input() isOpen: boolean = false;
//   @Input() accountId: string = '';
//   @Input() accountHolderName: string = '';
  
//   @Output() closeModal = new EventEmitter<void>();
//   @Output() submitRefund = new EventEmitter<RefundData>();

//   amount: number = 0;
//   referenceNo: string = '';
//   reason: string = '';
//   isSubmitting: boolean = false;

//   onClose() {
//     this.resetForm();
//     this.closeModal.emit();
//   }

//   onSubmit() {
//     if (this.isValid()) {
//       this.isSubmitting = true;
      
//       const refundData: RefundData = {
//         accountId: this.accountId,
//         amount: this.amount,
//         referenceNo: this.referenceNo,
//         reason: this.reason
//       };

//       this.submitRefund.emit(refundData);
//     }
//   }

//   isValid(): boolean {
//     return this.amount > 0 && this.referenceNo.trim() !== '' && this.reason.trim() !== '';
//   }

//   resetForm() {
//     this.amount = 0;
//     this.referenceNo = '';
//     this.reason = '';
//     this.isSubmitting = false;
//   }
// }
