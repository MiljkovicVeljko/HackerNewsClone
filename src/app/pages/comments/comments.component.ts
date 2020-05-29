import { selectCurrentStory } from './../../store/selectors/index';
import { storyItem } from './../../store/models/app-state.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/models/app-state.model';
import { map, filter } from 'rxjs/operators';
import { getComments } from 'src/app/store/actions/top-stories.actions';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  currentStory: storyItem;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.setCurrent();
    this.currentStory !== undefined && this.store.dispatch(getComments({ ids: this.currentStory.kids, loading: true }));
  }

  setCurrent() {
    this.store.pipe(
      map(res => selectCurrentStory(res)),
      filter(val => val !== undefined)
    ).subscribe(res => this.currentStory = res);
  }

}
