import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}
