(self["webpackChunkbesigt"] = self["webpackChunkbesigt"] || []).push([["src_app_tap-map_map_module_ts"],{

/***/ 35418:
/*!*************************************************************************!*\
  !*** ./src/app/components/map-geolocation/map-geolocation.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapGeolocationComponent": () => (/* binding */ MapGeolocationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _raw_loader_map_geolocation_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./map-geolocation.component.html */ 40409);
/* harmony import */ var _map_geolocation_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map-geolocation.component.scss */ 64413);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 42741);
/* harmony import */ var src_app_services_map_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/map.service */ 30999);





let MapGeolocationComponent = class MapGeolocationComponent {
    constructor(mapService) {
        this.mapService = mapService;
    }
    ngOnInit() { }
    onToggleGeolocate() {
        this.mapService.startGeolocate();
    }
};
MapGeolocationComponent.ctorParameters = () => [
    { type: src_app_services_map_service__WEBPACK_IMPORTED_MODULE_2__.MapService }
];
MapGeolocationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-map-geolocation',
        template: _raw_loader_map_geolocation_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_map_geolocation_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], MapGeolocationComponent);



/***/ }),

/***/ 83111:
/*!*******************************************************************************!*\
  !*** ./src/app/components/map-layers-control/map-layers-control.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapLayersControlComponent": () => (/* binding */ MapLayersControlComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _raw_loader_map_layers_control_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./map-layers-control.component.html */ 92764);
/* harmony import */ var _map_layers_control_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map-layers-control.component.scss */ 44404);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 42741);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 34595);
/* harmony import */ var _map_layers_control_modal_map_layers_control_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../map-layers-control-modal/map-layers-control-modal.page */ 96318);






let MapLayersControlComponent = class MapLayersControlComponent {
    constructor(modalController) {
        this.modalController = modalController;
    }
    ngOnInit() { }
    onShowLayersControl() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _map_layers_control_modal_map_layers_control_modal_page__WEBPACK_IMPORTED_MODULE_2__.MapLayersControlModalPage,
                cssClass: 'my-custom-class'
            });
            return yield modal.present();
        });
    }
};
MapLayersControlComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController }
];
MapLayersControlComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-map-layers-control',
        template: _raw_loader_map_layers_control_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_map_layers_control_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], MapLayersControlComponent);



/***/ }),

/***/ 47062:
/*!*************************************************************!*\
  !*** ./src/app/components/map-tools/map-tools.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapToolsComponent": () => (/* binding */ MapToolsComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _raw_loader_map_tools_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./map-tools.component.html */ 49367);
/* harmony import */ var _map_tools_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map-tools.component.scss */ 5443);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 42741);




let MapToolsComponent = class MapToolsComponent {
    constructor() { }
    ngOnInit() { }
};
MapToolsComponent.ctorParameters = () => [];
MapToolsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-map-tools',
        template: _raw_loader_map_tools_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_map_tools_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], MapToolsComponent);



/***/ }),

/***/ 21538:
/*!*************************************************!*\
  !*** ./src/app/components/map/map.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapComponent": () => (/* binding */ MapComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _raw_loader_map_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./map.component.html */ 37645);
/* harmony import */ var _map_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.component.scss */ 62845);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 42741);
/* harmony import */ var src_app_services_map_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/map.service */ 30999);





let MapComponent = class MapComponent {
    constructor(mapService) {
        this.mapService = mapService;
    }
    ngAfterViewInit() {
        this.mapService.createMap();
        setTimeout(() => {
            this.mapService.resize();
        }, 500);
    }
};
MapComponent.ctorParameters = () => [
    { type: src_app_services_map_service__WEBPACK_IMPORTED_MODULE_2__.MapService }
];
MapComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-map',
        template: _raw_loader_map_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_map_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], MapComponent);



/***/ }),

/***/ 45978:
/*!***********************************************!*\
  !*** ./src/app/tap-map/map-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapPageRoutingModule": () => (/* binding */ MapPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 42741);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 29535);
/* harmony import */ var _map_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.page */ 9279);




const routes = [
    {
        path: '',
        component: _map_page__WEBPACK_IMPORTED_MODULE_0__.TapMapPage,
    }
];
let MapPageRoutingModule = class MapPageRoutingModule {
};
MapPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    })
], MapPageRoutingModule);



/***/ }),

/***/ 95465:
/*!***************************************!*\
  !*** ./src/app/tap-map/map.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapPageModule": () => (/* binding */ MapPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 34595);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 42741);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 16274);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 93324);
