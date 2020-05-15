import { createSelector } from "@ngrx/store";
import { TopStoriesState } from "../reducers/top-stories.reducer";

const getSelectedData = (state: TopStoriesState): any => state.topStoriesList

const getTopStoriesSelector = createSelector(
  (state: {topStoriesState: TopStoriesState}) => state.topStoriesState,
  getSelectedData
);

export { getTopStoriesSelector }
