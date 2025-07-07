import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Hero } from "../../components/hero/hero";


@Component({
  selector: 'app-home',
  imports: [Header, Footer, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
