import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [], // Import RouterTestingModule to handle router-outlet
            declarations: [], // Declare the AppComponent and LayoutComponent
            providers: [], // Provide HttpService
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Trigger initial data binding
    });

    // Test 1: Ensure the AppComponent is created
    it('should create the AppComponent', () => {
        expect(component).toBeTruthy();
    });

    // Test 2: Ensure LayoutComponent is present
    it('should include the LayoutComponent', () => {
        const layoutElement = fixture.debugElement.query(By.css('app-layout'));
        expect(layoutElement).toBeTruthy(); // Check that app-layout is present
    });

    // Test 3: Ensure router-outlet is present
    it('should have a router-outlet for injecting routed components', () => {
        const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
        expect(routerOutlet).toBeTruthy(); // Check that router-outlet is present
    });
});
