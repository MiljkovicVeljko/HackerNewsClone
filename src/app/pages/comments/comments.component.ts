import { selectCurrentStory, selectloadCommentsSuccess } from './../../store/selectors/index';
import { storyItem, commentItem } from './../../store/models/app-state.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/models/app-state.model';
import { map, filter, tap, takeLast } from 'rxjs/operators';
import { getComments, getAllComments } from 'src/app/store/actions/top-stories.actions';

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
    // this.store.pipe(
    //   map(res => selectloadCommentsSuccess(res)),
    //   filter(val => val !== undefined),
    //   takeLast(1),
    //   tap(l=>console.log("from store",l)),
    // ).subscribe(res => res && this.setAllComments());
  }

  setCurrent() {
    this.store.pipe(
      map(res => selectCurrentStory(res)),
      filter(val => val !== undefined)
    ).subscribe(res => this.currentStory = res);
  }

  // setAllComments() {
  //   let currentStoryComments: commentItem[];
  //   this.store.pipe(
  //     map(res => selectCurrentStory(res)),
  //     filter(val => val !== undefined)).subscribe(res => currentStoryComments = res.comments)
  //   console.log("currentStoryComments",currentStoryComments)
  //   this.getCommentsFromApi(currentStoryComments);
  // }

  // getCommentsFromApi(listOfComments: commentItem[]) {
  //   listOfComments
  //     .filter(comment => comment.kids !== undefined)
  //     .map(comment => this.store.dispatch(getAllComments({ ids: comment.kids, loading: true })))
  // }


}
