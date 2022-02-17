import { createReducer, on } from '@ngrx/store'
import { PhotoActions } from '@app/store/action-types';

export interface PhotoToolState {
    photo: Blob;
    description: string;
    geom: string;
    loading: boolean;
}

export const initialState: PhotoToolState = {
    photo: null,
    description: '',
    geom: null,
    loading: false
}

export const photoReducer = createReducer(
    initialState,
    on(PhotoActions.addPhoto, state => ({
        ...state,
        loading: true
    })),
    on(PhotoActions.addPhotoSuccess, state => ({
        ...state,
        loading: false
    })),
    on(PhotoActions.addPhotoFail, state => ({
        ...state,
        loading: false
    })),
    on(PhotoActions.photoPositionSuccess, (state, { geom }) => ({
        ...state,
        geom
    })),
    on(PhotoActions.takePhotoSuccess, (state, { photo }) => ({
        ...state,
        photo
    }))
)