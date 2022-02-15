import { createReducer, on } from '@ngrx/store'
import { PhotoActions } from '@app/store/action-types';

export interface PhotoToolState {
    photo: Blob;
    description: string;
    geom: string;
}

export const initialState: PhotoToolState = {
    photo: null,
    description: '',
    geom: null
}

export const photoReducer = createReducer(
    initialState,
    on(PhotoActions.photoPositionSuccess, (state, { geom }) => ({
        ...state,
        geom
    })),
    on(PhotoActions.takePhotoSuccess, (state, { photo }) => ({
        ...state,
        photo
    }))
)