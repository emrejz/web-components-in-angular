import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  onSearchChange(e) {
    const value = e.detail.value.trim();
    this.tempOptions =
      value.length > 1
        ? this.options.filter((item) => item.includes(value))
        : [];
  }
  ngOnInit(): void {}

  options = [
    'kiralık',
    'kiralık konut',
    'kiralık daire',
    'kiralık işyeri',
    'kiralık araç',
    'satılık',
    'satılık konut',
    'satılık daire',
    'satılık işyeri',
    'satılık araç',
  ];
  tempOptions: string[] = [];
}
