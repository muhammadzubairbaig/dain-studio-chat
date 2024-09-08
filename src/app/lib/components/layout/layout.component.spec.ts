import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from '@lib/components/index'; // Import the Navbar component
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    // Setup block executed before each test
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, NavbarComponent], // Import required modules and components
            declarations: [], // No additional declarations
        }).compileComponents(); // Compile the template and styles
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent); // Create component instance
        component = fixture.componentInstance; // Assign component
        fixture.detectChanges(); // Trigger initial data binding
    });

    // Test 1: Ensure the component is created successfully
    it('should create the component', () => {
        expect(component).toBeTruthy(); // Component should exist
    });

    // Test 2: Check if the navbar component is included in the layout
    it('should include the NavbarComponent', () => {
        const navbarElement = fixture.debugElement.query(By.css('app-navbar')); // Query for navbar
        expect(navbarElement).toBeTruthy(); // Navbar component should be present
    });

    // Test 3: Check if the main container element exists
    it('should have a main container for page content', () => {
        const mainElement = fixture.debugElement.query(By.css('main.container')); // Query for main container
        expect(mainElement).toBeTruthy(); // Main container should be present
    });

    // Test 4: Check if the footer element exists
    it('should have a footer section', () => {
        const footerElement = fixture.debugElement.query(By.css('footer')); // Query for footer
        expect(footerElement).toBeTruthy(); // Footer should be present
    });
});
