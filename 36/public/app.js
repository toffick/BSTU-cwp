!function(e){function t(t){for(var o,u,a=t[0],l=t[1],f=t[2],s=0,p=[];s<a.length;s++)u=a[s],r[u]&&p.push(r[u][0]),r[u]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);for(c&&c(t);p.length;)p.shift()();return i.push.apply(i,f||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var l=n[a];0!==r[l]&&(o=!1)}o&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},r={1:0},i=[];function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},u.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p=".";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var f=0;f<a.length;f++)t(a[f]);var c=l;i.push([436,0]),n()}({104:function(e,t,n){var o=n(406)("keys"),r=n(404);e.exports=function(e){return o[e]||(o[e]=r(e))}},105:function(e,t,n){var o=n(417),r=n(154);e.exports=function(e){return o(r(e))}},106:function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},107:function(e,t,n){var o=n(74),r=n(158),i=n(156),u=Object.defineProperty;t.f=n(53)?Object.defineProperty:function(e,t,n){if(o(e),t=i(t,!0),o(n),r)try{return u(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},11:function(e,t,n){e.exports={default:n(426),__esModule:!0}},144:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=f(n(11)),r=f(n(23)),i=f(n(22)),u=f(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=f(n(12));function f(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).call(this,e));return n._save=n._save.bind(n),n._onChange=n._onChange.bind(n),n._onKeyDown=n._onKeyDown.bind(n),n.state={text:n.props.text?n.props.text:""},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.PureComponent),a(t,[{key:"render",value:function(){return l.default.createElement("input",{className:this.props.className,placeholder:this.props.placeholder,value:this.state.text,onChange:this._onChange,onKeyDown:this._onKeyDown})}},{key:"_save",value:function(){this.props.onSave(this.state.text),this.setState({text:""})}},{key:"_onChange",value:function(e){this.setState({text:e.target.value})}},{key:"_onKeyDown",value:function(e){13===e.keyCode&&this._save()}}]),t}();t.default=c},151:function(e,t,n){var o=n(154);e.exports=function(e){return Object(o(e))}},152:function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},153:function(e,t){var n=Math.ceil,o=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?o:n)(e)}},154:function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},155:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},156:function(e,t,n){var o=n(73);e.exports=function(e,t){if(!o(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!o(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!o(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!o(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},157:function(e,t,n){var o=n(73),r=n(75).document,i=o(r)&&o(r.createElement);e.exports=function(e){return i?r.createElement(e):{}}},158:function(e,t,n){e.exports=!n(53)&&!n(106)(function(){return 7!=Object.defineProperty(n(157)("div"),"a",{get:function(){return 7}}).a})},159:function(e,t,n){var o=n(424);e.exports=function(e,t,n){if(o(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,o){return e.call(t,n,o)};case 3:return function(n,o,r){return e.call(t,n,o,r)}}return function(){return e.apply(t,arguments)}}},165:function(e,t){},21:function(e,t,n){e.exports={default:n(402),__esModule:!0}},22:function(e,t,n){e.exports={default:n(415),__esModule:!0}},23:function(e,t,n){e.exports={default:n(422),__esModule:!0}},367:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r=n(11),i=(o=r)&&o.__esModule?o:{default:o},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0,i.default)(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.links=[{title:"All"},{title:"Active"},{title:"Completed"}],this.active=this.links[0]}return u(e,[{key:"getLinks",value:function(){return this.links}},{key:"getActive",value:function(){return this.active}},{key:"setActive",value:function(e){this.active=e}}]),e}();t.default=a},368:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r=n(11),i=(o=r)&&o.__esModule?o:{default:o},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0,i.default)(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.closeTimeout=5e3,this.notifications=[]}return u(e,[{key:"getNotifications",value:function(){return this.notifications}},{key:"push",value:function(e,t,n){var o=this,r=setTimeout(function(){o.notifications=o.notifications.filter(function(t){return t.task.id!==e.id}),n()},this.closeTimeout);this.notifications.push({task:e,timerId:r,error:t})}}]),e}();t.default=a},369:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=f(n(11)),r=f(n(23)),i=f(n(22)),u=f(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=f(n(12));function f(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.PureComponent),a(t,[{key:"render",value:function(){var e=this.props.notification,t=e.task;return e.error?l.default.createElement("div",{className:"notification_item reject_add"},"The task ",t.id,"(",t.text.slice(0,10),"...) was not added to the task list"):l.default.createElement("div",{className:"notification_item success_add"},"The task ",t.id,"(",t.text.slice(0,10),"...) was successfully added to the list")}}]),t}();t.default=c},370:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=c(n(11)),r=c(n(23)),i=c(n(22)),u=c(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=c(n(12)),f=c(n(369));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.Component),a(t,[{key:"render",value:function(){return l.default.createElement("div",{className:"notifications_container"},this.props.notifications.map(function(e){return l.default.createElement(f.default,{notification:e})}))}}]),t}();t.default=s},371:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=f(n(11)),r=f(n(23)),i=f(n(22)),u=f(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=f(n(12));function f(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.PureComponent),a(t,[{key:"render",value:function(){return l.default.createElement("div",{className:"todo__clear",onClick:this.props.removeCompleted},"Clear")}}]),t}();t.default=c},372:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=c(n(11)),r=c(n(23)),i=c(n(22)),u=c(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=c(n(12)),f=c(n(144));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).call(this,e));return n._save=n._save.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.PureComponent),a(t,[{key:"render",value:function(){return l.default.createElement("div",{className:"todo__form"},l.default.createElement(f.default,{className:"todo__text-input",placeholder:"I need to do...",onSave:this._save}))}},{key:"_save",value:function(e){this.props.addItem(e)}}]),t}();t.default=s},373:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=f(n(11)),r=f(n(23)),i=f(n(22)),u=f(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=f(n(12));function f(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.PureComponent),a(t,[{key:"render",value:function(){return l.default.createElement("div",{className:"popup"},l.default.createElement("div",{className:"popup_inner"},l.default.createElement("h1",null,this.props.text),l.default.createElement("button",{onClick:this.props.complete},"Yes"),l.default.createElement("button",{onClick:this.props.closePopup},"No")))}}]),t}();t.default=c},374:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s(n(11)),r=s(n(23)),i=s(n(22)),u=s(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=s(n(12)),f=s(n(144)),c=s(n(373));function s(e){return e&&e.__esModule?e:{default:e}}var p=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).call(this,e));return n._edit=n._edit.bind(n),n._save=n._save.bind(n),n._toggleItem=n._toggleItem.bind(n),n._removeItem=n._removeItem.bind(n),n._togglePopup=n._togglePopup.bind(n),n.state={isEditing:!1,popup:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.Component),a(t,[{key:"render",value:function(){var e=this.state.isEditing?l.default.createElement(f.default,{className:"todo__text todo__text_editing",text:this.props.task.text,onSave:this._save}):l.default.createElement("span",{className:"todo__text"+(this.props.task.completed?" todo__text_completed":""),onDoubleClick:this._edit},this.props.task.text);return l.default.createElement("div",{className:"todo__item"},l.default.createElement("input",{type:"checkbox",className:"todo__checkbox",checked:this.props.task.completed,onChange:this._toggleItem}),l.default.createElement("span",{className:"todo__destroy",onClick:this._togglePopup},"-")," ",e,this.state.popup?l.default.createElement(c.default,{text:"Do you sure?",complete:this._removeItem,closePopup:this._togglePopup}):null)}},{key:"_edit",value:function(){this.setState({isEditing:!0})}},{key:"_save",value:function(e){this.setState({isEditing:!1}),this.props.updateItem(this.props.task.id,e)}},{key:"_toggleItem",value:function(){this.props.toggleItem(this.props.task.id)}},{key:"_removeItem",value:function(){this.props.removeItem(this.props.task.id)}},{key:"_togglePopup",value:function(){this.setState({popup:!this.state.popup})}}]),t}();t.default=p},375:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=c(n(11)),r=c(n(23)),i=c(n(22)),u=c(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=c(n(12)),f=c(n(374));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.Component),a(t,[{key:"render",value:function(){var e=this,t=this.props.tasks.map(function(t){return l.default.createElement(f.default,{key:t.id,task:t,toggleItem:e.props.toggleItem,removeItem:e.props.removeItem,updateItem:e.props.updateItem})});return l.default.createElement("div",{className:"todo__list"},l.default.createElement("div",{className:"todo__toggle-all"},l.default.createElement("input",{type:"checkbox",className:"todo__checkbox",checked:this.props.areAllComplete,onChange:this.props.toggleAll})," ","Complete all"),t)}}]),t}();t.default=s},376:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=f(n(11)),r=f(n(23)),i=f(n(22)),u=f(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=f(n(12));function f(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.PureComponent),a(t,[{key:"render",value:function(){return l.default.createElement("div",{className:"todo-info"},l.default.createElement("span",{className:"todo-info__remains"},this.props.remains," remains")," ",l.default.createElement("span",{className:"todo-info__completed"},"/ ",this.props.completed," completed"))}}]),t}();t.default=c},377:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=f(n(11)),r=f(n(23)),i=f(n(22)),u=f(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=f(n(12));function f(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).call(this,e));return n._navigate=n._navigate.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.PureComponent),a(t,[{key:"render",value:function(){return l.default.createElement("div",{className:"nav__item"+(this.props.isActive?" nav__item_active":""),onClick:this._navigate},this.props.link.title)}},{key:"_navigate",value:function(){this.props.navigate(this.props.link)}}]),t}();t.default=c},378:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=c(n(11)),r=c(n(23)),i=c(n(22)),u=c(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=c(n(12)),f=c(n(377));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.PureComponent),a(t,[{key:"render",value:function(){var e=this,t=this.props.links.map(function(t){return l.default.createElement(f.default,{key:t.title,link:t,navigate:e.props.navigate,isActive:t.title===e.props.activeLink.title})});return l.default.createElement("div",{className:"nav"},t)}}]),t}();t.default=s},379:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r=n(11),i=(o=r)&&o.__esModule?o:{default:o},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0,i.default)(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.list=[]}return u(e,[{key:"getItems",value:function(){return this.list}},{key:"getActiveItems",value:function(){return this.list.filter(function(e){return!e.completed})}},{key:"getCompletedItems",value:function(){return this.list.filter(function(e){return e.completed})}},{key:"getActiveCount",value:function(){return this.list.filter(function(e){return!e.completed}).length}},{key:"getCompletedCount",value:function(){return this.list.filter(function(e){return e.completed}).length}},{key:"addItem",value:function(e){var t={id:Date.now()+this.list.length,text:e,completed:!1};return this.list.push(t),t}},{key:"removeItem",value:function(e){var t=this.list.findIndex(function(t){return t.id===e});this.list.splice(t,1)}},{key:"removeCompleted",value:function(){this.list=this.getActiveItems()}},{key:"updateItem",value:function(e,t){var n=this.list.findIndex(function(t){return t.id===e});this.list[n].text=t}},{key:"toggleItem",value:function(e){var t=this.list.findIndex(function(t){return t.id===e});this.list[t].completed=!this.list[t].completed}},{key:"switchAllTo",value:function(e){this.list.forEach(function(t){return t.completed=e})}}]),e}();t.default=a},399:function(e,t,n){var o=n(76),r=n(48),i=n(106);e.exports=function(e,t){var n=(r.Object||{})[e]||Object[e],u={};u[e]=t(n),o(o.S+o.F*i(function(){n(1)}),"Object",u)}},400:function(e,t,n){var o=n(72),r=n(151),i=n(104)("IE_PROTO"),u=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=r(e),o(e,i)?e[i]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?u:null}},401:function(e,t,n){var o=n(151),r=n(400);n(399)("getPrototypeOf",function(){return function(e){return r(o(e))}})},402:function(e,t,n){n(401),e.exports=n(48).Object.getPrototypeOf},403:function(e,t,n){var o=n(75).document;e.exports=o&&o.documentElement},404:function(e,t){var n=0,o=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+o).toString(36))}},405:function(e,t){e.exports=!0},406:function(e,t,n){var o=n(48),r=n(75),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(e.exports=function(e,t){return i[e]||(i[e]=void 0!==t?t:{})})("versions",[]).push({version:o.version,mode:n(405)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},407:function(e,t,n){var o=n(153),r=Math.max,i=Math.min;e.exports=function(e,t){return(e=o(e))<0?r(e+t,0):i(e,t)}},408:function(e,t,n){var o=n(153),r=Math.min;e.exports=function(e){return e>0?r(o(e),9007199254740991):0}},409:function(e,t,n){var o=n(105),r=n(408),i=n(407);e.exports=function(e){return function(t,n,u){var a,l=o(t),f=r(l.length),c=i(u,f);if(e&&n!=n){for(;f>c;)if((a=l[c++])!=a)return!0}else for(;f>c;c++)if((e||c in l)&&l[c]===n)return e||c||0;return!e&&-1}}},410:function(e,t,n){var o=n(72),r=n(105),i=n(409)(!1),u=n(104)("IE_PROTO");e.exports=function(e,t){var n,a=r(e),l=0,f=[];for(n in a)n!=u&&o(a,n)&&f.push(n);for(;t.length>l;)o(a,n=t[l++])&&(~i(f,n)||f.push(n));return f}},411:function(e,t,n){var o=n(410),r=n(152);e.exports=Object.keys||function(e){return o(e,r)}},412:function(e,t,n){var o=n(107),r=n(74),i=n(411);e.exports=n(53)?Object.defineProperties:function(e,t){r(e);for(var n,u=i(t),a=u.length,l=0;a>l;)o.f(e,n=u[l++],t[n]);return e}},413:function(e,t,n){var o=n(74),r=n(412),i=n(152),u=n(104)("IE_PROTO"),a=function(){},l=function(){var e,t=n(157)("iframe"),o=i.length;for(t.style.display="none",n(403).appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),l=e.F;o--;)delete l.prototype[i[o]];return l()};e.exports=Object.create||function(e,t){var n;return null!==e?(a.prototype=o(e),n=new a,a.prototype=null,n[u]=e):n=l(),void 0===t?n:r(n,t)}},414:function(e,t,n){var o=n(76);o(o.S,"Object",{create:n(413)})},415:function(e,t,n){n(414);var o=n(48).Object;e.exports=function(e,t){return o.create(e,t)}},416:function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},417:function(e,t,n){var o=n(416);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==o(e)?e.split(""):Object(e)}},418:function(e,t){t.f={}.propertyIsEnumerable},419:function(e,t,n){var o=n(418),r=n(155),i=n(105),u=n(156),a=n(72),l=n(158),f=Object.getOwnPropertyDescriptor;t.f=n(53)?f:function(e,t){if(e=i(e),t=u(t,!0),l)try{return f(e,t)}catch(e){}if(a(e,t))return r(!o.f.call(e,t),e[t])}},420:function(e,t,n){var o=n(73),r=n(74),i=function(e,t){if(r(e),!o(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,o){try{(o=n(159)(Function.call,n(419).f(Object.prototype,"__proto__").set,2))(e,[]),t=!(e instanceof Array)}catch(e){t=!0}return function(e,n){return i(e,n),t?e.__proto__=n:o(e,n),e}}({},!1):void 0),check:i}},421:function(e,t,n){var o=n(76);o(o.S,"Object",{setPrototypeOf:n(420).set})},422:function(e,t,n){n(421),e.exports=n(48).Object.setPrototypeOf},423:function(e,t,n){var o=n(107),r=n(155);e.exports=n(53)?function(e,t,n){return o.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}},424:function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},425:function(e,t,n){var o=n(76);o(o.S+o.F*!n(53),"Object",{defineProperty:n(107).f})},426:function(e,t,n){n(425);var o=n(48).Object;e.exports=function(e,t,n){return o.defineProperty(e,t,n)}},427:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=b(n(11)),r=b(n(23)),i=b(n(22)),u=b(n(21)),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o.default)(e,r.key,r)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=b(n(12)),f=b(n(150)),c=b(n(379)),s=b(n(378)),p=b(n(376)),d=b(n(375)),v=b(n(372)),h=b(n(371)),_=b(n(370)),m=b(n(368)),y=b(n(367));function b(e){return e&&e.__esModule?e:{default:e}}var g=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||(0,u.default)(t)).call(this,e));return n._rerender=n._rerender.bind(n),n._toggleItem=n._toggleItem.bind(n),n._toogleAll=n._toogleAll.bind(n),n._removeItem=n._removeItem.bind(n),n._addItem=n._addItem.bind(n),n._updateItem=n._updateItem.bind(n),n._removeCompleted=n._removeCompleted.bind(n),n._navigate=n._navigate.bind(n),n.todoModel=new c.default,n.navModel=new y.default,n.notificationModel=new m.default,n.state={activeLink:{title:"All"},areAllCompleted:!0,completed:0,links:[],remains:0,tasks:[],notifications:[]},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=(0,i.default)(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(r.default?(0,r.default)(e,t):e.__proto__=t)}(t,l.default.Component),a(t,[{key:"componentWillMount",value:function(){var e=this;f.default.get("/tasks").then(function(t){var n=t.data;e.todoModel.list=n,e._rerender()})}},{key:"render",value:function(){return l.default.createElement("div",{className:"global"},l.default.createElement("div",{className:"todo"},l.default.createElement("div",{className:"todo__title"},"React ToDo"),l.default.createElement(s.default,{links:this.state.links,activeLink:this.state.activeLink,navigate:this._navigate}),l.default.createElement(p.default,{remains:this.state.remains,completed:this.state.completed}),l.default.createElement(d.default,{tasks:this.state.tasks,areAllComplete:this.state.areAllCompleted,toggleItem:this._toggleItem,toggleAll:this._toogleAll,removeItem:this._removeItem,updateItem:this._updateItem}),l.default.createElement(v.default,{addItem:this._addItem}),l.default.createElement(h.default,{removeCompleted:this._removeCompleted})),l.default.createElement("div",{className:"notifications"},l.default.createElement(_.default,{notifications:this.state.notifications})))}},{key:"_getState",value:function(){var e={remains:this.todoModel.getActiveCount(),completed:this.todoModel.getCompletedCount(),links:this.navModel.getLinks(),activeLink:this.navModel.getActive()};return e.areAllCompleted=0===e.remains,"All"===e.activeLink.title?e.tasks=this.todoModel.getItems():"Completed"===e.activeLink.title?e.tasks=this.todoModel.getCompletedItems():e.tasks=this.todoModel.getActiveItems(),e.notifications=this.notificationModel.getNotifications(),e}},{key:"_rerender",value:function(){this.setState(this._getState())}},{key:"_toggleItem",value:function(e){var t=this;f.default.post("/toggle-item",{id:e}).then(function(){t.todoModel.toggleItem(e),t._rerender()})}},{key:"_toogleAll",value:function(){var e=this;f.default.post("/toggle-all",{areAllCompleted:!this.state.areAllCompleted}).then(function(){e.todoModel.switchAllTo(!e.state.areAllCompleted),e._rerender()})}},{key:"_removeItem",value:function(e){var t=this;f.default.delete("/tasks/"+e).then(function(){t.todoModel.removeItem(e),t._rerender()})}},{key:"_addItem",value:function(e){var t=this,n=this.todoModel.addItem(e);this._rerender(),f.default.post("/tasks",{task:n}).then(function(e){var o=e.data;o.error&&t.todoModel.removeItem(o.id),t.notificationModel.push(n,o.error,function(){t._rerender()}),t._rerender()})}},{key:"_updateItem",value:function(e,t){var n=this;f.default.put("/tasks/"+e,{text:t}).then(function(){n.todoModel.updateItem(e,t),n._rerender()})}},{key:"_removeCompleted",value:function(){var e=this;f.default.post("/clear",{}).then(function(){e.todoModel.removeCompleted(),e._rerender()})}},{key:"_navigate",value:function(e){this.navModel.setActive(e),this._rerender()}}]),t}();t.default=g},436:function(e,t,n){"use strict";var o=u(n(12)),r=u(n(160)),i=u(n(427));function u(e){return e&&e.__esModule?e:{default:e}}n(143),n(165),r.default.render(o.default.createElement(i.default,null),document.getElementById("app"))},48:function(e,t){var n=e.exports={version:"2.5.6"};"number"==typeof __e&&(__e=n)},53:function(e,t,n){e.exports=!n(106)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},72:function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},73:function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},74:function(e,t,n){var o=n(73);e.exports=function(e){if(!o(e))throw TypeError(e+" is not an object!");return e}},75:function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},76:function(e,t,n){var o=n(75),r=n(48),i=n(159),u=n(423),a=n(72),l=function(e,t,n){var f,c,s,p=e&l.F,d=e&l.G,v=e&l.S,h=e&l.P,_=e&l.B,m=e&l.W,y=d?r:r[t]||(r[t]={}),b=y.prototype,g=d?o:v?o[t]:(o[t]||{}).prototype;for(f in d&&(n=t),n)(c=!p&&g&&void 0!==g[f])&&a(y,f)||(s=c?g[f]:n[f],y[f]=d&&"function"!=typeof g[f]?n[f]:_&&c?i(s,o):m&&g[f]==s?function(e){var t=function(t,n,o){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,o)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(s):h&&"function"==typeof s?i(Function.call,s):s,h&&((y.virtual||(y.virtual={}))[f]=s,e&l.R&&b&&!b[f]&&u(b,f,s)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,e.exports=l}});