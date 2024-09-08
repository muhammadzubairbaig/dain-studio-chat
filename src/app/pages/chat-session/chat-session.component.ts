import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMainComponent } from '@lib/components/chat-main/chat-main.component';
import { ChatMessage, ChatSession } from '@lib/interfaces';
import { HttpService } from '@lib/services';
import { ToasterService } from '@lib/services/toaster.service';
import { ToasterComponent } from '@lib/components/toaster/toaster.component';

/**
 * The ChatSessionComponent is responsible for displaying chat sessions.
 * It loads the data from the server when initialized.
 */
@Component({
    selector: 'app-chat-session',
    standalone: true,
    providers: [],
    imports: [CommonModule, FormsModule, ChatMainComponent, ToasterComponent],
    templateUrl: './chat-session.component.html',
})
export class ChatSessionComponent implements OnInit {
    /**
     * An array to store chat sessions retrieved from the server.
     */
    chatSessions: ChatSession[] = [];
    /**
     * HttpService is injected to handle API calls.
     */
    constructor(
        private httpService: HttpService,
        private toasterService: ToasterService,
    ) {}

    /**
     * Lifecycle hook that is called after Angular has initialized all data-bound properties.
     * This method calls `loadChatSessions()` to fetch chat data.
     */
    ngOnInit(): void {
        this.loadChatSessions(); // Load chat sessions when the component initializes.
    }

    /**
     * Fetches chat sessions from the server using the HttpService.
     * Logs an error if the request fails.
     */
    private loadChatSessions(): void {
        this.httpService.getChatSessions().subscribe({
            next: (data) => {
                this.chatSessions = data
                    .map(this.transformSessionData)
                    .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
            },
            error: (err) => {
                this.toasterService.showToast(err, 'error', 'Error'); // Show the error using Toastr
            },
        });
    }

    /**
     * Transforms session data by converting date strings into Date objects.
     * @param session - The chat session to transform.
     * @returns A transformed chat session with proper Date objects.
     */
    private transformSessionData(session: ChatSession): ChatSession {
        return {
            ...session,
            created_at: new Date(session.created_at),
            updated_at: new Date(session.updated_at),
            chat_messages: session.chat_messages.map((message: ChatMessage) => ({
                ...message,
                created_at: new Date(message.created_at),
                updated_at: new Date(message.updated_at),
            })),
        };
    }
}
