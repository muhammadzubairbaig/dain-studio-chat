import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '@lib/components/index';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, NavbarComponent],
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
