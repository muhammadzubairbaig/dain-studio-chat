import { TestBed } from '@angular/core/testing';
import { ToasterService, Toast } from './';

describe('ToasterService', () => {
    let service: ToasterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ToasterService],
        });

        service = TestBed.inject(ToasterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a toast when showToast is called', () => {
        const mockToast: Toast = { message: 'Test Message', type: 'success', title: 'Test Title' };

        // Call showToast method
        service.showToast(mockToast.message, mockToast.type, mockToast.title);

        // Subscribe to getToasts to assert the emitted value
        service.getToasts().subscribe((toast) => {
            expect(toast).toEqual(mockToast); // Check if the toast matches the mock toast
        });
    });

    it('should return null initially from getToasts', () => {
        service.getToasts().subscribe((toast) => {
            expect(toast).toBeNull(); // Initially, the toast should be null
        });
    });

    it('should emit multiple toasts', () => {
        const mockToast1: Toast = { message: 'Test Message 1', type: 'success', title: 'Test Title 1' };
        const mockToast2: Toast = { message: 'Test Message 2', type: 'error', title: 'Test Title 2' };

        const toastValues: (Toast | null)[] = [];

        service.getToasts().subscribe((toast) => {
            toastValues.push(toast);
        });

        // Emit first toast
        service.showToast(mockToast1.message, mockToast1.type, mockToast1.title);
        // Emit second toast
        service.showToast(mockToast2.message, mockToast2.type, mockToast2.title);

        expect(toastValues).toEqual([null, mockToast1, mockToast2]); // The first value is null by default, followed by emitted values
    });
});
