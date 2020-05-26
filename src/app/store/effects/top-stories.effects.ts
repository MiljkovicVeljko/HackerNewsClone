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
          map(comments =>
            getCommentsSucces({ comments: comments, loading: false })
          )
        ),
      ),
    )
  );

  // setAllComments$: Observable<Action> = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(setAllComments),
  //     mergeMap(comments => comments)
  //               // tap(v => console.log("from tap",v)),
  //         // map(items => {
  //         //   return items.map(item => {
  //         //     // if return all item with kids
  //         //     // then call function to turn kids to comments for every item and return comments in comments prop
  //         //     // then send back function

  //         //     // else return empty comments
  //         //     return {...item, comments: []}
  //         //   })
  //         // }),
  //         // tap(v => console.log("from tap22222222222",v)),
  //   )
  // );

  constructor(
    private action$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {}
}
