import { CreateImage } from '@app/interfaces/image'
import { createReducer, on } from '@ngrx/store'
import * as photoActions from './photo.actions';

export interface PhotoToolState {
    photo: Blob;
    description: string;
    geom: string;
}

export const initialState: PhotoToolState = {
    photo: null,
    description: null,
    geom: null
}

export const photoReducer = createReducer(
    initialState,
    on(photoActions.photoPositionSuccess, (state, { geom }) => ({
        ...state,
        geom
    })),
    on(photoActions.takePhotoSuccess, (state, { photo }) => ({
        ...state,
        photo
    }))
)