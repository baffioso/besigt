import { createAction, props } from "@ngrx/store";

export const PHOTO_POSITION = '[Photo Tool] Photo Position'
export const PHOTO_POSITION_SUCCESS = '[Photo Tool] Photo Position Success'
export const PHOTO_POSITION_FAIL = '[Photo Tool] Photo Position Fail'
export const TAKE_PHOTO = '[Photo Tool] Take Project Photo';
export const TAKE_PHOTO_SUCCESS = '[Photo Tool] Take Project Photo Success';
export const TAKE_PHOTO_FAIL = '[Photo Tool] Take Project Photo Error';
// export const ADD_DESCRIPTION = '[Photo Tool] Add Description';
// export const ADD_DESCRIPTION_SUCCESS = '[Photo Tool] Add Description Success';
// export const ADD_DESCRIPTION_FAIL = '[Photo Tool] Add Project Photo Error';
export const ADD_PHOTO = '[Photo Tool] Add Project Photo';
export const ADD_PHOTO_SUCCESS = '[Photo Tool] Add Project Photo Success';
export const ADD_PHOTO_FAIL = '[Photo Tool] Add Project Photo Error';

export const photoPosition = createAction(PHOTO_POSITION);
export const photoPositionSuccess = createAction(PHOTO_POSITION_SUCCESS, props<{ geom: string }>());
export const photoPositionFail = createAction(PHOTO_POSITION_FAIL);
export const takePhoto = createAction(TAKE_PHOTO);
export const takePhotoSuccess = createAction(TAKE_PHOTO_SUCCESS, props<{ photo: Blob }>());
export const takePhotoFail = createAction(TAKE_PHOTO_FAIL);
export const addPhoto = createAction(ADD_PHOTO, props<{ description: string }>());
export const addPhotoSuccess = createAction(ADD_PHOTO_SUCCESS);
export const addPhotoFail = createAction(ADD_PHOTO_FAIL);
