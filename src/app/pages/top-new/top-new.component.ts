import { take } from 'rxjs/operators';
import { ServiceService } from './../../shared/service.service';
import { Component, OnInit } from '@angular/core';
import { IStoryData } from 'src/app/shared/interfaces';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-top-new',
  templateUrl: './top-new.component.html',
  styleUrls: ['./top-new.component.scss']
})
export class TopNewComponent implements OnInit {
  loadStoriesId;
  currentData: IStoryData;

  constructor(private service: ServiceService) {
    this.getStories();
    this.getStory();
  }

  ngOnInit(): void { }

  getStory() {
    this.service.getCurrentStory(this.loadStoriesId).pipe(take(5)).subscribe(res => this.currentData = res)
  }

  getStories() {
    this.service.getStoriesList().subscribe(res => this.loadStoriesId = res);
  }
}
