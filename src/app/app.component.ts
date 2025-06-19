import { Component } from '@angular/core';
import { RoutesTableComponent } from './components/routes-table/routes-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RoutesTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Test Table NDM' ;
}
