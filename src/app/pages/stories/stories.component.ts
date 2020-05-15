import { storyItem } from './../../store/models/story-item.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/models/app-state.model';
import { getTopStories, getStoryItems } from 'src/app/store/actions/top-stories.actions';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  topStories$: Observable<number[]> = this.store.select(store => store.state.topStoriesList);
  storyItems$: Observable<storyItem[]> = this.store.select(store => store.state.storyItems );
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  initialLoad: number = 30;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getTopStories());
  }

  loadMore() {
    this.initialLoad = this.initialLoad + 30;
  }
}
