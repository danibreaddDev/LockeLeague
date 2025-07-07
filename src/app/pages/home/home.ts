import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Hero } from "../../components/hero/hero";
import { AuthService } from '../../core/services/auth-service';


@Component({
  selector: 'app-home',
  imports: [Header, Footer, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
 authService = inject(AuthService);
 constructor(){
  
 }
 ngOnInit(): void {
     this.authService.register()
     this.authService.login()
 }
}
