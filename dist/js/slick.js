parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"zYHn":[function(require,module,exports) {
function e(e,r,a){return r in e?Object.defineProperty(e,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[r]=a,e}$(document).ready(function(){var r;$(".topstory-carousel").slick((e(r={centerMode:!0,slidesToShow:1,arrows:!1,variableWidth:!0,autoplay:!0,autoplaySpeed:6e3,infinite:!0},"arrows",!0),e(r,"prevArrow",$(".slick-prev")),e(r,"nextArrow",$(".slick-next")),e(r,"responsive",[{breakpoint:768,settings:{dots:!0,arrows:!1}},{breakpoint:580,settings:{centerMode:!1,variableWidth:!1,dots:!0,arrows:!1}}]),r)),$(".social-media-carousel").slick({infinite:!0,variableWidth:!0,autoplay:!0,autoplaySpeed:6e3,speed:800})});
},{}]},{},["zYHn"], null)
//# sourceMappingURL=/dist/js/slick.js.map