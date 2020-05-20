import { Component, OnInit, Input } from '@angular/core';
import { storyItem } from 'src/app/store/models/story-item.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() story: storyItem;
  constructor() {
  }

  ngOnInit(): void {
  }
}
