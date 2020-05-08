import { Component, OnInit, Input } from '@angular/core';
import { IStoryData } from "../../shared/interfaces";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input() current: IStoryData;

  constructor() {
  }

  ngOnInit(): void {
  }

}
