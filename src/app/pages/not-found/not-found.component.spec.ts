import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { By } from '@angular/platform-browser';

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [], // Import RouterTestingModule to handle routerLink
            declarations: [], // Declare the NotFoundComponent
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Trigger initial data binding
    });

    // Test 1: Ensure the component is created successfully
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    // Test 2: Check if the SVG icon is rendered
    it('should render the SVG icon for "not found"', () => {
        const svgElement = fixture.debugElement.query(By.css('img')).nativeElement;
        expect(svgElement.src).toContain('assets/no-page-found.svg');
        expect(svgElement.alt).toBe('No Page Available');
    });

    // Test 3: Verify the error message is displayed
    it('should display the correct error message', () => {
        const errorMessage = fixture.debugElement.query(By.css('h1')).nativeElement;
        expect(errorMessage.textContent).toContain('The page you were looking for was not found');
    });
});
