(self.webpackChunkbesigt=self.webpackChunkbesigt||[]).push([[7437],{7437:(e,n,t)=>{"use strict";t.r(n),t.d(n,{ProjectDetailPageModule:()=>U});var o=t(6274),i=t(3324),c=t(4683),a=t(4337),s=t(1855),r=t(2812),p=t(8561),g=t(4089),l=t(714),u=t(7272),d=t(1100),Z=t(7681),m=t(3220),f=t(9450);function h(e,n){if(1&e&&(u.ynx(0),u.TgZ(1,"ion-card"),u.TgZ(2,"ion-card-header"),u.TgZ(3,"ion-card-subtitle"),u._uU(4),u.ALo(5,"date"),u.qZA(),u.TgZ(6,"ion-card-title"),u._uU(7),u.qZA(),u.qZA(),u.TgZ(8,"ion-card-content"),u._uU(9),u.qZA(),u.qZA(),u.BQk()),2&e){const e=u.oxw().ngIf;u.xp6(4),u.hij("Oprettet: ",u.lcZ(5,3,e.inserted_at)," "),u.xp6(3),u.Oqu(e.name),u.xp6(2),u.hij(" ",e.description," ")}}function b(e,n){1&e&&u._UZ(0,"img",13),2&e&&u.Q6J("src",n.$implicit,u.LSH)}function T(e,n){if(1&e&&(u.ynx(0),u.YNc(1,b,1,1,"img",12),u.ALo(2,"async"),u.BQk()),2&e){const e=u.oxw(2);u.xp6(1),u.Q6J("ngForOf",u.lcZ(2,1,e.photos$))}}function A(e,n){if(1&e){const e=u.EpF();u.ynx(0),u.TgZ(1,"ion-header"),u.TgZ(2,"ion-toolbar",1),u.TgZ(3,"ion-buttons",2),u._UZ(4,"ion-back-button",3),u.qZA(),u.TgZ(5,"ion-title"),u._uU(6),u.qZA(),u.TgZ(7,"ion-buttons",4),u.TgZ(8,"ion-button"),u._UZ(9,"ion-icon",5),u.qZA(),u.qZA(),u.qZA(),u.TgZ(10,"ion-segment",6),u.NdJ("ionChange",function(n){return u.CHM(e),u.oxw().onTabChange(n)})("ngModelChange",function(n){return u.CHM(e),u.oxw().selectedTab=n}),u.TgZ(11,"ion-segment-button",7),u._UZ(12,"ion-icon",8),u.qZA(),u.TgZ(13,"ion-segment-button",9),u._UZ(14,"ion-icon",10),u.qZA(),u.qZA(),u.qZA(),u.TgZ(15,"ion-content",11),u.YNc(16,h,10,5,"ng-container",0),u.YNc(17,T,3,3,"ng-container",0),u.qZA(),u.BQk()}if(2&e){const e=n.ngIf,t=u.oxw();u.xp6(6),u.Oqu(e.name),u.xp6(4),u.Q6J("ngModel",t.selectedTab),u.xp6(6),u.Q6J("ngIf","detail"===t.selectedTab),u.xp6(1),u.Q6J("ngIf","photos"===t.selectedTab)}}const q=[{path:"",component:(()=>{class e{constructor(e,n,t,o,i){this.projectStore=e,this.route=n,this.supabase=t,this.domSanitizer=o,this.notification=i,this.selectedTab="detail",this.project$=this.route.paramMap.pipe((0,r.w)(e=>this.projectStore.projects$.pipe((0,p.U)(n=>n.find(n=>n.id===e.get("id")))))),this.photos$=this.project$.pipe((0,g.b)(()=>(0,s.mG)(this,void 0,void 0,function*(){})),(0,p.U)(e=>e.images.map(e=>e.file_name.replace("images/",""))),(0,r.w)(e=>{const n=e.map(e=>this.supabase.downloadImage(e));return(0,l.D)(n).pipe((0,p.U)(e=>e.map(e=>this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(e.data)))))}),(0,g.b)(()=>(0,s.mG)(this,void 0,void 0,function*(){})))}ngOnInit(){}onTabChange(e){this.selectedTab=e.detail.value}}return e.\u0275fac=function(n){return new(n||e)(u.Y36(d.c),u.Y36(a.gz),u.Y36(Z.T),u.Y36(m.H7),u.Y36(f.w))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-project-detail"]],decls:2,vars:3,consts:[[4,"ngIf"],["color","primary",1,"ion-text-center"],["slot","start"],["aria-label","Tilbage","mode","md","defaultHref","/app/projects"],["slot","end"],["name","pencil"],["color","secondary",3,"ngModel","ionChange","ngModelChange"],["value","detail"],["name","information-circle"],["value","photos"],["name","camera"],["fullscreen",""],[3,"src",4,"ngFor","ngForOf"],[3,"src"]],template:function(e,n){1&e&&(u.YNc(0,A,18,4,"ng-container",0),u.ALo(1,"async")),2&e&&u.Q6J("ngIf",u.lcZ(1,1,n.project$))},directives:[o.O5,c.Gu,c.sr,c.Sm,c.oU,c.cs,c.wd,c.YG,c.gu,c.cJ,c.QI,i.JJ,i.On,c.GO,c.W2,c.PM,c.Zi,c.tO,c.gZ,c.FN,o.sg],pipes:[o.Ov,o.uU],styles:["ion-segment[_ngcontent-%COMP%]{background-color:var(--ion-color-light)}"]}),e})()}];let x=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[a.Bz.forChild(q)],a.Bz]}),e})(),U=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[o.ez,i.u5,c.Pc,x]]}),e})()}}]);