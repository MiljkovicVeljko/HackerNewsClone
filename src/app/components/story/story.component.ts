import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { storyItem, AppState } from 'src/app/store/models/app-state.model';
import { setId, getComments } from 'src/app/store/actions/top-stories.actions';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() story: storyItem;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  onShowComments(currentId) {
    this.router.navigate([`comments/${currentId}`])
    this.store.dispatch(setId({ id: currentId }))
  }
}
