"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4561],{4561:(l,s,i)=>{i.r(s),i.d(s,{GeolocationWeb:()=>a,Geolocation:()=>u});var o=i(5861),c=i(7423);class a extends c.Uw{getCurrentPosition(e){return(0,o.Z)(function*(){return new Promise((t,r)=>{navigator.geolocation.getCurrentPosition(n=>{t(n)},n=>{r(n)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e))})})()}watchPosition(e,t){return(0,o.Z)(function*(){return`${navigator.geolocation.watchPosition(n=>{t(n)},n=>{t(null,n)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e))}`})()}clearWatch(e){return(0,o.Z)(function*(){window.navigator.geolocation.clearWatch(parseInt(e.id,10))})()}checkPermissions(){var e=this;return(0,o.Z)(function*(){if("undefined"==typeof navigator||!navigator.permissions)throw e.unavailable("Permissions API not available in this browser");return{location:(yield window.navigator.permissions.query({name:"geolocation"})).state}})()}requestPermissions(){var e=this;return(0,o.Z)(function*(){throw e.unimplemented("Not implemented on web.")})()}}const u=new a}}]);