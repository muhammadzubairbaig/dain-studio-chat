import { Role } from '@lib/enums/role.enum';

/**
 * Interface representing a chat message.
 */
export interface ChatMessage {
    id: string;
    created_at: Date;
    updated_at: Date;
    chat_session_id: string;
    message_content: string;
    role: Role; // Uses the Role enum for type safety
}

/**
 * Interface representing a chat session.
 */
export interface ChatSession {
    id: string;
    created_at: Date;
    updated_at: Date;
    chat_messages: ChatMessage[]; // List of chat messages
    user_id: string; // ID of the user associated with the chat session
}
