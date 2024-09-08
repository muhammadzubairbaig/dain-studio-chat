import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Chat',
        loadComponent: async () => (await import('./chat-session.component')).ChatSessionComponent,
    },
];
