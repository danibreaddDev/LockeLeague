import { Component, signal } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Loader } from '../../shared/components/loader/loader';
import { FaqsService } from '../../core/services/faqs-service';

@Component({
  selector: 'app-faqs',
  imports: [Header, Loader],
  templateUrl: './faqs.html',
  styleUrl: './faqs.css',
})
export class Faqs {
  faqs = signal<any[] | null>(null);
  constructor(private faqsService: FaqsService) {
    this.getFaqs();
  }
  private getFaqs() {
    this.faqsService.getFaqs().then((res) => {
      if (res) {
        this.faqs.set(res);
      }
    });
  }
}
