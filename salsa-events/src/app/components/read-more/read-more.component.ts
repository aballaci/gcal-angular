import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit {
  isCollapsed = true;

  constructor() {
  }

  ngOnInit() {
  }

  scrollToView() {
    if (!this.isCollapsed) {
      const readMore = document.querySelector('#description');
      readMore.scrollIntoView({behavior: 'smooth'});
    }
    this.isCollapsed = !this.isCollapsed;
  }

}
