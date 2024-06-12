(function(){"use strict";var t={7037:function(t,e,s){var a=s(2856),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("WorkCalendar")],1)},r=[],i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"edge"},[e("div",{staticClass:"wrap"},[e("div",{staticClass:"calendar",attrs:{tabindex:"0"},on:{keydown:t.handleKeydown}},[t._m(0),e("div",{staticClass:"legend"},[t._l(t.types,(function(s,a){return e("div",{key:a,staticClass:"legend-item",class:s},[e("label",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedStatus,expression:"selectedStatus"}],attrs:{type:"radio"},domProps:{value:s,checked:t._q(t.selectedStatus,s)},on:{change:function(e){t.selectedStatus=s}}}),e("span",{staticClass:"box",class:s==t.selectedStatus?"checked":""}),t._v(" "+t._s(s)+"["+t._s(a+1)+"] ")])])})),e("button",{on:{click:t.goToToday}},[t._v("回到今天")])],2),e("div",{staticClass:"months"},t._l([0,1],(function(s,a){return e("div",{key:a,staticClass:"month"},[e("div",{staticClass:"month-header"},[e("button",{on:{click:function(e){return t.changeMonth(0===s?-1:1)}}},[t._v("<")]),e("span",[t._v(t._s(t.monthNames[(t.currentDate.getMonth()+s)%12])+" "+t._s(t.currentYear))]),e("button",{on:{click:function(e){return t.changeMonth(0===s?-1:1)}}},[t._v(">")])]),e("div",{staticClass:"weekdays"},t._l(t.weekdays,(function(s){return e("div",{key:s},[t._v(t._s(s))])})),0),e("div",{staticClass:"days"},t._l(t.paddedDaysInMonth(t.currentDate.getMonth()+s),(function(s,a){return e("div",{key:a,class:t.dayClass(s),on:{click:function(e){return t.updateDayStatus(s)},mouseenter:function(e){return t.setHoveredDay(s)}}},[e("span",{staticClass:"txt"},[t._v(t._s(s?s.getUTCDate():""))]),s&&t.holidays[t.getDateString(s)]?e("sup",{staticClass:"holiday-name"},[t._v(" "+t._s(t.holidays[t.getDateString(s)])+" ")]):t._e()])})),0)])})),0)]),e("div",{staticClass:"sider"},[e("div",{staticClass:"controls"},[e("button",{on:{click:t.clearWorkStatus}},[t._v("清除状态")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.saveName,expression:"saveName"}],attrs:{placeholder:"保存名称"},domProps:{value:t.saveName},on:{input:function(e){e.target.composing||(t.saveName=e.target.value)}}}),e("button",{on:{click:t.saveWorkStatus}},[t._v("保存状态")])]),e("div",{staticClass:"saved-status"},[e("h3",[t._v("已保存的工作计划")]),e("ul",t._l(t.savedStatuses,(function(s,a){return e("li",{key:a},[e("span",{staticClass:"name",on:{click:function(e){return t.loadWorkStatus(a)}}},[t._v(t._s(a))]),e("button",{on:{click:function(e){return t.deleteWorkStatus(a)}}},[t._v("删除")]),e("button",{on:{click:function(e){return t.renameWorkStatus(a)}}},[t._v("重命名")]),e("button",{on:{click:function(e){return t.updateSavedWorkStatus(a)}}},[t._v("更新")])])})),0)])])]),e("UserGuide")],1)},o=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"tips"},[t._v(" 按序号对应的数字键快速选择类别，并设置鼠标最后悬停日期状态 "),e("br"),t._v(" 按 shift + 序号快速设置本周类别，并快速设置类别 ")])}],u=(s(4114),function(){var t=this;t._self._c;return t._m(0)}),l=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"user-guide"},[e("h2",[t._v("使用方法")]),e("ol",[e("li",[e("strong",[t._v("选择工作状态")]),t._v("： "),e("ul",[e("li",[t._v("从图例中选择 "),e("span",{staticClass:"status-box office"},[t._v("公司")]),t._v("、"),e("span",{staticClass:"status-box home"},[t._v("居家")]),t._v("、"),e("span",{staticClass:"status-box rest"},[t._v("休假")]),t._v(" 或 "),e("span",{staticClass:"status-box clear"},[t._v("清除")]),t._v("。 ")]),e("li",[t._v("对应的选项将显示为带有不同背景色的方框："),e("span",{staticClass:"status-box office"},[t._v("公司")]),t._v("（浅蓝色）、"),e("span",{staticClass:"status-box home"},[t._v("居家")]),t._v("（浅黄色）、"),e("span",{staticClass:"status-box rest"},[t._v("休假")]),t._v("（浅绿色）、"),e("span",{staticClass:"status-box clear"},[t._v("清除")]),t._v("（白色）。 ")])])]),e("li",[e("strong",[t._v("更新每日状态")]),t._v("： "),e("ul",[e("li",[t._v("点击任意日期以应用选定的状态。")])])]),e("li",[e("strong",[t._v("更新每周状态")]),t._v("： "),e("ul",[e("li",[t._v("将鼠标悬停在任意日期上，然后按以下按键：")]),e("li",[t._v("按 "),e("kbd",[t._v("1")]),t._v("：将整周状态设置为 "),e("span",{staticClass:"status-box office"},[t._v("公司")]),t._v("。")]),e("li",[t._v("按 "),e("kbd",[t._v("2")]),t._v("：将整周状态设置为 "),e("span",{staticClass:"status-box home"},[t._v("居家")]),t._v("。")]),e("li",[t._v("按 "),e("kbd",[t._v("3")]),t._v("：将整周状态设置为 "),e("span",{staticClass:"status-box clear"},[t._v("清除")]),t._v("。")]),e("li",[t._v("按 "),e("kbd",[t._v("4")]),t._v("：将整周状态设置为 "),e("span",{staticClass:"status-box rest"},[t._v("休假")]),t._v("。")])])]),e("li",[e("strong",[t._v("浏览月份")]),t._v("： "),e("ul",[e("li",[t._v("点击月份旁边的左右箭头按钮以浏览各个月份。")])])]),e("li",[e("strong",[t._v("清除状态")]),t._v("： "),e("ul",[e("li",[t._v("点击“清除状态”按钮以清除当前日历中的所有工作状态。")]),e("li",[t._v("清除操作将同时删除本地存储中的日历状态数据。")])])]),e("li",[e("strong",[t._v("保存状态")]),t._v("： "),e("ul",[e("li",[t._v("在输入框中输入保存名称，点击“保存状态”按钮以保存当前设置的日历状态。")]),e("li",[t._v("保存后的状态将显示在“已保存的工作计划”列表中。")])])]),e("li",[e("strong",[t._v("加载已保存的状态")]),t._v("： "),e("ul",[e("li",[t._v("点击“已保存的工作计划”列表中的某个名称，以加载并应用保存的日历状态。")])])]),e("li",[e("strong",[t._v("更新已保存的状态")]),t._v("： "),e("ul",[e("li",[t._v("点击某个已保存状态旁边的“更新”按钮，将当前修改的日历状态更新到相应的保存项。")])])]),e("li",[e("strong",[t._v("删除已保存的状态")]),t._v("： "),e("ul",[e("li",[t._v("点击“已保存的工作计划”列表中的“删除”按钮以删除对应的保存项。")])])]),e("li",[e("strong",[t._v("重命名已保存的状态")]),t._v("： "),e("ul",[e("li",[t._v("点击“已保存的工作计划”列表中的“重命名”按钮，以重命名对应的保存项。")])])]),e("li",[e("strong",[t._v("注意事项")]),t._v("： "),e("ul",[e("li",[t._v("保存和更新操作将清除当前日历视图。")]),e("li",[t._v("周视图的设置范围为周一到周日。")])])])]),e("h3",[t._v("功能描述")]),e("ul",[e("li",[e("strong",[t._v("选择工作状态")]),t._v("：选择并设置某一天的工作状态，方便直观的状态管理。 ")]),e("li",[e("strong",[t._v("周视图快捷键")]),t._v("：通过快捷键快速设置一周的工作状态，提高效率。 ")]),e("li",[e("strong",[t._v("状态保存与加载")]),t._v("：支持将不同的日历设置保存为模板，并随时加载，方便不同场景切换。 ")]),e("li",[e("strong",[t._v("本地存储")]),t._v("：所有设置都保存在浏览器的本地存储中，确保刷新或关闭页面后数据不丢失。 ")])])])}],c={name:"UserGuide"},v=c,d=s(1656),h=(0,d.A)(v,u,l,!1,null,null,null),_=h.exports;const f={"2024-01-01":"元旦","2024-02-04":"春节","2024-04-05":"清明节","2024-05-01":"劳动节","2024-05-02":" ","2024-05-03":" ","2024-05-04":" ","2024-05-05":" ","2024-06-08":" ","2024-06-09":" ","2024-06-10":"端午","2024-09-13":"中秋节","2024-10-01":"国庆节"};var S={name:"WorkCalendar",components:{UserGuide:_},data(){return{currentDate:new Date,monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],weekdays:["一","二","三","四","五","六","日"],workStatus:JSON.parse(localStorage.getItem("workStatus"))||{},selectedStatus:"office",hoveredDay:null,saveName:"",savedStatuses:JSON.parse(localStorage.getItem("savedStatuses"))||{},types:["office","home","rest","clear"],holidays:f}},computed:{currentYear(){return this.currentDate.getFullYear()}},mounted(){window.addEventListener("keydown",this.handleKeydown)},beforeDestroy(){window.removeEventListener("keydown",this.handleKeydown)},methods:{getDateString(t){return t.toISOString().split("T")[0]},changeMonth(t){this.currentDate.setMonth(this.currentDate.getMonth()+t),this.currentDate=new Date(this.currentDate)},dayClass(t){if(!t)return"no-status";const e=this.getDateString(t),s=[];if("office"===this.workStatus[e])s.push("office");else if("home"===this.workStatus[e])s.push("home");else if("rest"===this.workStatus[e])s.push("rest");else{const a=t.getDay();0===a||6===a?(this.workStatus[e]="rest",s.push("rest")):s.push("no-status")}f[e]&&s.push("holiday");const a=new Date,n=t.getDate()===a.getDate()&&t.getMonth()===a.getMonth()&&t.getFullYear()===a.getFullYear();return n&&s.push("today"),s.join(" ")},updateDayStatus(t){if(!t)return;const e=this.getDateString(t);"office"===this.selectedStatus?this.$set(this.workStatus,e,"office"):"home"===this.selectedStatus?this.$set(this.workStatus,e,"home"):"rest"===this.selectedStatus?this.$set(this.workStatus,e,"rest"):this.$set(this.workStatus,e,null),localStorage.setItem("workStatus",JSON.stringify(this.workStatus))},clearWorkStatus(){this.workStatus={},localStorage.removeItem("workStatus")},saveWorkStatus(){this.saveName&&(Object.keys(this.savedStatuses).length>=5?alert("保存的工作计划数量已达到上限（5个）。"):(this.$set(this.savedStatuses,this.saveName,JSON.parse(JSON.stringify(this.workStatus))),localStorage.setItem("savedStatuses",JSON.stringify(this.savedStatuses)),this.clearWorkStatus()))},loadWorkStatus(t){this.workStatus=JSON.parse(JSON.stringify(this.savedStatuses[t])),localStorage.setItem("workStatus",JSON.stringify(this.workStatus))},deleteWorkStatus(t){this.$delete(this.savedStatuses,t),localStorage.setItem("savedStatuses",JSON.stringify(this.savedStatuses))},renameWorkStatus(t){const e=prompt("输入新的名称:",t);e&&e!==t&&(this.$set(this.savedStatuses,e,this.savedStatuses[t]),this.$delete(this.savedStatuses,t),localStorage.setItem("savedStatuses",JSON.stringify(this.savedStatuses)))},updateSavedWorkStatus(t){this.$set(this.savedStatuses,t,JSON.parse(JSON.stringify(this.workStatus))),localStorage.setItem("savedStatuses",JSON.stringify(this.savedStatuses)),this.clearWorkStatus()},daysInMonth(t){const e=this.currentYear,s=new Date(e,t,1),a=[];while(s.getMonth()===t)a.push(new Date(s)),s.setDate(s.getDate()+1);return a},paddedDaysInMonth(t){const e=this.daysInMonth(t),s=(e[0].getDay()+6)%7,a=Array(s).fill(null);if(a.length>0){const s=this.daysInMonth(t-1).slice(-a.length);return s.concat(e)}return a.concat(e)},setHoveredDay(t){this.hoveredDay=t},handleKeydown(t){if(this.hoveredDay)if(t.shiftKey){switch(t.key){case"!":this.selectedStatus="office";break;case"@":this.selectedStatus="home";break;case"#":this.selectedStatus="rest";break;case"$":this.selectedStatus=null;break;default:return}this.updateWeekStatus(this.hoveredDay,this.selectedStatus)}else{switch(t.key){case"1":this.selectedStatus="office";break;case"2":this.selectedStatus="home";break;case"3":this.selectedStatus="rest";break;case"4":this.selectedStatus=null;break;default:return}this.updateDayStatus(this.hoveredDay,this.selectedStatus)}},updateWeekStatus(t,e){const s=new Date(t);s.setDate(t.getDate()-(t.getDay()+6)%7);for(let a=0;a<7;a++){const t=new Date(s);t.setDate(s.getDate()+a);const n=this.getDateString(t);this.$set(this.workStatus,n,e)}localStorage.setItem("workStatus",JSON.stringify(this.workStatus))},goToToday(){this.currentDate=new Date}}},g=S,p=(0,d.A)(g,i,o,!1,null,"26b0ac32",null),k=p.exports,y={name:"App",components:{WorkCalendar:k},data(){return{}},methods:{}},m=y,w=(0,d.A)(m,n,r,!1,null,null,null),b=w.exports;a.Ay.config.productionTip=!1,new a.Ay({render:t=>t(b)}).$mount("#app")}},e={};function s(a){var n=e[a];if(void 0!==n)return n.exports;var r=e[a]={exports:{}};return t[a].call(r.exports,r,r.exports,s),r.exports}s.m=t,function(){var t=[];s.O=function(e,a,n,r){if(!a){var i=1/0;for(c=0;c<t.length;c++){a=t[c][0],n=t[c][1],r=t[c][2];for(var o=!0,u=0;u<a.length;u++)(!1&r||i>=r)&&Object.keys(s.O).every((function(t){return s.O[t](a[u])}))?a.splice(u--,1):(o=!1,r<i&&(i=r));if(o){t.splice(c--,1);var l=n();void 0!==l&&(e=l)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[a,n,r]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var a in e)s.o(e,a)&&!s.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};s.O.j=function(e){return 0===t[e]};var e=function(e,a){var n,r,i=a[0],o=a[1],u=a[2],l=0;if(i.some((function(e){return 0!==t[e]}))){for(n in o)s.o(o,n)&&(s.m[n]=o[n]);if(u)var c=u(s)}for(e&&e(a);l<i.length;l++)r=i[l],s.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return s.O(c)},a=self["webpackChunk"]=self["webpackChunk"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=s.O(void 0,[504],(function(){return s(7037)}));a=s.O(a)})();
//# sourceMappingURL=app.002d2843.js.map