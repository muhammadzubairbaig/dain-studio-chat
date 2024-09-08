import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '@lib/components/layout/layout.component';
/**
 * AppComponent serves as the root component for the application.
 * It imports and provides essential services and components.
 */
@Component({
    selector: 'app-root', // Root selector for the Angular application.
    standalone: true, // Indicates this is a standalone component.
    imports: [CommonModule, RouterModule, LayoutComponent], // Modules and components imported by the root component.
    templateUrl: './app.component.html', // Template associated with this component.
    providers: [], // Service providers available to this component.
})
export class AppComponent {}
