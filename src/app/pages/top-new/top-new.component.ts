import { ServiceService } from './../../shared/service.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { IStoryData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-top-new',
  templateUrl: './top-new.component.html',
  styleUrls: ['./top-new.component.scss']
})
export class TopNewComponent implements OnInit, OnChanges {
  loadStoriesId;
  currentData: IStoryData;
  initialLoad: number = 10;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.getStories();
  }

  ngOnChanges() {
    this.getStories();
  }

  getStories() {
    this.service.getStoriesList(this.initialLoad).subscribe(res => this.loadStoriesId = res);
  }

  loadMore() {
    this.initialLoad = this.initialLoad + 30;
    console.log(this.initialLoad);
    this.getStories();
  }
}
