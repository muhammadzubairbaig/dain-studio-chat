import { Routes } from '@angular/router';

/**
 * Routes array defines the application's routes.
 * It includes lazy loading for the chat session component and a wildcard route for 404 errors.
 */
export const routes: Routes = [
    {
        path: '', // Root path of the application.
        title: 'Chat', // Title for the chat page.
        loadComponent: async () => (await import('@pages/chat-session/chat-session.component')).ChatSessionComponent,
    },
    {
        path: '**', // Wildcard route to catch all undefined routes.
        loadComponent: async () => (await import('@pages/not-found/not-found.component')).NotFoundComponent,
    },
];
