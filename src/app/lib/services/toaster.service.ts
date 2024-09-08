import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define an interface to represent the structure of the toast notification
export interface Toast {
    message: string;
    type: 'success' | 'error' | 'warning';
    title: string;
}

@Injectable({
    providedIn: 'root',
})
export class ToasterService {
    // Use the Toast interface instead of any
    private toastSubject = new BehaviorSubject<Toast | null>(null);

    // Return an Observable of type Toast
    getToasts(): Observable<Toast | null> {
        return this.toastSubject.asObservable();
    }

    // Show a toast with a defined message, type, and title
    showToast(message: string, type: 'success' | 'error' | 'warning' = 'success', title = 'Notification'): void {
        const toast: Toast = { message, type, title };
        this.toastSubject.next(toast);
    }
}
