import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChatSession } from '@lib/interfaces';
import { API_ENDPOINTS } from '@lib/constants';
/**
 * Service to handle HTTP requests for chat sessions.
 */
@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private readonly apiUrl = API_ENDPOINTS.CHAT_SESSIONS + 'sss'; // API endpoint

    constructor(private http: HttpClient) {}

    /**
     * Fetches chat sessions from the server.
     * @returns {Observable<ChatSession[]>} - Observable that emits chat session data.
     */
    getChatSessions(): Observable<ChatSession[]> {
        const headers = this.createHeaders(); // Create HTTP headers for the request
        return this.http.get<ChatSession[]>(`${this.apiUrl}`, { headers }).pipe(
            catchError(this.handleError), // Handle error and return an empty array on failure
        );
    }

    /**
     * Creates HTTP headers for the request.
     * @returns {HttpHeaders} - Custom HTTP headers.
     */
    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json', // Set content type
            // 'Authorization': `Bearer ${this.getAuthToken()}`, Example Authorization header (if needed)
        });
    }

    /**
     * Gets the authorization token (if required).
     * You can replace this method to fetch the actual token from storage or auth service.
     * @returns {string} - Authorization token.
     */
    private getAuthToken(): string {
        // You can replace this with actual logic to get the token (e.g., from localStorage or auth service)
        return 'dain-studio-auth-token';
    }

    /**
     * Handles HTTP errors.
     * @param error - The error response object.
     * @returns Observable that throws an error.
     */

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        try {
            // Handle specific HTTP status codes
            if (error?.status) {
                switch (error.status) {
                    case 400:
                        errorMessage =
                            'Bad Request: The server could not understand the request due to invalid syntax. Please check your input and try again.';
                        break;
                    case 401:
                        errorMessage =
                            'Unauthorized: You need to log in to access this resource. Please log in and try again.';
                        break;
                    case 403:
                        errorMessage =
                            'Forbidden: You do not have permission to access this resource. Contact the administrator if you believe this is a mistake.';
                        break;
                    case 404:
                        errorMessage =
                            'Not Found: The requested resource could not be found. Please verify the URL or resource.';
                        break;
                    case 500:
                        errorMessage =
                            'Internal Server Error: The server encountered an issue. Please try again later.';
                        break;
                    case 502:
                        errorMessage =
                            'Bad Gateway: The server received an invalid response from the upstream server. Please try again later.';
                        break;
                    case 503:
                        errorMessage =
                            'Service Unavailable: The server is currently unavailable. Please try again later.';
                        break;
                    case 504:
                        errorMessage = 'Gateway Timeout: The server took too long to respond. Please try again later.';
                        break;
                    default:
                        errorMessage = `Unexpected Error: Server returned code ${error.status}, message: ${error.message || 'No additional message provided.'}`;
                        break;
                }
            } else if (error?.error?.message) {
                // Handle custom error messages in the response
                errorMessage = `Error: ${error.error.message}`;
            }

            // Throw the error so it can be caught by the service's subscribers
            return throwError(() => new Error(errorMessage));
        } catch (err) {
            console.error('Error Handler catch block:', err);
            return throwError(() => new Error('An error occurred while handling the error response.'));
        }
    }
}
