import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * DateFilterComponent handles the logic for selecting and validating date ranges.
 * It emits events when the date range is selected, reset, or when there is a validation error.
 */
@Component({
    selector: 'app-date-filter',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './date-filter.component.html',
})
export class DateFilterComponent {
    /**
     * Event emitter that triggers when the date range is selected.
     * Emits an object containing startDate and endDate, which can be null.
     */
    @Output() readonly dateRangeSelected = new EventEmitter<{ startDate: string | null; endDate: string | null }>();

    /**
     * Event emitter that triggers when the reset action is performed.
     * Emits a void event to signal the parent component to reset filters.
     */
    @Output() readonly resetCalendar = new EventEmitter<void>();

    /**
     * Event emitter that triggers when there's an error in date selection.
     * Emits a string containing the error message or null if there's no error.
     */
    @Output() readonly dateErrorEvent = new EventEmitter<string | null>();

    /**
     * Stores the selected start date.
     * Can be null if no date is selected.
     */
    startDate: string | null = null;

    /**
     * Stores the selected end date.
     * Can be null if no date is selected.
     */
    endDate: string | null = null;

    /**
     * Determines the minimum selectable end date, which is set based on the start date.
     * Helps to ensure that the end date cannot be earlier than the start date.
     */
    minEndDate: string | null = null;

    /**
     * Determines the maximum selectable start date, which is set based on the end date.
     * Helps to ensure that the start date cannot be later than the end date.
     */
    maxStartDate: string | null = null;

    /**
     * Stores any error message related to date selection.
     * Can be null if there's no error.
     */
    dateError: string | null = null;

    // Additional methods for handling date changes, validation, and emitting events would go here.

    /**
     * Handles changes to the start date.
     * Adjusts the minimum end date and triggers validation.
     */
    onStartDateChange(): void {
        this.minEndDate = this.startDate;
        this._validateAndEmitDateRange();
    }

    /**
     * Handles changes to the end date.
     * Adjusts the maximum start date and triggers validation.
     */
    onEndDateChange(): void {
        this.maxStartDate = this.endDate;
        this._validateAndEmitDateRange();
    }

    /**
     * Validates the selected date range and emits the result.
     * Private method to ensure encapsulation of logic.
     */
    private _validateAndEmitDateRange(): void {
        this._validateDateRange();
        if (!this.dateError) {
            this._emitDateRange();
        }
    }

    /**
     * Validates the date range to ensure the end date is not before the start date.
     */
    private _validateDateRange(): void {
        if (this.startDate && this.endDate) {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);

            if (start > end) {
                this._setDateError('End date cannot be earlier than start date.');
                return;
            }
        }
        this._setDateError(null);
    }

    /**
     * Sets the date error message and emits the error event.
     * @param error - The error message or null if no error
     */
    private _setDateError(error: string | null): void {
        this.dateError = error;
        this.dateErrorEvent.emit(error);
    }

    /**
     * Emits the selected date range if validation passes.
     */
    private _emitDateRange(): void {
        this.dateRangeSelected.emit({ startDate: this.startDate, endDate: this.endDate });
    }

    /**
     * Resets the date filter fields and emits the reset event.
     */
    resetFilters(): void {
        this.startDate = null;
        this.endDate = null;
        this.minEndDate = null;
        this.maxStartDate = null;
        this._setDateError(null);
        this.resetCalendar.emit();
    }
}
