import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * Server-side configuration for Angular application.
 * This configuration merges the application configuration with server-specific providers.
 */
const serverConfig: ApplicationConfig = {
    providers: [provideServerRendering()],
};

/**
 * Final merged configuration that includes both app and server configurations.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
