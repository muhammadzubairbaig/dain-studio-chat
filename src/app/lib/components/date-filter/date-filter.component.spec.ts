import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFilterComponent } from './date-filter.component';
import { FormsModule } from '@angular/forms';

describe('DateFilterComponent', () => {
    let component: DateFilterComponent;
    let fixture: ComponentFixture<DateFilterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule], // Import FormsModule to handle ngModel
            declarations: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DateFilterComponent); // Create component instance
        component = fixture.componentInstance; // Assign component
        fixture.detectChanges(); // Trigger initial data binding
    });

    // Test 1: Ensure the component is created successfully
    it('should create the component', () => {
        expect(component).toBeTruthy(); // Component should exist
    });

    // Test 2: Emit the date range when valid
    it('should emit the date range when valid', () => {
        spyOn(component.dateRangeSelected, 'emit'); // Spy on the event emitter
        component.startDate = '2023-08-01';
        component.endDate = '2023-08-31';
        component.onStartDateChange();
        component.onEndDateChange();
        expect(component.dateRangeSelected.emit).toHaveBeenCalledWith({
            startDate: '2023-08-01',
            endDate: '2023-08-31',
        }); // Should emit correct date range
    });

    // Test 3: Emit an error if the end date is earlier than the start date
    it('should emit an error when the end date is earlier than the start date', () => {
        spyOn(component.dateErrorEvent, 'emit'); // Spy on the error emitter
        component.startDate = '2023-08-31';
        component.endDate = '2023-08-01';
        component.onStartDateChange();
        component.onEndDateChange();
        expect(component.dateErrorEvent.emit).toHaveBeenCalledWith('End date cannot be earlier than start date.');
    });

    // Test 4: Reset filters and emit the reset event
    it('should reset the filters and emit a reset event', () => {
        spyOn(component.resetCalendar, 'emit'); // Spy on the reset event
        component.resetFilters();
        expect(component.startDate).toBeNull(); // Dates should be reset
        expect(component.endDate).toBeNull();
        expect(component.minEndDate).toBeNull();
        expect(component.maxStartDate).toBeNull();
        expect(component.resetCalendar.emit).toHaveBeenCalled(); // Reset event should be emitted
    });
});
