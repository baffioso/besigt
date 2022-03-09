"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8802],{8802:(Z,l,s)=>{s.r(l),s.d(l,{LoginPageModule:()=>v});var d=s(9808),t=s(3075),e=s(3349),c=s(5330),u=s(655),i=s(5e3),p=s(7914),m=s(9385);const f=[{path:"",component:(()=>{class o{constructor(n,r,g,L){this.supabase=n,this.fb=r,this.router=g,this.userNotificationService=L}ngOnInit(){this.credentials=this.fb.group({email:["",[t.kI.required,t.kI.email]],password:["",t.kI.required]})}login(){this.userNotificationService.presentLoading(null).subscribe(),this.supabase.signIn(this.credentials.value).then(()=>(0,u.mG)(this,void 0,void 0,function*(){this.userNotificationService.dismissLoading(),this.router.navigateByUrl("/app/map",{replaceUrl:!0})}),n=>(0,u.mG)(this,void 0,void 0,function*(){this.userNotificationService.dismissLoading(),this.showError("Login fejlede",n.message)}))}signUp(){return(0,u.mG)(this,void 0,void 0,function*(){this.userNotificationService.presentLoading(null).subscribe(),this.supabase.signUp(this.credentials.value).then(()=>(0,u.mG)(this,void 0,void 0,function*(){this.userNotificationService.dismissLoading(),this.router.navigateByUrl("/app/map",{replaceUrl:!0})}),n=>(0,u.mG)(this,void 0,void 0,function*(){this.userNotificationService.dismissLoading(),this.showError("Sign up fejlede",n.message)}))})}showError(n,r){this.userNotificationService.presentToast({color:"danger",header:n,message:r,duration:3e3,position:"top"})}}return o.\u0275fac=function(n){return new(n||o)(i.Y36(p.T),i.Y36(t.qu),i.Y36(c.F0),i.Y36(m.w))},o.\u0275cmp=i.Xpm({type:o,selectors:[["app-login"]],decls:15,vars:2,consts:[["color","primary",1,"ion-text-center"],["slot","end"],["defaultHref","app/map"],["fullscreen",""],[3,"formGroup","ngSubmit"],[1,"input-group"],["placeholder","Email","formControlName","email"],["type","password","placeholder","password","formControlName","password"],["type","submit","expand","block","color","primary",3,"disabled"],["type","button","expand","block","color","secondary",3,"click"]],template:function(n,r){1&n&&(i.TgZ(0,"ion-header"),i.TgZ(1,"ion-toolbar",0),i.TgZ(2,"ion-buttons",1),i._UZ(3,"ion-back-button",2),i.qZA(),i.qZA(),i.qZA(),i.TgZ(4,"ion-content",3),i.TgZ(5,"form",4),i.NdJ("ngSubmit",function(){return r.login()}),i.TgZ(6,"div",5),i.TgZ(7,"ion-item"),i._UZ(8,"ion-input",6),i.qZA(),i.TgZ(9,"ion-item"),i._UZ(10,"ion-input",7),i.qZA(),i.qZA(),i.TgZ(11,"ion-button",8),i._uU(12,"Log in"),i.qZA(),i.TgZ(13,"ion-button",9),i.NdJ("click",function(){return r.signUp()}),i._uU(14,"Sign up! "),i.qZA(),i.qZA(),i.qZA()),2&n&&(i.xp6(5),i.Q6J("formGroup",r.credentials),i.xp6(6),i.Q6J("disabled",!r.credentials.valid))},directives:[e.Gu,e.sr,e.Sm,e.oU,e.cs,e.W2,t._Y,t.JL,t.sg,e.Ie,e.pK,e.j9,t.JJ,t.u,e.YG],styles:["ion-content[_ngcontent-%COMP%]{--padding-top: 40%;--padding-start: 10%;--padding-end: 10%}.errors[_ngcontent-%COMP%]{font-size:small;color:#fff;background:var(--ion-color-danger);padding-left:15px;padding-top:5px;padding-bottom:5px}"],changeDetection:0}),o})()}];let h=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=i.oAB({type:o}),o.\u0275inj=i.cJS({imports:[[c.Bz.forChild(f)],c.Bz]}),o})(),v=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=i.oAB({type:o}),o.\u0275inj=i.cJS({imports:[[d.ez,t.u5,e.Pc,h,t.UX]]}),o})()}}]);