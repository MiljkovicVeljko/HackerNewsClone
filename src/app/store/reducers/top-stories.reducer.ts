import {
  getTopStoriesSucces,
  getTopStoriesFailure,
  getStoryItemsFailure,
  getStoryItemsSucces,
  getCommentSucces,
  getCommentFailure,
  loadMore
} from './../actions/top-stories.actions';
import { createReducer, on } from '@ngrx/store';
import { storyItem, commentItem } from '../models/story-item.model';

export interface State {
  topStoriesList: number[],
  storyItems: storyItem[],
  comments: commentItem[],
  loading: boolean,
  error: Error,
  initialLoad: number;
}

const initalState: State = {
  topStoriesList: [],
  storyItems: [],
  comments: [],
  loading: false,
  error: null,
  initialLoad: 30
};

export const storiesReducer = createReducer(initalState,
  on(getTopStoriesFailure, (state, action) => ({ ...state, error: action.error })),
  on(getTopStoriesSucces, (state, action) => ({ ...state, topStoriesList: action.topStoriesList })),
  on(getStoryItemsFailure, (state, action) => ({ ...state, error: action.error })),
  on(getStoryItemsSucces, (state, action) => ({ ...state, storyItems: action.storyItems })),
  on(getCommentFailure, (state, action) => ({ ...state, error: action.error })),
  on(getCommentSucces, (state, action) => ({...state, comments: action.comments })),
  on(loadMore, state => ({...state, initialLoad: state.initialLoad + 30}))
);