/* harmony import */ var _map_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.page */ 9279);
/* harmony import */ var _map_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map-routing.module */ 45978);
/* harmony import */ var _components_map_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/map/map.component */ 21538);
/* harmony import */ var _components_map_layers_control_map_layers_control_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/map-layers-control/map-layers-control.component */ 83111);
/* harmony import */ var _components_map_tools_map_tools_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/map-tools/map-tools.component */ 47062);
/* harmony import */ var _components_map_geolocation_map_geolocation_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/map-geolocation/map-geolocation.component */ 35418);











let MapPageModule = class MapPageModule {
};
MapPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonicModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule,
            _map_routing_module__WEBPACK_IMPORTED_MODULE_1__.MapPageRoutingModule
        ],
        declarations: [_map_page__WEBPACK_IMPORTED_MODULE_0__.TapMapPage, _components_map_map_component__WEBPACK_IMPORTED_MODULE_2__.MapComponent, _components_map_layers_control_map_layers_control_component__WEBPACK_IMPORTED_MODULE_3__.MapLayersControlComponent, _components_map_tools_map_tools_component__WEBPACK_IMPORTED_MODULE_4__.MapToolsComponent, _components_map_geolocation_map_geolocation_component__WEBPACK_IMPORTED_MODULE_5__.MapGeolocationComponent]
    })
], MapPageModule);



/***/ }),

/***/ 9279:
/*!*************************************!*\
  !*** ./src/app/tap-map/map.page.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TapMapPage": () => (/* binding */ TapMapPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _raw_loader_map_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./map.page.html */ 59758);
/* harmony import */ var _map_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.page.scss */ 60050);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 42741);




let TapMapPage = class TapMapPage {
    constructor() { }
};
TapMapPage.ctorParameters = () => [];
TapMapPage = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-tap-map',
        template: _raw_loader_map_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_map_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], TapMapPage);



/***/ }),

/***/ 64413:
/*!***************************************************************************!*\
  !*** ./src/app/components/map-geolocation/map-geolocation.component.scss ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXAtZ2VvbG9jYXRpb24uY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ 44404:
/*!*********************************************************************************!*\
  !*** ./src/app/components/map-layers-control/map-layers-control.component.scss ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXAtbGF5ZXJzLWNvbnRyb2wuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ 5443:
/*!***************************************************************!*\
  !*** ./src/app/components/map-tools/map-tools.component.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXAtdG9vbHMuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ 62845:
/*!***************************************************!*\
  !*** ./src/app/components/map/map.component.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".map-container {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBQ0oiLCJmaWxlIjoibWFwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hcC1jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbn1cbiJdfQ== */");

/***/ }),

/***/ 60050:
/*!***************************************!*\
  !*** ./src/app/tap-map/map.page.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXAucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ 40409:
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/map-geolocation/map-geolocation.component.html ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-fab horizontal=\"end\" vertical=\"bottom\" slot=\"fixed\">\n  <ion-fab-button color=\"light\" (click)=\"onToggleGeolocate()\">\n    <ion-icon name=\"navigate-outline\"></ion-icon>\n  </ion-fab-button>\n</ion-fab>");

/***/ }),

/***/ 92764:
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/map-layers-control/map-layers-control.component.html ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-fab horizontal=\"end\" vertical=\"top\" slot=\"fixed\">\n  <ion-fab-button color=\"light\" (click)=\"onShowLayersControl()\">\n    <ion-icon name=\"layers-outline\"></ion-icon>\n  </ion-fab-button>\n</ion-fab>");

/***/ }),

/***/ 49367:
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/map-tools/map-tools.component.html ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-fab horizontal=\"start\" vertical=\"top\" slot=\"fixed\">\n  <ion-fab-button color=\"light\">\n    <ion-icon name=\"construct-outline\"></ion-icon>\n  </ion-fab-button>\n  <ion-fab-list>\n    <ion-fab-button color=\"light\">\n      <ion-icon name=\"analytics\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button color=\"light\">\n      <ion-icon name=\"camera\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button color=\"light\">\n      <ion-icon name=\"footsteps\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-button color=\"light\">\n      <ion-icon name=\"bookmark\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab-list>\n</ion-fab>");

/***/ }),

/***/ 37645:
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/map/map.component.html ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<div id=\"ol-map\" class=\"map-container\"></div>");

/***/ }),

/***/ 59758:
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tap-map/map.page.html ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content>\n    <app-map></app-map>\n    <app-map-layers-control></app-map-layers-control>\n    <app-map-tools></app-map-tools>\n    <app-map-geolocation></app-map-geolocation>\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=src_app_tap-map_map_module_ts.js.map