import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToasterService, Toast } from '@lib/services/toaster.service';

@Component({
    selector: 'app-toaster',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './toaster.component.html',
})
export class ToasterComponent {
    toasts: Toast[] = []; // Use the Toast interface instead of any[]

    constructor(private toasterService: ToasterService) {
        this.toasterService.getToasts().subscribe((toast: Toast | null) => {
            if (toast?.message) {
                this.toasts.push(toast);
                setTimeout(() => this.removeToast(toast), 5000); // Auto-remove toast after 5 seconds
            }
        });
    }

    removeToast(toast: Toast) {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }
}
