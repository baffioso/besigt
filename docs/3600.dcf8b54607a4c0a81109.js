(self.webpackChunkbesigt=self.webpackChunkbesigt||[]).push([[3600],{3600:(e,i,n)=>{"use strict";n.r(i),n.d(i,{GeolocationWeb:()=>a,Geolocation:()=>o});var t=n(8107);class a extends t.Uw{async getCurrentPosition(e){return new Promise((i,n)=>{navigator.geolocation.getCurrentPosition(e=>{i(e)},e=>{n(e)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e))})}async watchPosition(e,i){return`${navigator.geolocation.watchPosition(e=>{i(e)},e=>{i(null,e)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e))}`}async clearWatch(e){window.navigator.geolocation.clearWatch(parseInt(e.id,10))}async checkPermissions(){if("undefined"==typeof navigator||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");return{location:(await window.navigator.permissions.query({name:"geolocation"})).state}}async requestPermissions(){throw this.unimplemented("Not implemented on web.")}}const o=new a}}]);