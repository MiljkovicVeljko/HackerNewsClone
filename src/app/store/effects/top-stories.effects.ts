import { AppState } from 'src/app/store/models/app-state.model';
import {
  getTopStories,
  getTopStoriesSucces,
  getTopStoriesFailure,
  getStoryItemsSucces,
  getComments,
  getCommentsSucces,
} from './../actions/top-stories.actions';
import { ApiService } from './../../shared/api.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class TopStoriesEffects {

  loadTopStories$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getTopStories),
      withLatestFrom(this.store),
      mergeMap(([action, store]) => this.apiService.getStoriesList(store.state.initialLoad)
        .pipe(
          map(res => getTopStoriesSucces({ topStoriesList: res })),
          catchError(error => of(getTopStoriesFailure({ error }))),
        )
      )
    )
  );

  loadStoryItems$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getTopStoriesSucces),
      withLatestFrom(this.store),
      mergeMap(([action, store]) =>
        forkJoin(
          store.state.topStoriesList.map(id => this.apiService.getCurrentStory(id)
          )
        ).pipe(
          map(res => getStoryItemsSucces({ storyItems: res }))
        )
      )
    )
  );

  loadCommentItems$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getComments),
      withLatestFrom(this.store),
      map(([action, store]) => {
        let commentOrStory = store.state.storyItems.find(story =>
          story.id == action.id)
        return commentOrStory;
      }
      ),
      mergeMap(commentOrStory =>
        forkJoin(this.apiService.getComments(commentOrStory.kids)
        ).pipe(
            map(comments => getCommentsSucces({ comments: comments })
          )
        )
      ),
    )
  );

  constructor(
    private action$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {}
}
