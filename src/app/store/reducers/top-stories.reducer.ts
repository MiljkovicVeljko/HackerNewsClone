import {
  getTopStoriesSucces,
  getTopStoriesFailure,
  getStoryItemsFailure,
  getStoryItemsSucces,
  getCommentsSucces,
  getCommentsFailure,
  loadMore
} from './../actions/top-stories.actions';
import { createReducer, on } from '@ngrx/store';
import { storyItem, commentItem } from '../models/story-item.model';

export interface State {
  topStoriesList: number[],
  storyItems: storyItem[],
  loading: boolean,
  error: Error,
  initialLoad: number;
}

const initalState: State = {
  topStoriesList: [],
  storyItems: [],
  loading: false,
  error: null,
  initialLoad: 30
};

const commentPusher = (commentOrStory, comments) => {
  if(commentOrStory.id === comments[0].parent) {
    return Object.assign({}, commentOrStory, { comments })
  }
  if(commentOrStory.id !== comments[0].parent) {
    return Object.assign({}, commentOrStory, {
      comments: commentOrStory.comments.map(comment =>
        commentPusher(comment, comments)
      )
    });
  }
};

export const storiesReducer = createReducer(initalState,
  on(getTopStoriesFailure, (state, action) => ({ ...state, error: action.error })),
  on(getTopStoriesSucces, (state, action) => ({ ...state, topStoriesList: action.topStoriesList })),

  on(getStoryItemsFailure, (state, action) => ({ ...state, error: action.error })),
  on(getStoryItemsSucces, (state, action) => ({ ...state, storyItems: action.storyItems })),

  on(getCommentsFailure, (state, action) => ({ ...state, error: action.error })),
  on(getCommentsSucces, (state, action) => {
    console.log("state",state,"act",action);
    return state.storyItems.map(item => commentPusher(item, action.comments))
  }),

  on(loadMore, state => ({...state, initialLoad: state.initialLoad + 30}))
);
