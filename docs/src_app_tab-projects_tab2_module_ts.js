(self["webpackChunkbesigt"] = self["webpackChunkbesigt"] || []).push([["src_app_tab-projects_tab2_module_ts"],{

/***/ 77010:
/*!*******************************************************************!*\
  !*** ./src/app/components/project-list/project-list.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectListComponent": () => (/* binding */ ProjectListComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _raw_loader_project_list_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./project-list.component.html */ 12897);
/* harmony import */ var _project_list_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-list.component.scss */ 76314);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 42741);




let ProjectListComponent = class ProjectListComponent {
    constructor() { }
    ngOnInit() { }
};
ProjectListComponent.ctorParameters = () => [];
ProjectListComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-project-list',
        template: _raw_loader_project_list_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_project_list_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ProjectListComponent);



/***/ }),

/***/ 22522:
/*!*****************************************************!*\
  !*** ./src/app/tab-projects/tab2-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab2PageRoutingModule": () => (/* binding */ Tab2PageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 42741);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 29535);
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab2.page */ 43940);




const routes = [
    {
        path: '',
        component: _tab2_page__WEBPACK_IMPORTED_MODULE_0__.Tab2Page,
    }
];
let Tab2PageRoutingModule = class Tab2PageRoutingModule {
};
Tab2PageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    })
], Tab2PageRoutingModule);



/***/ }),

/***/ 93880:
/*!*********************************************!*\
  !*** ./src/app/tab-projects/tab2.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab2PageModule": () => (/* binding */ Tab2PageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 34595);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 42741);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 16274);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 93324);
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab2.page */ 43940);
/* harmony import */ var _tab2_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tab2-routing.module */ 22522);
/* harmony import */ var _components_project_list_project_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/project-list/project-list.component */ 77010);








let Tab2PageModule = class Tab2PageModule {
};
Tab2PageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
            _tab2_routing_module__WEBPACK_IMPORTED_MODULE_1__.Tab2PageRoutingModule
        ],
        declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_0__.Tab2Page, _components_project_list_project_list_component__WEBPACK_IMPORTED_MODULE_2__.ProjectListComponent]
    })
], Tab2PageModule);



/***/ }),

/***/ 43940:
/*!*******************************************!*\
  !*** ./src/app/tab-projects/tab2.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab2Page": () => (/* binding */ Tab2Page)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 61855);
/* harmony import */ var _raw_loader_tab2_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./tab2.page.html */ 74989);
/* harmony import */ var _tab2_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tab2.page.scss */ 72437);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 42741);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 267);





let Tab2Page = class Tab2Page {
    constructor() {
        this.projects$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)([
            { title: 'Fredstoftevej', date: '2020-09-12', description: 'Jordforbedring på marken' },
            { title: 'Fanøvej', date: '2021-09-12', description: 'Støjvold langs motorvejen' },
            { title: 'Degnemosen', date: '2019-09-12', description: 'Jordforbedring på marken' },
            { title: 'Egedal', date: '2020-09-12', description: 'Jordforbedring på marken' },
            { title: 'Ballerup', date: '2020-09-12', description: 'Jordforbedring på marken' },
            { title: 'Taastrup', date: '2020-09-12', description: 'Jordforbedring på marken' },
            { title: 'Fredstoftevej', date: '2020-09-12', description: 'Jordforbedring på marken' },
            { title: 'Fanøvej', date: '2020-09-12', description: 'Støjvold langs motorvejen' },
            { title: 'Degnemosen', date: '2020-09-12', description: 'Jordforbedring på marken' },
            { title: 'Egedal', date: '2020-09-12', description: 'Jordforbedring på marken' },
            { title: 'Ballerup', date: '2020-09-12', description: 'Jordforbedring på marken' },
            { title: 'Taastrup', date: '2020-09-12', description: 'Jordforbedring på marken' },
            { title: 'Fredstoftevej', date: '2020-09-12', description: 'Jordforbedring på marken' },
        ]);
    }
};
Tab2Page.ctorParameters = () => [];
Tab2Page = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-tab2',
        template: _raw_loader_tab2_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_tab2_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], Tab2Page);



/***/ }),

/***/ 76314:
/*!*********************************************************************!*\
  !*** ./src/app/components/project-list/project-list.component.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0LWxpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ 72437:
/*!*********************************************!*\
  !*** ./src/app/tab-projects/tab2.page.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YWIyLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ 12897:
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/project-list/project-list.component.html ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<p>\n  project-list works!\n</p>\n");

/***/ }),

/***/ 74989:
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab-projects/tab2.page.html ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-title>\n      Projekter\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content [fullscreen]=\"true\">\n  <ion-list>\n    <ion-item *ngFor=\"let project of projects$ | async\" detail>\n      <!-- <ion-avatar slot=\"start\">\n        <img src=\"./assets/icon/favicon.png\">\n      </ion-avatar> -->\n      <ion-label>\n        <h2>{{project.title}}</h2>\n        <h3>{{project.date}}</h3>\n        <p>{{project.description}}</p>\n      </ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=src_app_tab-projects_tab2_module_ts.js.map