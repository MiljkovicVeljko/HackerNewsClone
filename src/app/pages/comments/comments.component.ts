import { selectCurrentStory, selectStoryComments, selectLoading } from './../../store/selectors/index';
import { storyItem, commentItem } from './../../store/models/app-state.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit, OnChanges } from '@angular/core';
import { AppState } from 'src/app/store/models/app-state.model';
import { map, filter, tap, switchMap } from 'rxjs/operators';
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
    this.store.pipe(
      map(res => selectLoading(res)),
      filter(val => val !== undefined || null || true)
    ).subscribe(res => res === false && this.setAllComments())
  }

  setCurrent() {
    this.store.pipe(
      map(res => selectCurrentStory(res)),
      filter(val => val !== undefined),
    ).subscribe(res => this.currentStory = res);
  }

  setAllComments() {
    let currentStoryComments: commentItem[];
    this.store.pipe(
      map(res => selectCurrentStory(res)),
      filter(val => val !== undefined)).subscribe(res => currentStoryComments = res.comments)
    console.log(currentStoryComments)
  }

  

}
