import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  searchQuery: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  onSearchChange(): void {
    this.searchEvent.emit(this.searchQuery);
  }
}
