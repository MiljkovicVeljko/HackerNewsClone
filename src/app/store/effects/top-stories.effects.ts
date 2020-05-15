import { AppState } from 'src/app/store/models/app-state.model';
import { getTopStories, getTopStoriesSucces, getTopStoriesFailure, getStoryItems, getStoryItemsSucces } from './../actions/top-stories.actions';
import { ApiService } from './../../shared/api.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class TopStoriesEffects {
  initialLoad: number = 30;

  loadTopStories$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getTopStories),
      mergeMap(() => this.apiService.getStoriesList(this.initialLoad)
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
      mergeMap(([first, second]) =>
        forkJoin(
          second.state.topStoriesList.map(id => this.apiService.getCurrentStory(id)
          )
        ).pipe(
          map(res => getStoryItemsSucces({ storyItems: res }))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {}
}
