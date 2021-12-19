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
    uploadingImage: boolean;
    drawConfig: DrawConfig;
}
