(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{6923:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return rn}});var r=e(2809),o=e(318),c=e(7294),a=e(9008),u=e(6467),i=e(1860),s=e.n(i),l=function(){var n=c.useState(0),t=(0,o.Z)(n,2),e=(t[0],t[1]);return function(){return e((function(n){return n+1}))}},f=e(5918),p=e.n(f),h=e(5893),m=s().namespace("preset"),d={robot:[66,126,129,165,129,126,60,255],play:[255,129,177,189,189,177,129,255],stop:[255,129,189,189,189,189,129,255],ok:[101,149,149,150,150,149,149,101],err:[61,66,133,137,145,161,66,188],number1:[6,14,22,6,6,6,6,31],number2:[14,27,3,3,6,12,24,31],number3:[30,3,3,14,3,3,3,30],number4:[3,7,11,27,31,3,3,3]},b=function(n){return d[n]},j=function(n){return m(n)},y=function(n){var t=n.onClick,e=l(),r=function(n,r){return function(o){if("SPAN"===o.target.nodeName)confirm('Delete preset "'.concat(r,'"?'))&&(!function(n){m.remove(n)}(r),e());else{var c=n(r);t({name:r,array:c})}}};return(0,h.jsxs)("div",{children:[m.size()>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("h3",{children:"Your saved bitmaps"}),Object.keys(m()).sort().map((function(n){return(0,h.jsxs)("button",{onClick:r(j,n),children:[n,(0,h.jsx)("span",{className:p().deletePreset,children:"\u2bbf"})]},n)}))]}),(0,h.jsx)("h3",{children:"Example bitmaps"}),Object.keys(d).map((function(n){return(0,h.jsx)("button",{onClick:r(b,n),children:n},n)}))]})},v=e(3789),g=e(1077),x=e(6129);function O(){O=function(n,t){return new e(n,void 0,t)};var n=RegExp.prototype,t=new WeakMap;function e(n,r,o){var c=new RegExp(n,r);return t.set(c,o||t.get(n)),(0,x.Z)(c,e.prototype)}function r(n,e){var r=t.get(e);return Object.keys(r).reduce((function(t,e){return t[e]=n[r[e]],t}),Object.create(null))}return(0,g.Z)(e,RegExp),e.prototype.exec=function(t){var e=n.exec.call(this,t);return e&&(e.groups=r(e,this)),e},e.prototype[Symbol.replace]=function(e,o){if("string"===typeof o){var c=t.get(this);return n[Symbol.replace].call(this,e,o.replace(/\$<([^>]+)>/g,(function(n,t){return"$"+c[t]})))}if("function"===typeof o){var a=this;return n[Symbol.replace].call(this,e,(function(){var n=arguments;return"object"!==typeof n[n.length-1]&&(n=[].slice.call(n)).push(r(n,a)),o.apply(this,n)}))}return n[Symbol.replace].call(this,e,o)},O.apply(this,arguments)}var A={"C++ (GyverMAX7219)":{fromCode:function(n){return(O(/.*?([0-9A-Z_a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\[\](?:(?!=)[\s\S])*=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\{((?:(?!\})[\s\S])+)?\}?.*$/,{name:1,arrayStr:2}).exec(n)||{}).groups},toCode:function(n){var t=n.name,e=n.arrayStr;return"const uint8_t ".concat(t,"[] PROGMEM = {").concat(e,"};")}},JavaScript:{fromCode:function(n){return(O(/.*?([0-9A-Z_a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\[((?:(?!\])[\s\S])+)?\]?.*$/,{name:1,arrayStr:2}).exec(n)||{}).groups},toCode:function(n){var t=n.name,e=n.arrayStr;return"const ".concat(t," = [").concat(e,"]")}}};function w(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function C(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?w(Object(e),!0).forEach((function(t){(0,r.Z)(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):w(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}var S=s().namespace("transform"),P=function(n){return function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return e.reduce((function(n,t){return C(C({},n),t(n))}),n)}},_=function(n){var t=Array.isArray(n)?Math.max.apply(Math,(0,v.Z)(n)):n;return 8*Math.ceil(t/8)},k=function(n){var t=Array.isArray(n)?Math.max.apply(Math,(0,v.Z)(n)):n;return 8*Math.max(1,Math.floor(t/8))},E=function(n){return _(n.split("\n").map((function(n){return n.length})))},F=function(n){var t=n.bitmap,e=E(t),r=function(n){return n%10};console.log(["  ".concat(Array.from({length:e},(function(n,t){return r(t)})).join(""))].concat((0,v.Z)(t.split("\n").map((function(n,t){return"".concat(r(t),"|").concat(n,"|")})))).join("\n"))},M=function(n){var t=n.code,e=n.format,r=A[e].fromCode(t.trim())||{},o=r.name,c=void 0===o?"":o,a=r.arrayStr,u=void 0===a?"":a,i=r.array;return{name:c,array:void 0===i?/\S/.test(u)?u.split(/\s*,\s*/).filter((function(n,t,e){var r=e.length;return!(""===n&&t===r-1)})).map((function(n){return""===n?0:parseInt(n)})).map((function(n){return isNaN(n)?0:n})):[]:i}},Z=function(n){var t=n.array,e=function(n){return _(n.map((function(n){return n.toString(2).length})))}(t);return{bitmap:t.map((function(n){var t=n.toString(2).replace(/0/g," ").replace(/1/g,"x"),r=" ".repeat(Math.max(0,e-t.length));return"".concat(r).concat(t)})).join("\n")}},N=function(n){var t=n.bitmap,e=E(t);return{array:t.split("\n").map((function(n){n=n.replace(/ /g,"0").replace(/[^0]/g,"1"),n+="0".repeat(Math.max(0,e-n.length));var t=parseInt(n,2);return isNaN(t)?0:t}))}},D=function(n){var t=n.array,e=n.name,r=n.format,o=_(t.map((function(n){return n.toString(2).length}))),c=(Math.pow(2,o)-1).toString(16).length,a=t.map((function(n){var t="".concat("0".repeat(c)).concat(n.toString(16)).slice(-c);return"0x".concat(t)})).join(", ");return{code:A[r].toCode({name:e,array:t,arrayStr:a})}},B=function(n){var t=n.bitmap,e=n.array;if(t){var r=t.split("\n");return{width:_(r.map((function(n){return n.length}))),height:r.length}}return{width:_(e.map((function(n){return n.toString(2).length}))),height:e.length}},R=function(n){var t=n.format,e=void 0===t?S("format")||"C++ (GyverMAX7219)":t;return S("format",e),{format:e}},G=function(n){var t=n.scale,e=void 0===t?S("scale")||1:t;return e=Math.max(.5,Math.min(e,2)),S("scale",e),{scale:e}};function X(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function H(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?X(Object(e),!0).forEach((function(t){(0,r.Z)(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):X(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}var T="robot",z=P({name:T,array:b(T)})(R,G,Z,B,D,F),U={scale:function(n,t){return P(H(H({},n),{},{scale:t}))(G)},bitmap:function(n,t){return P(H(H({},n),{},{bitmap:t}))(N,B,D,F)},code:function(n,t){return P(H(H({},n),{},{code:t}))(M,Z,B,F)},name:function(n,t){return P(H(H({},n),{},{name:t}))(D)},format:function(n,t){return P(H(H({},n),{},{format:t}))(R,D)},preset:function(n,t){var e=t.name,r=t.array;return P(H(H({},n),{},{name:e,array:r}))(Z,B,D,F)}},L=function(n,t){var e=t.type,r=t.payload;return U[e]?U[e](n,r):n},I=e(1186),Q=e.n(I),V=e(4184),W=e.n(V),J=e(9140),q=e.n(J),Y=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],$=[16380,16386,32769,32769,32769,32769,32769,32769,32769,32769,32769,32769,32769,32769,16386,16380],K=[32766,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,32766],nn=function(n){var t=n.bitmap,e=n.width,a=n.height,u=n.scale,i=n.onChangeBitmap,s=n.onChangeScale,l=8===e,f=8===a,p=c.useState(null),m=(0,o.Z)(p,2),d=m[0],b=m[1],j=function(n){return function(){s(n*u)}},y=function(n){return n.split("\n").map((function(n){return n.length<e&&(n+=" ".repeat(e-n.length)),n.split("").map((function(n){return" "!==n}))}))},g=function(n,t){return y(n).forEach((function(n,e){return n.forEach((function(n,r){return t(r,e,n)}))}))},x=function(n){return O(n)()},O=function(n){return function(){var e=y(t);i(function(n){return n.map((function(n){return n.map((function(n){return n?"x":" "})).join("")})).join("\n")}(n(e)||e))}},A=function(n,t){return function(e){var r;e.preventDefault(),x((function(e){r=e[t][n]=!e[t][n]})),b(r)}},w=function(n,t){return function(){null!==d&&x((function(e){e[t][n]=d}))}};c.useEffect((function(){var n=function(){b(null)};return document.addEventListener("mouseup",n,!1),function(){document.removeEventListener("mouseup",n,!1)}}));var C=function(n){return function(t){return t.map(n)}},S=O(C(C((function(){return!1})))),P=O(C(C((function(n){return!n})))),E=O(C((function(n){return[].concat((0,v.Z)(n.slice(1)),[n[0]])}))),F=O(C((function(n){return[].concat((0,v.Z)(n.slice(-1)),(0,v.Z)(n.slice(0,-1)))}))),M=O((function(n){return[].concat((0,v.Z)(n.slice(1)),[n[0]])})),N=O((function(n){return[].concat((0,v.Z)(n.slice(-1)),(0,v.Z)(n.slice(0,-1)))})),D=_(1),B=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D;return Array.from({length:n},(function(){return!1}))},R=O(C((function(n){return[].concat((0,v.Z)(n),(0,v.Z)(B()))}))),G=O(C((function(n){return n.slice(0,k(e-1))}))),X=O((function(n){return[].concat((0,v.Z)(n),(0,v.Z)(Array.from({length:D},(function(){return B(e)}))))})),H=O((function(n){return n.slice(0,k(a-1))}));return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Q(),{url:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAABzSURBVJ3BAXKCABAEsOz9/89bAXWgFqomQe0EtQka1Kkh9moT1E1dGuovdS1iMb5UtRhviTPjLXVmfCtW4y4+k1qNu3oV52ozLtT/xtdiMZ7iM7UYT3UQd3FliFUcFXFTr+JhqFWJX+pEPYydOoqdWMXRD7IJGR9tCTLHAAAAAElFTkSuQmCC",renderOverlay:function(n,e){var r=new Uint8ClampedArray(1024),o=function(n,t,e){var o=4*(16*t+n);r[o+0]=e?255:0,r[o+1]=e?255:0,r[o+2]=e?255:0};g(Z({array:l&&f?$:Y}).bitmap,o),g(Z({array:K}).bitmap,(function(n,t,e){r[4*(16*t+n)+3]=e?255:0})),g(t,(function(n,t,e){o(n+(l?4:0),t+(f?4:0),e)}));var c=new ImageData(r,16,16);e.putImageData(c,0,0)}}),(0,h.jsxs)("div",{className:q().buttons,children:[(0,h.jsx)("button",{onClick:S,children:"clear"}),(0,h.jsx)("button",{onClick:P,children:"invert"}),(0,h.jsx)("span",{className:q().buttonHeader,children:"Move"}),(0,h.jsx)("button",{onClick:E,children:"\u21e6"}),(0,h.jsx)("button",{onClick:N,children:"\u21e9"}),(0,h.jsx)("button",{onClick:M,children:"\u21e7"}),(0,h.jsx)("button",{onClick:F,children:"\u21e8"}),(0,h.jsx)("span",{className:q().buttonHeader,children:"Size"}),(0,h.jsxs)("span",{children:[e,"x",a]}),(0,h.jsx)("span",{className:q().buttonHeader,children:"Width"}),(0,h.jsxs)("button",{onClick:G,children:["-",D]}),(0,h.jsxs)("button",{onClick:R,children:["+",D]}),(0,h.jsx)("span",{className:q().buttonHeader,children:"Height"}),(0,h.jsxs)("button",{onClick:H,children:["-",D]}),(0,h.jsxs)("button",{onClick:X,children:["+",D]}),(0,h.jsx)("span",{className:q().buttonHeader,children:"Pixel scale"}),(0,h.jsx)("button",{onClick:j(.5),children:"\u21e9"}),(0,h.jsx)("button",{onClick:j(2),children:"\u21e7"})]}),(0,h.jsx)("style",{children:".".concat(q().table," { --cell-size: ").concat(30*u,"px; }")}),(0,h.jsx)("table",{className:q().table,children:(0,h.jsx)("tbody",{children:y(t).map((function(n,t){return(0,h.jsx)("tr",{className:q().row,children:n.map((function(n,e){return(0,h.jsx)("td",{className:W()(q().cell,(0,r.Z)({},q().on,n)),onMouseDown:A(e,t),onMouseEnter:w(e,t)},e)}))},t)}))})})]})};function tn(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function en(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?tn(Object(e),!0).forEach((function(t){(0,r.Z)(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):tn(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function rn(){var n=c.useReducer(L,z),t=(0,o.Z)(n,2),e=t[0],r=t[1],i=l(),s=function(n){return function(t){var e=t.target.value;r({type:n,payload:e})}},f=function(n){return function(t){r({type:n,payload:t})}};return(0,h.jsxs)(u.default,{children:[(0,h.jsxs)(a.default,{children:[(0,h.jsx)("title",{children:"Bitmap \u21d4 Code Generator"}),(0,h.jsx)("meta",{name:"description",content:"Bitmap \u21d4 Code Generator"})]}),(0,h.jsx)("h1",{children:"Bitmap \u21d4 Code Generator"}),(0,h.jsxs)("p",{children:["Suitable for use with"," ",(0,h.jsx)("a",{href:"https://github.com/GyverLibs/GyverMAX7219",children:"GyverMAX7219"})," and possibly other code that renders 8x8 bitmaps"]}),(0,h.jsxs)("label",{children:[(0,h.jsx)("h3",{children:"Name"}),(0,h.jsx)("input",{value:e.name,onChange:s("name"),className:"code"})," ",(0,h.jsx)("button",{onClick:function(){var n,t;n=e.name,t=e.array,m.has(n)&&!confirm('Replace preset "'.concat(n,'"?'))||m(n,t),i()},children:"Save"})]}),(0,h.jsx)("h3",{children:"Bitmap"}),(0,h.jsx)(nn,en(en({},e),{},{onChangeBitmap:f("bitmap"),onChangeScale:f("scale")})),(0,h.jsxs)("label",{children:[(0,h.jsx)("h3",{children:"Code format"}),(0,h.jsx)("select",{value:e.format,onChange:s("format"),children:Object.keys(A).map((function(n){return(0,h.jsx)("option",{value:n,children:n},n)}))})]}),(0,h.jsxs)("label",{children:[(0,h.jsx)("h3",{children:"Code"}),(0,h.jsx)("textarea",{value:e.code,onChange:s("code"),className:"code"})]}),(0,h.jsx)(y,{onClick:f("preset")}),(0,h.jsxs)("p",{children:["Made by ",(0,h.jsx)("a",{href:"https://github.com/cowboy",children:"cowboy"})," for"," ",(0,h.jsx)("a",{href:"https://www.theentirerobot.com/",children:"The Entire Robot"}),". Source code on"," ",(0,h.jsx)("a",{href:"https://github.com/cowboy/bitmap-code-generator",children:"GitHub"}),", patches welcome!"]})]})}},8581:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(6923)}])},9140:function(n){n.exports={table:"Bitmap_table__3Vul6",row:"Bitmap_row__3Pbov",cell:"Bitmap_cell__3vlDp",on:"Bitmap_on__1ZaZr",buttons:"Bitmap_buttons__2lr4z",buttonHeader:"Bitmap_buttonHeader__3kLPp"}},5918:function(n){n.exports={deletePreset:"Presets_deletePreset__2lR_m"}}},function(n){n.O(0,[774,980,888,179],(function(){return t=8581,n(n.s=t);var t}));var t=n.O();_N_E=t}]);