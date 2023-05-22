import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResult {
  @Input('title') title?: string;

  @Input('content') content?: string;
}
