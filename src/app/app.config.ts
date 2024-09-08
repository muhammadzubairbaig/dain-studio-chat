import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
/**
 * appConfig is the configuration object for the Angular application.
 * It includes providers for routing, HTTP client, and zone change detection optimization.
 */
export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), // Optimizes Angular's change detection.
        provideRouter(routes), // Provides routing configuration.
        provideClientHydration(), // Provides hydration for server-side rendering.
        provideHttpClient(withFetch()), // Enable Fetch API
    ],
};
