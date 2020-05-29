import { State, storyItem } from './../models/app-state.model';
import { createSelector, createFeatureSelector } from "@ngrx/store";
// import { AppState } from '../models/app-state.model';

export const state = 'state';
export const storyItems = 'storyItems';

export const selectState = createFeatureSelector<State>(state);

export const selectCurrentStory = createSelector(
  selectState,
  (state: State) => state.storyItems.find(story => story.id == state.currentStoryId)
)

export const storyItemsSelector = createSelector(
  selectState,
  (state) => state.storyItems
)

export const getIdSelector = createSelector(
  selectState,
  (state) => state.currentStoryId
)

export const selectStoryComments = createSelector(
  selectCurrentStory,
  (story) => story.kids
)

export const selectLoading = createSelector(
  selectState,
  (story) => story.loading
)

export const selectloadCommentsSuccess = createSelector(
  selectState,
  (story) => story.loadCommentsSuccess
)
