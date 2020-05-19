import { AppState } from './../../../store/models/app-state.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  id: number;
  comments$: Observable<number[]> = this.store.select(
    store => store.state.storyItems.find(c => c.id == this.id).kids
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

}
