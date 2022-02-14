import { ActionReducerMap } from '@ngrx/store';

import * as fromProject from '@app/pages/tabs-projects/store/project.reducer';
import * as fromMap from '@app/pages/tabs-map/store/map.reducer';
import * as fromMapTools from '@app/components/map-tools/store/map-tool.reducer'
import * as fromPhotoTool from '@app/components/map-tools/photo-tool/store/photo.reducer';
import * as fromDrawTool from '@app/components/map-tools/draw-tool/store/draw.reducer';
import * as fromSaveProject from '@app/components/map-tools/save-project/store/save-project.reducer';
export interface AppState {
    project: fromProject.ProjectState;
    map: fromMap.MapState;
    mapTools: fromMapTools.MapToolState;
    photoTool: fromPhotoTool.PhotoToolState;
    drawTool: fromDrawTool.DrawToolState,
    saveProject: fromSaveProject.SaveProjectState
};

export const appReducer: ActionReducerMap<AppState> = {
    project: fromProject.projectReducer,
    map: fromMap.mapReducer,
    mapTools: fromMapTools.mapToolReducer,
    photoTool: fromPhotoTool.photoReducer,
    drawTool: fromDrawTool.drawReducer,
    saveProject: fromSaveProject.saveProjectReducer
};
