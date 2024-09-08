import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatSessionComponent } from './chat-session.component';
import { HttpService } from '@lib/services/http-service.service';
import { of } from 'rxjs';
import { ChatSession } from '@lib/interfaces';
import { Role } from '@lib/enums/role.enum';

describe('ChatSessionComponent', () => {
    let component: ChatSessionComponent;
    let fixture: ComponentFixture<ChatSessionComponent>;
    let mockHttpService: jasmine.SpyObj<HttpService>; // A mocked version of the HttpService

    // Sample mock chat session data for the test cases
    const mockChatSessions: ChatSession[] = [
        {
            id: '1',
            created_at: new Date('2023-08-01T00:00:00Z'),
            updated_at: new Date('2023-08-01T00:00:00Z'),
            user_id: 'user1',
            chat_messages: [
                {
                    id: 'msg1',
                    created_at: new Date('2023-08-01T00:00:00Z'),
                    updated_at: new Date('2023-08-01T00:00:00Z'),
                    chat_session_id: '1',
                    message_content: 'Hello!',
                    role: Role.User, // Message role from the Role enum
                },
            ],
        },
    ];

    beforeEach(async () => {
        mockHttpService = jasmine.createSpyObj('HttpService', ['getChatSessions']);
        mockHttpService.getChatSessions.and.returnValue(of([])); // Mock empty chat session data

        await TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [{ provide: HttpService, useValue: mockHttpService }],
        }).compileComponents();
    });

    beforeEach(() => {
        // Create a spy object for HttpService with a mock implementation for the 'getChatSessions' method
        mockHttpService = jasmine.createSpyObj('HttpService', ['getChatSessions']);
        mockHttpService.getChatSessions.and.returnValue(of(mockChatSessions)); // Mocking the API response with sample data

        TestBed.configureTestingModule({
            declarations: [], // Add any components if necessary
            providers: [{ provide: HttpService, useValue: mockHttpService }], // Provide the mock service to the component
        }).compileComponents();

        // Initialize component and fixture
        fixture = TestBed.createComponent(ChatSessionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Trigger Angular change detection
    });

    // Test to check if the component is created successfully
    it('should create the component', () => {
        expect(component).toBeTruthy(); // Component instance should exist
    });

    // Test to ensure chat sessions are loaded on initialization
    it('should load chat sessions on init', () => {
        expect(component.chatSessions.length).toBe(1); // Verify the number of chat sessions
        expect(component.chatSessions[0].id).toBe('1'); // Verify the session ID
    });

    // Test to check if the HttpService is called to fetch chat sessions
    it('should call HttpService to get chat sessions', () => {
        expect(mockHttpService.getChatSessions).toHaveBeenCalled(); // Ensure that the service was called
    });
});
