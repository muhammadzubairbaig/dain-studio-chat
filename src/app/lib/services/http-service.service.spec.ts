import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http-service.service';
import { API_ENDPOINTS } from '@lib/constants';

describe('HttpService', () => {
    let service: HttpService; // The service that will be tested
    let httpMock: HttpTestingController; // The mock controller for testing HTTP requests

    // Setup before each test
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule], // Import the HttpClientTestingModule for mock HTTP requests
            providers: [HttpService], // Provide the HttpService for testing
        });

        // Inject the HttpService and HttpTestingController into the test
        service = TestBed.inject(HttpService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    // After each test, ensure no outstanding HTTP requests are left
    afterEach(() => {
        httpMock.verify(); // Verify that no unmatched requests are pending
    });

    // Test case to check if the service fetches chat sessions successfully
    it('should fetch chat sessions', () => {
        const mockChatSessions = [
            {
                id: '1',
                created_at: new Date(), // Use the current date for testing
                updated_at: new Date(),
                chat_messages: [], // Empty messages array for simplicity
                user_id: '123',
            },
        ];

        // Call the service method and subscribe to its result
        service.getChatSessions().subscribe((chatSessions) => {
            // Expectations to check if the response matches the mock data
            expect(chatSessions.length).toBe(1); // Check that one session is returned
            expect(chatSessions).toEqual(mockChatSessions); // Check that the data matches
        });

        // Expect that the service made an HTTP GET request to the correct URL
        const req = httpMock.expectOne(API_ENDPOINTS.CHAT_SESSIONS);
        expect(req.request.method).toBe('GET'); // Ensure that the request method is GET

        // Respond with mock chat session data to simulate the API response
        req.flush(mockChatSessions);
    });
});
