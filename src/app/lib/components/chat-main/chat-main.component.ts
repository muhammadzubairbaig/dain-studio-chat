import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChatSession } from '@lib/interfaces'; // Assuming ChatSession is defined in this path
import { DateFilterComponent } from '@lib/components/date-filter/date-filter.component';
/**
 * ChatMainComponent is responsible for displaying chat sessions and handling the filtering
 * of chat sessions based on the selected date range. It also manages the loading state and
 * displays appropriate messages when no chat sessions are available.
 */
@Component({
    selector: 'app-chat-main',
    standalone: true,
    imports: [CommonModule, DateFilterComponent],
    templateUrl: './chat-main.component.html',
})
export class ChatMainComponent implements OnInit {
    // Input property to receive chat sessions from the parent component
    @Input() chatSessions: ChatSession[] = [];

    // Array to hold filtered chat sessions after applying date filters or other criteria
    filteredChatSessions: ChatSession[] = [];

    // Variable to store any date-related errors
    dateError: string | null = null;

    // Array used to create placeholders for a skeleton loader UI
    loaders = Array(4);

    // Boolean to indicate if the data is currently being loaded
    isLoading = true; // Initially true to show the loader

    /**
     * Angular lifecycle hook that gets called after data-bound properties are initialized.
     * Here, it initializes the filtered chat sessions to be the same as the input chat sessions.
     */
    ngOnInit(): void {
        // Simulate data loading
        setTimeout(() => {
            this.isLoading = false;
            this.filteredChatSessions = this.chatSessions;
        }, 1000); // Adjust the timing as needed to show the skeleton loader
    }

    /**
     * Handles the event when a date range is selected.
     * Filters the chat sessions based on the selected start and end dates.
     * @param dateRange - Object containing the start and end dates
     */
    onDateRangeSelected(dateRange: { startDate: string | null; endDate: string | null }): void {
        const { startDate, endDate } = dateRange;
        if (startDate && endDate) {
            const start = new Date(startDate).setHours(0, 0, 0, 0); // Ensure the time is set to 00:00:00
            const end = new Date(endDate).setHours(23, 59, 59, 999); // Include the full day
            this.filteredChatSessions = this.chatSessions.filter((session) => {
                const sessionDate = new Date(session.created_at).getTime(); // Convert to timestamp
                return sessionDate >= start && sessionDate <= end;
            });
        }
    }

    /**
     * Handles any date validation errors by clearing the filtered sessions.
     * @param error - The error message related to the date selection
     */
    onDateError(error: string | null): void {
        this.dateError = error;
    }

    /**
     * Resets the date filters and shows all chat sessions.
     */
    resetFilters(): void {
        this.filteredChatSessions = [...this.chatSessions];
        this.dateError = null;
    }
}
