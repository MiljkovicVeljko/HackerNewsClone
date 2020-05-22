import { storyItem } from './../../store/models/story-item.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/models/app-state.model';
import { getTopStories, loadMore } from 'src/app/store/actions/top-stories.actions';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  storyItems$: Observable<storyItem[]> = this.store.select(store => store.state.storyItems );

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.reload();
  }

  loadMore() {
    this.store.dispatch(loadMore());
    this.reload();
  }

  reload() {
    this.store.dispatch(getTopStories());
  }
}
