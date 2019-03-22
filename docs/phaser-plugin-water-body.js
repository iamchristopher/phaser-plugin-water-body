var WaterBodyPlugin=function(){"use strict";function a(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function b(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function c(a,c,d){return c&&b(a.prototype,c),d&&b(a,d),a}function d(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function e(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&g(a,b)}function f(a){return f=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},f(a)}function g(a,b){return g=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},g(a,b)}function h(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(a){return!1}}function i(){return i=h()?Reflect.construct:function(b,c,d){var e=[null];e.push.apply(e,c);var a=Function.bind.apply(b,e),f=new a;return d&&g(f,d.prototype),f},i.apply(null,arguments)}function j(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function k(a,b){return b&&("object"==typeof b||"function"==typeof b)?b:j(a)}function l(a){return m(a)||n(a)||o()}function m(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function n(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function p(a,b){if(!b.has(a))throw new TypeError("attempted to get private field on non-instance");var c=b.get(a);return c.get?c.get.call(a):c.value}var q=function(){function b(){var c=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,d=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;a(this,b),this.index=e,this.x=c,this.y=d,this.targetY=d,this.speed=.5}return c(b,[{key:"update",value:function(a,b){var c=this.targetY-this.y;this.speed+=b*c-this.speed*a,this.y+=this.speed}}]),b}(),r=function(){function b(c){var d=Math.min,e=this,f=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,g=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,j=3<arguments.length&&void 0!==arguments[3]?arguments[3]:100,k=4<arguments.length&&void 0!==arguments[4]?arguments[4]:100,h=5<arguments.length&&void 0!==arguments[5]?arguments[5]:150,m=6<arguments.length&&void 0!==arguments[6]?arguments[6]:{},n=m.tension,o=void 0===n?.025:n,p=m.dampening,r=void 0===p?.025:p,s=m.spread,t=void 0===s?.25:s,u=m.texture;a(this,b),this.debug=!1,this.x=f,this.y=g,this.w=j,this.h=k,this.tension=o,this.dampening=r,this.spread=t,this.depth=d(h,this.h),this.texture=u;var v=[0,this.h-this.depth,this.w,this.h-this.depth],w=i(Phaser.Geom.Line,v),x=w.getPoints(0,20);this.columns=[].concat(l(x),[{x:this.w,y:v[1]}]).map(function(a,b){var c=a.x,d=a.y;return new q(c,d,b)});var y=this.columns.reduce(function(a,b){var c=b.x,d=b.y;return[].concat(l(a),[c,d])},[]);this.body=c.add.polygon(f,g,[v[0],this.h].concat(l(y),[v[2],this.h])).setFillStyle(1334737,0).setDepth(99).setOrigin(0,0),"string"==typeof u&&(this.background=c.add.tileSprite(this.x,this.y,this.w,this.h,this.texture).setAlpha(.75).setDepth(99).setOrigin(0,0),this.background.mask=new Phaser.Display.Masks.GeometryMask(c,this.body)),this.sensor=c.matter.add.rectangle(this.x+this.w/2,this.y+this.h-this.depth/2,j,this.depth,{isSensor:!0,isStatic:!0,gameObject:this}),this.debugGraphic=c.add.graphics({fillStyle:{color:16777215}}),this.emitter=c.add.particles("droplet").createEmitter({alpha:1,tint:741525,speed:{min:100,max:500},gravityY:1e3,lifespan:4e3,quantity:0,frequency:1e3,angle:{min:240,max:300},scale:{min:.5,max:.1},deathZone:{type:"onEnter",source:new Phaser.Geom.Polygon(Object.values(this.body.geom.points).map(function(a){var b=a.x,c=a.y;return[e.x+b,e.y+c]}))},deathCallback:function(a){var b=a.x,c=e.columns.findIndex(function(a,c){return e.x+a.x>=b&&c});e.ripple(Phaser.Math.Clamp(c,0,e.columns.length-1),10)}})}return c(b,[{key:"update",value:function(){var a=this;this.columns.forEach(function(b){return b.update(a.dampening,a.tension)});var b=this.columns.reduce(function(a,b){var c=b.x,d=b.y;return[].concat(l(a),[c,d])},[]);this.body.geom.setTo([0,this.h].concat(l(b),[this.w,this.h])),this.body.updateData(),this.debugGraphic.clear(),this.debug&&this.columns.forEach(function(b){var c=b.x,d=b.y;return a.debugGraphic.fillRect(a.x+c-1,a.y+d-1,2,2)});for(var c=Array(this.columns.length).fill(0),d=Array(this.columns.length).fill(0),e=0;1>e;e++){for(var f=0;f<this.columns.length-1;f++){if(0<f){var g=this.columns[f],h=this.columns[f-1];c[f]=this.spread*(g.y-h.y),h.speed+=c[f]}if(f<this.columns.length-1){var k=this.columns[f],m=this.columns[f+1];d[f]=this.spread*(k.y-m.y),m.speed+=d[f]}}for(var n=0;n<this.columns.length-1;n++){if(0<n){var o=this.columns[n-1];o.y+=c[n]}if(n<this.columns.length-1){var p=this.columns[n+1];p.y+=d[n]}}}}},{key:"splash",value:function(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:3,d=this.columns[a];return d.speed=b,this.emitter.explode(c,this.x+d.x,this.y+d.y),this}},{key:"ripple",value:function(a,b){var c=this.columns[a];return c.speed=b,this}},{key:"setDebug",value:function(a){return this.debug=a,this}}]),b}(),s=function(b){function g(b,c){var e;return a(this,g),e=k(this,f(g).call(this,b,c)),t.set(j(j(e)),{writable:!0,value:[]}),d(j(j(e)),"createWaterBody",function(a,b,c,d,f,g){var h=new r(e.scene,a,b,c,d,f,g);return p(j(j(e)),t).push(h),h}),c.registerGameObject("water",e.createWaterBody),e}return e(g,b),c(g,[{key:"boot",value:function(){this.systems.events.on("update",this.update,this)}},{key:"update",value:function(){var a=!0,b=!1,c=void 0;try{for(var d,e,f=p(this,t)[Symbol.iterator]();!(a=(d=f.next()).done);a=!0)e=d.value,e.update()}catch(a){b=!0,c=a}finally{try{a||null==f.return||f.return()}finally{if(b)throw c}}}},{key:"bodies",get:function(){return p(this,t)}}]),g}(Phaser.Plugins.ScenePlugin),t=new WeakMap;return s}();
