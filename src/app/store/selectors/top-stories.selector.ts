import { createSelector } from "@ngrx/store";
import { State } from "../reducers/top-stories.reducer";

const getSelectedData = (state: State): any => state.topStoriesList

const getTopStoriesSelector = createSelector(
  (state: {topStoriesState: State}) => state.topStoriesState,
  getSelectedData
);

export { getTopStoriesSelector }
