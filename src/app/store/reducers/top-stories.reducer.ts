import { getTopStoriesSucces, getTopStoriesFailure, getStoryItemsFailure, getStoryItemsSucces } from './../actions/top-stories.actions';
import { createReducer, on } from '@ngrx/store';
import { storyItem } from '../models/story-item.model';

export interface State {
  topStoriesList: number[],
  storyItems: storyItem[]
  loading: boolean,
  error: Error
}

const initalState: State = {
  topStoriesList: [],
  storyItems: [],
  loading: false,
  error: null
};

export const storiesReducer = createReducer(initalState,
  on(getTopStoriesFailure, (state, action) => ({ ...state, error: action.error })),
  on(getTopStoriesSucces, (state, action) => ({ ...state, topStoriesList: action.topStoriesList })),
  on(getStoryItemsFailure, (state, action) => ({ ...state, error: action.error })),
  on(getStoryItemsSucces, (state, action) => ({ ...state, storyItems: action.storyItems }))
);
