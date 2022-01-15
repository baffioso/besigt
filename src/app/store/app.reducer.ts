import { ActionReducerMap } from '@ngrx/store';

import * as fromProject from '@app/state/project.reducer';
import * as fromMap from '@app/state/map.reducer';
import * as fromMapTools from '@app/components/map-tools/store/map-tool.reducer'
import * as fromPhotoTool from '@app/components/map-tools/photo-tool/store/photo.reducer';
import * as fromDrawTool from '@app/components/map-tools/draw-tool/store/draw.reducer';
export interface AppState {
    project: fromProject.ProjectState;
    map: fromMap.MapState;
    mapTools: fromMapTools.MapToolState;
    photoTool: fromPhotoTool.PhotoToolState;
    drawTool: fromDrawTool.DrawToolState
};

export const appReducer: ActionReducerMap<AppState> = {
    project: fromProject.projectReducer,
    map: fromMap.mapReducer,
    mapTools: fromMapTools.mapToolReducer,
    photoTool: fromPhotoTool.photoReducer,
    drawTool: fromDrawTool.drawReducer
};
