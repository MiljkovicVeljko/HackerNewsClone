import { createAction, props } from "@ngrx/store";

const GET_TOP_STORIES = '[TOP-STORIES] Get Top-Stories';
const GET_TOP_STORIES_SUCCESS = '[TOP-STORIES] Get Top-Stories Success';
const GET_TOP_STORIES_ERROR = '[TOP-STORIES] Get Top-Stories Failure';

const GET_STORY_ITEMS = '[TOP-STORIES] Get Story Items';
const GET_STORY_ITEMS_SUCCESS = '[TOP-STORIES] Get Story Items Success';
const GET_STORY_ITEMS_ERROR = '[TOP-STORIES] Get Story Items Failure';

const GET_COMMENTS = '[TOP-STORIES] Get Comments';
const GET_COMMENTS_SUCCESS = '[TOP-STORIES] Get Comments Success';
const GET_COMMENTS_ERROR = '[TOP-STORIES] Get Comments Failure';

export const getTopStories = createAction(GET_TOP_STORIES);
export const getTopStoriesSucces = createAction(GET_TOP_STORIES_SUCCESS, props<{ topStoriesList: any }>());
export const getTopStoriesFailure = createAction(GET_TOP_STORIES_ERROR, props<{ error: any }>());

export const getStoryItems = createAction(GET_STORY_ITEMS);
export const getStoryItemsSucces = createAction(GET_STORY_ITEMS_SUCCESS, props<{ storyItems: any }>());
export const getStoryItemsFailure = createAction(GET_STORY_ITEMS_ERROR, props<{ error: any }>());

export const getComment = createAction(GET_COMMENTS);
export const getCommentSucces = createAction(GET_COMMENTS_SUCCESS, props<{ comments: any }>());
export const getCommentFailure = createAction(GET_COMMENTS_ERROR, props<{ error: any }>());
