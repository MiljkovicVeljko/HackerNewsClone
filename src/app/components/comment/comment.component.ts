import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { commentItem, AppState } from 'src/app/store/models/app-state.model';
import { getAllComments } from 'src/app/store/actions/top-stories.actions';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: commentItem;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  showSubComments(ids: number[]) {
    this.store.dispatch(getAllComments({ ids: ids, loading: true }))
  }
}
