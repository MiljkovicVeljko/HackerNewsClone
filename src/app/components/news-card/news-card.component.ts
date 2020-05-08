import { ServiceService } from './../../shared/service.service';
import { Component, OnInit, Input } from '@angular/core';
import { IStoryData } from "../../shared/interfaces";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input() story;
  current:IStoryData;

  constructor(private service: ServiceService) {
  }

  ngOnInit(): void {
    this.getStory();
  }

  getStory() {
    this.service.getCurrentStory(this.story).subscribe(res => this.current = res);
  }
}
