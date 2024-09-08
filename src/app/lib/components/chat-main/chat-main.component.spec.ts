import { TestBed, fakeAsync, tick, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ChatMainComponent } from './chat-main.component';
import { ChatSession } from '@lib/interfaces';
import { By } from '@angular/platform-browser';
import { Role } from '@lib/enums/role.enum';

describe('ChatMainComponent', () => {
    let component: ChatMainComponent;
    let fixture: ComponentFixture<ChatMainComponent>;

    const mockChatSessions: ChatSession[] = [
        {
            id: '1',
            created_at: new Date('2023-08-01'),
            updated_at: new Date('2023-08-01'),
            user_id: 'user1',
            chat_messages: [
                {
                    id: 'msg1',
                    created_at: new Date('2023-08-01'),
                    updated_at: new Date('2023-08-01'),
                    chat_session_id: '1',
                    message_content: 'Hello!',
                    role: Role.User,
                },
            ],
        },
        {
            id: '2',
            created_at: new Date('2023-09-01'),
            updated_at: new Date('2023-09-01'),
            user_id: 'user2',
            chat_messages: [
                {
                    id: 'msg2',
                    created_at: new Date('2023-09-01'),
                    updated_at: new Date('2023-09-01'),
                    chat_session_id: '2',
                    message_content: 'Hi!',
                    role: Role.Assistant,
                },
            ],
        },
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChatMainComponent);
        component = fixture.componentInstance;
        component.chatSessions = mockChatSessions; // Set mock data
        fixture.detectChanges(); // Trigger initial data binding
    });

    // Test 1: Ensure the component is created
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    // Test 2: Show skeleton loader when loading
    it('should show skeleton loader when loading', () => {
        component.isLoading = true; // Simulate loading state
        fixture.detectChanges(); // Trigger change detection

        const loader = fixture.debugElement.query(By.css('.animate-pulse')); // Query for loader
        expect(loader).toBeTruthy(); // Loader should be present
    });

    // Test 3: Filter chat sessions by date range
    it('should filter chat sessions by date range', () => {
        component.isLoading = false; // Simulate loading finished
        fixture.detectChanges(); // Trigger change detection

        component.onDateRangeSelected({
            startDate: '2023-08-01',
            endDate: '2023-08-31',
        });

        fixture.detectChanges(); // Trigger change detection

        expect(component.filteredChatSessions.length).toBe(1);
        expect(component.filteredChatSessions[0].id).toBe('1'); // Only first session should be in range
    });

    // Test 4: Handle date error and clear chat sessions
    it('should handle date error and clear chat sessions', () => {
        component.onDateError('Invalid date range'); // Simulate date error
        fixture.detectChanges(); // Trigger change detection

        expect(component.dateError).toBe('Invalid date range'); // Error message should be set
        expect(component.filteredChatSessions.length).toBe(0); // Chat sessions should be cleared
    });

    // Test 5: Display chat sessions after loading
    it('should display chat sessions after loading', fakeAsync(() => {
        component.ngOnInit(); // Call ngOnInit to simulate component initialization
        tick(1000); // Simulate passage of time for loading
        fixture.detectChanges(); // Trigger change detection

        expect(component.isLoading).toBeFalse(); // Loading state should be false
        const chatSessions = fixture.debugElement.queryAll(By.css('.chat-session'));
        expect(chatSessions.length).toBe(2); // Two chat sessions should be displayed
    }));

    // Test 6: Reset filters and show all chat sessions
    it('should reset filters and show all chat sessions', () => {
        component.filteredChatSessions = [mockChatSessions[0]]; // Simulate filtered state
        fixture.detectChanges();

        component.resetFilters(); // Call resetFilters
        fixture.detectChanges(); // Trigger change detection

        expect(component.filteredChatSessions.length).toBe(2); // All sessions should be shown
        expect(component.filteredChatSessions[0].id).toBe('1');
        expect(component.filteredChatSessions[1].id).toBe('2');
    });
});
