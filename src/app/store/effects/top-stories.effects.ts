import { getTopStories, getTopStoriesSucces, getTopStoriesFailure, getStoryItems, getStoryItemsSucces } from './../actions/top-stories.actions';
import { ApiService } from './../../shared/api.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../models/app-state.model';

@Injectable()
export class TopStoriesEffects {
  initialLoad: number = 30;
  // topStories$: Observable<number[]> = this.store.select(store => store.state.topStoriesList);

  loadTopStories$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getTopStories),
      mergeMap(() => this.apiService.getStoriesList(this.initialLoad)
        .pipe(
          map(res => getTopStoriesSucces({ topStoriesList: res })),
          catchError(error => of(getTopStoriesFailure({ error }))),
          tap(() => this.store.dispatch(getStoryItems()))
        )
      )
    )
  );

  // loadStoryItems$: Observable<Action> = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(getTopStoriesSucces),
  //     withLatestFrom(this.store),
  //     mergeMap(a =>
  //       forkJoin(
  //         a[1].state.topStoriesList.map(id => this.apiService.getCurrentStory(id)
  //           // .pipe(
  //           //   tap(a => console.log("in fork",a)),
  //           //   map(res => getStoryItemsSucces({ storyItem: res })),
  //           //   catchError(error => of(getTopStoriesFailure({ error })))
  //           // )
  //         )
  //       ).pipe(
  //         withLatestFrom(this.store),
  //         tap(a => console.log("in fork",a)),
  //         map(res => getStoryItemsSucces({ storyItems: res }))
  //       )
  //     )
  //   )
  // );
  constructor(
    private action$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {}
}
