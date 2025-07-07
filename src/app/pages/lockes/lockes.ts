import { Component } from '@angular/core';
import { LockeList } from '../../components/locke-list/locke-list';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-lockes',
  imports: [LockeList, RouterLink],
  templateUrl: './lockes.html',
  styleUrl: './lockes.css'
})
export class Lockes {

}
