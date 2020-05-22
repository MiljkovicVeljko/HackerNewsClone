import { getComment } from './../../../store/actions/top-stories.actions';
import { AppState } from './../../../store/models/app-state.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { commentItem } from 'src/app/store/models/story-item.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  id: number;
  comments$: Observable<commentItem[]> = this.store.select(
    store => store.state.comments
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.id = this.route.snapshot.params['id'];
    this.store.dispatch(getComment({ id: this.id }))
   }

}
