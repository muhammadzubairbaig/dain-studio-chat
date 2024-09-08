import { environment } from '@env/environment';

/**
 * Constants for API endpoints.
 * Keeping these in a central location makes it easy to update and manage API URLs.
 */
export const API_ENDPOINTS = {
    CHAT_SESSIONS: `${environment.apiUrl}/challenge/chat_sessions`,
};
