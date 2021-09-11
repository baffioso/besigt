(self["webpackChunkbesigt"] = self["webpackChunkbesigt"] || []).push([["src_app_components_map-layers-control-modal_map-layers-control-modal_module_ts"],{

/***/ 1593:
/*!************************************************************************************************!*\
  !*** ./src/app/components/map-layers-control-modal/map-layers-control-modal-routing.module.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapLayersControlModalPageRoutingModule": () => (/* binding */ MapLayersControlModalPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 42741);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 29535);
/* harmony import */ var _map_layers_control_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map-layers-control-modal.page */ 96318);




const routes = [
    {
        path: '',
        component: _map_layers_control_modal_page__WEBPACK_IMPORTED_MODULE_0__.MapLayersControlModalPage
    }
];
let MapLayersControlModalPageRoutingModule = class MapLayersControlModalPageRoutingModule {
};
MapLayersControlModalPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], MapLayersControlModalPageRoutingModule);



/***/ }),

/***/ 12649:
/*!****************************************************************************************!*\
  !*** ./src/app/components/map-layers-control-modal/map-layers-control-modal.module.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapLayersControlModalPageModule": () => (/* binding */ MapLayersControlModalPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 42741);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 16274);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 93324);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 34595);
/* harmony import */ var _map_layers_control_modal_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map-layers-control-modal-routing.module */ 1593);
/* harmony import */ var _map_layers_control_modal_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map-layers-control-modal.page */ 96318);







let MapLayersControlModalPageModule = class MapLayersControlModalPageModule {
};
MapLayersControlModalPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _map_layers_control_modal_routing_module__WEBPACK_IMPORTED_MODULE_0__.MapLayersControlModalPageRoutingModule
        ],
        declarations: [_map_layers_control_modal_page__WEBPACK_IMPORTED_MODULE_1__.MapLayersControlModalPage]
    })
], MapLayersControlModalPageModule);



/***/ })

}]);
//# sourceMappingURL=src_app_components_map-layers-control-modal_map-layers-control-modal_module_ts.js.map