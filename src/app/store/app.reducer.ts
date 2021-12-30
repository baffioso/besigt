import { ActionReducerMap } from '@ngrx/store';

import * as fromProject from '@app/state/project.reducer';
import * as fromMap from '@app/state/map.reducer';
import * as fromMapTool from '@app/state/map-tool.reducer'
import * as fromPhotoTool from '@app/components/map-tools/photo-tool/store/photo.reducer';
import { CreateImage } from '@app/interfaces/image';
export interface AppState {
    project: fromProject.ProjectState;
    map: fromMap.MapState;
    mapTool: fromMapTool.MapToolState;
    photoTool: fromPhotoTool.PhotoToolState;
};

export const appReducer: ActionReducerMap<AppState> = {
    project: fromProject.projectReducer,
    map: fromMap.mapReducer,
    mapTool: fromMapTool.mapToolReducer,
    photoTool: fromPhotoTool.photoReducer
};
