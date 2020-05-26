import { State, commentItem, storyItem } from './../models/app-state.model';
import {
  getTopStoriesSucces,
  getStoryItemsSucces,
  getCommentsSucces,
  loadMore,
  setId,
  getComments,
  getTopStories
} from './../actions/top-stories.actions';
import { createReducer, on } from '@ngrx/store';

const initalState: State = {
  topStoriesList: [],
  storyItems: [],
  loading: null,
  error: null,
  initialLoad: 30,
  currentStoryId: 0
};

const commentPusher = (commentOrStory: commentItem | storyItem, comments: commentItem[]) => {
  if(commentOrStory.id === comments[0].parent) {
    return Object.assign({}, commentOrStory, { comments })
  }
  return Object.assign({}, commentOrStory, { comments: [] })
};

export const addPropComments = (storiesOrComments) => storiesOrComments.map(storyOrComment => {
  return {...storyOrComment, comments: []}
})

export const storiesReducer = createReducer(initalState,
  on(getTopStories, (state, action) => ({
    ...state,
    loading: action.loading
  })),
  on(getTopStoriesSucces, (state, action) => ({
    ...state,
    topStoriesList: action.topStoriesList,
    loading: action.loading
  })),
  on(getComments, (state, action) => ({
    ...state,
    loading: action.loading
  })),
  on(getStoryItemsSucces, (state, action) => ({
    ...state,
    storyItems: addPropComments(action.storyItems),
    loading: action.loading
  })),
  on(getComments, (state, action) => ({
    ...state,
    loading: action.loading })),
  on(getCommentsSucces, (state, action) => {
    return {
      ...state,
      storyItems: state.storyItems.map(item => commentPusher(item, action.comments)),
      loading: action.loading
    }
  }),

  on(loadMore, state => ({...state, initialLoad: state.initialLoad + 30})),
  on(setId, (state, action) => ({ ...state, currentStoryId: action.id }))
);
