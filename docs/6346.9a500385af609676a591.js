(self.webpackChunkbesigt=self.webpackChunkbesigt||[]).push([[6346],{6346:(t,e,n)=>{"use strict";n.r(e),n.d(e,{ProjectsPageModule:()=>m});var o=n(4683),i=n(6274),r=n(4988),c=n(4337),s=n(7272),p=n(1100),u=n(6190);function a(t,e){1&t&&(s.TgZ(0,"div",5),s.TgZ(1,"ion-text"),s._uU(2,"Du skal logge ind for at se projekter"),s.qZA(),s._UZ(3,"br"),s.TgZ(4,"ion-button",6),s._uU(5,"Log ind"),s.qZA(),s.qZA())}const l=function(t){return["./",t]};function g(t,e){if(1&t){const t=s.EpF();s.TgZ(0,"ion-item"),s.TgZ(1,"ion-label",8),s.NdJ("click",function(){const e=s.CHM(t).$implicit;return s.oxw(2).goToProject(e)}),s.TgZ(2,"h2"),s._uU(3),s.qZA(),s.TgZ(4,"h3"),s._uU(5),s.ALo(6,"date"),s.qZA(),s.TgZ(7,"p"),s._uU(8),s.qZA(),s.qZA(),s.TgZ(9,"ion-fab-button",9),s._UZ(10,"ion-icon",10),s.qZA(),s.qZA()}if(2&t){const t=e.$implicit;s.xp6(3),s.Oqu(t.name),s.xp6(2),s.Oqu(s.lcZ(6,4,t.inserted_at)),s.xp6(3),s.Oqu(t.description),s.xp6(1),s.Q6J("routerLink",s.VKq(6,l,t.id))}}function Z(t,e){if(1&t&&(s.TgZ(0,"ion-list"),s.YNc(1,g,11,8,"ion-item",7),s.ALo(2,"async"),s.qZA()),2&t){const t=s.oxw();s.xp6(1),s.Q6J("ngForOf",s.lcZ(2,1,t.projects$))}}const f=[{path:"",component:(()=>{class t{constructor(t,e,n){this.projectStoreService=t,this.router=e,this.mapService=n,this.projects$=this.projectStoreService.projects$}goToProject(t){this.projectStoreService.setCurrentProjectId(t.id);const e=t.map_state[0].map_state;this.mapService.flyTo(e.center,e.zoom),this.router.navigateByUrl("/app/map")}}return t.\u0275fac=function(e){return new(e||t)(s.Y36(p.c),s.Y36(c.F0),s.Y36(u.S))},t.\u0275cmp=s.Xpm({type:t,selectors:[["app-projects"]],decls:9,vars:7,consts:[[3,"translucent"],["color","primary",1,"ion-text-center"],[1,""],["class","ion-text-center ion-padding",4,"ngIf"],[4,"ngIf"],[1,"ion-text-center","ion-padding"],["routerLink","/login",1,"ion-padding"],[4,"ngFor","ngForOf"],[3,"routerLink","click"],["size","small","color","light",3,"routerLink"],["name","information-circle-outline"]],template:function(t,e){1&t&&(s.TgZ(0,"ion-header",0),s.TgZ(1,"ion-toolbar",1),s.TgZ(2,"ion-title",2),s._uU(3," Projekter "),s.qZA(),s.qZA(),s.qZA(),s.TgZ(4,"ion-content"),s.YNc(5,a,6,0,"div",3),s.ALo(6,"async"),s.YNc(7,Z,3,3,"ion-list",4),s.ALo(8,"async"),s.qZA()),2&t&&(s.Q6J("translucent",!0),s.xp6(5),s.Q6J("ngIf",0===s.lcZ(6,3,e.projects$).length),s.xp6(2),s.Q6J("ngIf",s.lcZ(8,5,e.projects$).length>0))},directives:[o.Gu,o.sr,o.wd,o.W2,i.O5,o.yW,o.YG,o.YI,c.rH,o.q_,i.sg,o.Ie,o.Q$,o.W4,o.gu],pipes:[i.Ov,i.uU],styles:["ion-fab-button[_ngcontent-%COMP%]{--box-shadow:0}"]}),t})()}];let d=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[c.Bz.forChild(f)],c.Bz]}),t})(),m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[o.Pc,i.ez,r.u5,d]]}),t})()}}]);