export interface DrawConfig {
    inEditMode: boolean;
    showBack: boolean;
    showUndo: boolean;
    showDelete: boolean;
    showSave: boolean;
}

export interface UiState {
    showMapDrawTool: boolean;
    showProjectAreaSelection: boolean;
    showInfoTool: boolean;
    uploadingImage: boolean;
    drawConfig: DrawConfig;
}