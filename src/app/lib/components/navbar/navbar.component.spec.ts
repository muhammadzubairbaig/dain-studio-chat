import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    // Setup block that runs before each test
    beforeEach(async () => {
        // Configure the testing module
        await TestBed.configureTestingModule({
            declarations: [], // Declare the NavbarComponent to test
        }).compileComponents(); // Compile the template and styles
    });

    // Another setup block that runs before each test
    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent); // Create an instance of the component
        component = fixture.componentInstance; // Assign the created component to 'component'
        fixture.detectChanges(); // Detect changes to trigger data binding and update the template
    });

    // Test 1: Ensure the component is created successfully
    it('should create the component', () => {
        expect(component).toBeTruthy(); // Expect that the component instance is truthy (exists)
    });

    // Test 2: Check if the header element exists in the component
    it('should have a header element', () => {
        const headerElement = fixture.debugElement.query(By.css('header')); // Query for the 'header' element in the template
        expect(headerElement).toBeTruthy(); // Ensure that the header element exists
    });

    // Test 3: Verify that the logo image is rendered correctly with proper 'src' and 'alt' attributes
    it('should render the logo with correct src and alt attributes', () => {
        const imgElement = fixture.debugElement.query(By.css('img')).nativeElement; // Query for the 'img' element
        expect(imgElement.src).toContain('assets/dain-studios.png'); // Check that the 'src' attribute contains the correct image path
        expect(imgElement.alt).toBe('Dain Studios Logo'); // Check that the 'alt' attribute is correctly set
    });
});
