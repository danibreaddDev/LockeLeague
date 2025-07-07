import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-locke-list',
  imports: [CommonModule,RouterLink,],
  templateUrl: './locke-list.html',
  styleUrl: './locke-list.css'
})
export class LockeList {
 lockeList=[
  {
    "id": 1,
    "name": "Locke",
  },
  {
    "id": 2,
    "name": "Locke 2",
  },
]
}
