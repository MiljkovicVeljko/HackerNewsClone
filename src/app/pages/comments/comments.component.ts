import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/models/app-state.model';
import { storyItem } from 'src/app/store/models/story-item.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  currentStory: storyItem;
  currentStory$: Observable<storyItem> = this.store.select(
    store => store.state.storyItems.find(story => story.id == this.route.snapshot.params['id'])
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    // this.store.dispatch(getComment({ id: this.id }))
    this.currentStory$.subscribe(v => this.currentStory = v)
  }

}
