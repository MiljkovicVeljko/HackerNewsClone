import { ServiceService } from './../../shared/service.service';
import { Component, OnInit } from '@angular/core';
import { IStoryData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-top-new',
  templateUrl: './top-new.component.html',
  styleUrls: ['./top-new.component.scss']
})
export class TopNewComponent implements OnInit {
  loadStoriesId;
  currentData: IStoryData;
  initialLoad: number = 10;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.getStories();
  }

  getStories() {
    this.service.getStoriesList(this.initialLoad).subscribe(res => this.loadStoriesId = res);
  }

  loadMore() {
    this.initialLoad = this.initialLoad + 30;
    this.getStories();
  }
}
