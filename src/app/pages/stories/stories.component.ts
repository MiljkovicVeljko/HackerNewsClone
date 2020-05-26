import { storyItemsSelector } from './../../store/selectors/index';
import { storyItem } from './../../store/models/app-state.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/models/app-state.model';
import { getTopStories, loadMore } from 'src/app/store/actions/top-stories.actions';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  storyItems$: Observable<storyItem[]> = this.store.pipe(select(storyItemsSelector));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.reload();
  }

  loadMore() {
    this.store.dispatch(loadMore());
    this.reload();
  }

  reload() {
    this.store.dispatch(getTopStories({ loading: true }));
  }
}
