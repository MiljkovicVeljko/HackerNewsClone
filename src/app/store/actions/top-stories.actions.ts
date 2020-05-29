import { createAction, props } from "@ngrx/store";
import { storyItem, commentItem } from '../models/app-state.model';

const GET_TOP_STORIES = '[TOP-STORIES] Get Top-Stories';
const GET_TOP_STORIES_SUCCESS = '[TOP-STORIES] Get Top-Stories Success';
const GET_TOP_STORIES_ERROR = '[TOP-STORIES] Get Top-Stories Failure';

const GET_STORY_ITEMS = '[TOP-STORIES] Get Story Items';
const GET_STORY_ITEMS_SUCCESS = '[TOP-STORIES] Get Story Items Success';
const GET_STORY_ITEMS_ERROR = '[TOP-STORIES] Get Story Items Failure';

const GET_COMMENTS = '[COMMENTS] Get Comments';
const GET_COMMENTS_SUCCESS = '[COMMENTS] Get Comments Success';
const GET_COMMENTS_ERROR = '[COMMENTS] Get Comments Failure';

const GET_ALL_COMMENTS = '[COMMENTS] Get All Comments';
const GET_ALL_COMMENTS_SUCCESS = '[COMMENTS] Get All Comments Success';
const GET_ALL_COMMENTS_ERROR = '[COMMENTS] Get All Comments Failure';

const LOAD_MORE = '[TOP-STORIES] Load More';
const SET_ID = '[COMMENTS] Set Id';

export const getTopStories = createAction(GET_TOP_STORIES, props<{ loading: boolean }>());
export const getTopStoriesSucces = createAction(GET_TOP_STORIES_SUCCESS, props<{ topStoriesList: any, loading: boolean }>());
export const getTopStoriesFailure = createAction(GET_TOP_STORIES_ERROR, props<{ error: any }>());

export const getStoryItems = createAction(GET_STORY_ITEMS, props<{ loading: boolean }>());
export const getStoryItemsSucces = createAction(GET_STORY_ITEMS_SUCCESS, props<{ storyItems: storyItem[], loading: boolean }>());
export const getStoryItemsFailure = createAction(GET_STORY_ITEMS_ERROR, props<{ error: any }>());

export const getComments = createAction(GET_COMMENTS, props<{ ids: number[], loading: boolean }>());
export const getCommentsSucces = createAction(GET_COMMENTS_SUCCESS, props<{ comments: commentItem[], loading: boolean }>());
export const getCommentsFailure = createAction(GET_COMMENTS_ERROR, props<{ error: any }>());

export const getAllComments = createAction(GET_ALL_COMMENTS, props<{ ids: number[], loading: boolean }>());
export const getAllCommentsSucces = createAction(GET_ALL_COMMENTS_SUCCESS, props<{ comments: commentItem[], loading: boolean }>());
export const getAllCommentsFailure = createAction(GET_ALL_COMMENTS_ERROR, props<{ error: any }>());

export const loadMore = createAction(LOAD_MORE);
export const setId = createAction(SET_ID, props<{ id: number }>());
