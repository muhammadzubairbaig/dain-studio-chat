import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToasterComponent } from './toaster.component';
import { Toast, ToasterService } from '@lib/services/toaster.service';
import { Subject } from 'rxjs';

describe('ToasterComponent', () => {
    let component: ToasterComponent;
    let fixture: ComponentFixture<ToasterComponent>;
    let mockToasterService: ToasterService;
    let toastSubject: Subject<Toast>;

    beforeEach(async () => {
        toastSubject = new Subject();

        // Mock the ToasterService
        mockToasterService = jasmine.createSpyObj('ToasterService', ['getToasts']);
        (mockToasterService.getToasts as jasmine.Spy).and.returnValue(toastSubject.asObservable());

        await TestBed.configureTestingModule({
            imports: [], // Add necessary imports like CommonModule if needed
            declarations: [],
            providers: [{ provide: ToasterService, useValue: mockToasterService }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToasterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Trigger initial data binding
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should automatically remove the toast after 5 seconds', fakeAsync(() => {
        const toastData: Toast = { message: 'This is a test message', type: 'success', title: 'Success' };

        // Emit the toast through the service
        toastSubject.next(toastData);
        fixture.detectChanges();

        // Fast forward 5 seconds
        tick(5000);
        fixture.detectChanges();

        // Verify that the toast is removed
        expect(component.toasts.length).toBe(0);
    }));

    it('should manually remove a toast when the close button is clicked', () => {
        const toastData: Toast = { message: 'This is a test message', type: 'success', title: 'Success' };

        // Emit the toast through the service
        toastSubject.next(toastData);
        fixture.detectChanges();

        // Verify that the toast is added
        expect(component.toasts.length).toBe(1);

        // Find the close button and simulate a click
        const closeButton = fixture.debugElement.query(By.css('button'));
        closeButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        // Verify that the toast is removed after clicking the close button
        expect(component.toasts.length).toBe(0);
    });
});
