export type MapTool = 'addressInfo' | 'saveProject' | 'takePhoto' | 'draw' | 'measure';

export interface DrawConfig {
    inEditMode: boolean;
    showBack: boolean;
    showUndo: boolean;
    showDelete: boolean;
    showSave: boolean;
}

export interface UiState {
    activatedMapTools: MapTool[];
    uploadingImage: boolean;
    drawConfig: DrawConfig;
}
