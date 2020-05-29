import { AppState } from 'src/app/store/models/app-state.model';
import {
  getTopStories,
  getTopStoriesSucces,
  getTopStoriesFailure,
  getStoryItemsSucces,
  getComments,
  getCommentsSucces,
  getAllCommentsSucces,
  getAllComments,
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
          map(res => getTopStoriesSucces({ topStoriesList: res, loading: false })),
          catchError(error => of(getTopStoriesFailure({ error }))),
        )
      )
    )
  );

  commentGetter(list) {

  }

  loadStoryItems$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getTopStoriesSucces),
      withLatestFrom(this.store),
      mergeMap(([action, store]) =>
        forkJoin(
          store.state.topStoriesList.map(id => this.apiService.getCurrentStory(id)
          )
        ).pipe(
          map(res => getStoryItemsSucces({ storyItems: res, loading: false }))
        )
      )
    )
  );

  loadCommentItems$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getComments),
      mergeMap(commentOrStory =>
        forkJoin(this.apiService.getCommentsFromApi(commentOrStory.ids)
        ).pipe(
          map(comments => comments.map(comment => Object.assign({}, comment, { comments: [] }))),
          map(comments =>
            getCommentsSucces({ comments: comments, loading: false })
          )
        ),
      ),
    )
  );

  setAllComments$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getAllComments),
      mergeMap(commentOrStory =>
        forkJoin(this.apiService.getCommentsFromApi(commentOrStory.ids)
        ).pipe(
          map(comments => comments.map(comment => Object.assign({}, comment, { comments: [] }))),
          map(comments =>
            getAllCommentsSucces({ comments: comments, loading: false })
          )
        ),
      ),
    )
  );

  constructor(
    private action$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {}
}
