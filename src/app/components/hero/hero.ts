import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {

}
