(function(e){function t(t){for(var r,s,a=t[0],c=t[1],u=t[2],l=0,d=[];l<a.length;l++)s=a[l],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&d.push(o[s][0]),o[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var a=n[s];0!==o[a]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},s={app:0},o={app:0},i=[];function a(e){return c.p+"static/js/"+({}[e]||e)+"."+{"chunk-2d0aa19b":"38da97b0","chunk-2d0c8a24":"348124ac","chunk-2d0d83ad":"d1c38bab","chunk-2d2244e1":"b03539be","chunk-47f3abd0":"0d179f11","chunk-5ecd4b0f":"2091c503","chunk-63876174":"c64ddaea","chunk-6f24463f":"31f8047c","chunk-7c487754":"e4c64ec3","chunk-7c9133cc":"dd826c3a"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-47f3abd0":1,"chunk-5ecd4b0f":1,"chunk-63876174":1,"chunk-6f24463f":1,"chunk-7c487754":1,"chunk-7c9133cc":1};s[e]?t.push(s[e]):0!==s[e]&&n[e]&&t.push(s[e]=new Promise((function(t,n){for(var r="static/css/"+({}[e]||e)+"."+{"chunk-2d0aa19b":"31d6cfe0","chunk-2d0c8a24":"31d6cfe0","chunk-2d0d83ad":"31d6cfe0","chunk-2d2244e1":"31d6cfe0","chunk-47f3abd0":"675f6d76","chunk-5ecd4b0f":"0887b6d0","chunk-63876174":"ae6dddbc","chunk-6f24463f":"c5587fd4","chunk-7c487754":"4cf76741","chunk-7c9133cc":"1d8a8071"}[e]+".css",o=c.p+r,i=document.getElementsByTagName("link"),a=0;a<i.length;a++){var u=i[a],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===o))return t()}var d=document.getElementsByTagName("style");for(a=0;a<d.length;a++){u=d[a],l=u.getAttribute("data-href");if(l===r||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete s[e],f.parentNode.removeChild(f),n(i)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){s[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=a(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+s+")",d.name="ChunkLoadError",d.type=r,d.request=s,n[1](d)}o[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"3b2f":function(e,t,n){},"4af4":function(e,t,n){"use strict";n("3b2f")},5666:function(e,t,n){"use strict";n("e61b")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r,s,o,i=n("a026"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"nav_left"},[n("br"),e._m(0),n("br"),n("br"),e._l(e.muteList,(function(t,r){return n("div",{key:r,staticClass:"mute_item_box",style:{background:e.muteActiveIndex==r?"var(--light)":"none"},on:{click:function(n){e.muteActiveIndex=r,e.$router.push(t.path)}}},[n("span",[n("img",{attrs:{src:e.muteActiveIndex==r?"./icon/"+t.path+"-a.svg":"./icon/"+t.path+".svg"}})]),n("p",{style:{color:e.muteActiveIndex==r?"var(--main)":"var(--black)"}},[e._v(" "+e._s(t.name)+" ")])])}))],2),n("div",{staticClass:"right_top"},[n("div",{staticClass:"ser_left"},[n("i",{staticClass:"el-icon-arrow-left",staticStyle:{"font-size":"24px","margin-left":"36px"},on:{click:function(t){return e.$router.go(-1)}}}),n("search",{attrs:{placeholder:e.placeholder},on:{submit:e.searchAct}})],1),n("div",{staticClass:"col_right"},[n("el-popover",{attrs:{placement:"bottom",width:"160",trigger:"manual"},model:{value:e.showDrawerUser,callback:function(t){e.showDrawerUser=t},expression:"showDrawerUser"}},[n("div",{staticClass:"set_mute"},[n("div",{staticClass:"flex_around",staticStyle:{"flex-wrap":"wrap",width:"160px"}},e._l(5,(function(t){return n("img",{key:t,staticClass:"use_hd_pike",style:{border:e.$store.state.userInfo.user_hd==t?"2px var(--main) solid":"2px transparent solid"},attrs:{src:"./icon/hd/"+t+".svg"},on:{click:function(n){return e.hdPiker(t)}}})})),0),n("li",{staticStyle:{"text-align":"center",width:"160px","justify-content":"center"},on:{click:function(t){return e.$router.push("user")}}},[e._v(" 个人中心> ")]),n("li",{staticClass:"flex_center",staticStyle:{"text-align":"center",color:"var(--red)",width:"160px","justify-content":"center"},on:{click:e.exitLogin}},[e._v(" 退出登录 ")])]),n("span",{staticClass:"icon",staticStyle:{color:"var(--black)"},style:{color:e.$store.state.userInfo.is_truely?"var(--main)":"var(--black)"},attrs:{slot:"reference"},on:{click:function(t){return t.stopPropagation(),e.feelHovLogin.apply(null,arguments)},blur:function(t){e.showDrawerUser=!1}},slot:"reference"},[n("img",{staticStyle:{width:"24px",height:"24px"},attrs:{src:e.$store.state.userInfo.account?"./icon/hd/"+e.$store.state.userInfo.user_hd+".svg":"./icon/hd/df-hd.svg"}}),e.$store.state.userInfo.is_truely?n("i",{staticClass:"el-icon-key",staticStyle:{color:"var(--main)"}}):e._e(),e._v(" "+e._s(e.$store.state.userInfo.nikname?e.$store.state.userInfo.nikname:"登录"))])]),n("span",{staticClass:"icon"},[e._v("|")]),n("el-popover",{attrs:{placement:"bottom",width:"60",trigger:"click"}},[n("div",{staticClass:"set_mute"},[n("li",{on:{click:function(t){return e.$router.push("download")}}},[n("i",{staticClass:"el-icon-s-tools"}),e._v(" 下载管理 ")]),n("li",{on:{click:function(t){return e.$router.push("report")}}},[n("i",{staticClass:"el-icon-s-opportunity"}),e._v(" 反馈建议 ")])]),n("i",{staticClass:"el-icon-s-operation icon",attrs:{slot:"reference"},slot:"reference"})]),n("i",{staticClass:"el-icon-minus icon",on:{click:function(t){return e.$ipc.send("short_cmd_call","window_hidden")}}}),n("i",{staticClass:"el-icon-close icon",on:{click:function(t){return e.$ipc.send("short_cmd_call","window_close")}}})],1)]),n("div",{staticClass:"main_container"},[n("router-view")],1),n("el-dialog",{attrs:{title:"登录到蘑菇应用",visible:e.loginDialogVisible,width:"50%"},on:{"update:visible":function(t){e.loginDialogVisible=t}}},[n("el-form",{ref:"userForm",attrs:{model:e.userInfoForm,"label-width":"80px",rules:e.loginRules,size:"small"}},[n("el-form-item",{attrs:{label:"邮箱",prop:"account"}},[n("el-input",{attrs:{placeholder:"请输入邮箱",type:"email"},model:{value:e.userInfoForm.account,callback:function(t){e.$set(e.userInfoForm,"account",t)},expression:"userInfoForm.account"}})],1),n("el-form-item",{attrs:{label:"密码",prop:"password"}},[n("el-input",{attrs:{type:"password",placeholder:"没有注册则为设置密码"},model:{value:e.userInfoForm.password,callback:function(t){e.$set(e.userInfoForm,"password",t)},expression:"userInfoForm.password"}})],1),n("el-form-item",{attrs:{size:"large"}},[n("el-button",{attrs:{type:"primary",loading:e.pendingLoginLoading},on:{click:e.loginAct}},[e._v("立即登录/注册")])],1)],1),n("br")],1)],1)},c=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h3",{staticClass:"nav_title_h3"},[r("img",{attrs:{src:n("cf05")}}),e._v(" 蘑菇应用 ")])}],u=(n("b0c0"),n("d3b7"),n("d9e2"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"search_box",style:{border:e.isFocus?"2px solid var(--main)":"2px solid var(--light)",background:e.isFocus?"var(--light)":"var(--lime)"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.$store.state.keywords,expression:"$store.state.keywords"}],attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.$store.state.keywords},on:{focus:function(t){e.isFocus=!0},blur:function(t){e.isFocus=!1},input:function(t){t.target.composing||e.$set(e.$store.state,"keywords",t.target.value)}}}),n("i",{staticClass:"el-icon-search",on:{click:function(t){return e.$emit("submit",e.value)}}})])}),l=[],d={data:function(){return{isFocus:!1,value:""}},props:{placeholder:String}},f=d,p=(n("4af4"),n("2877")),h=Object(p["a"])(f,u,l,!1,null,null,null),m=h.exports,g={components:{search:m},data:function(){return{pendingLoginLoading:!1,userInfoForm:{account:"",password:"",must:!1},muteActiveIndex:1,placeholder:"铁石生成器",loginDialogVisible:!1,showDrawerUser:!1,loginRules:{account:[{required:!0,message:"请输入你的邮箱"},{min:3,max:25,message:"限制3-5字符"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],password:[{required:!0,message:"请输入你的密码"},{min:3,max:25,message:"限制3-5字符"}]},muteList:[{name:"介绍",path:"readme"},{name:"应用",path:"fe"},{name:"脚本",path:"script"},{name:"讨论",path:"chat"}]}},methods:{searchAct:function(e){"fe"!=this.$route.name&&"script"!=this.$route.name&&this.$router.push("fe")},exitLogin:function(){localStorage.removeItem("token"),this.$store.state.userInfo.account="",this.$store.state.userInfo.nikname=""},hdPiker:function(e){this.$store.state.userInfo.user_hd=e,this.axios.get(this.host+"index/set_user_hd?user_hd="+e).then((function(e){r.$message({type:"success",message:"头像已更新!"})}))},getUserInfo:function(){r.updateUserInfo(r)},feelHovLogin:function(){this.$store.state.userInfo.account?this.showDrawerUser=!0:this.loginDialogVisible=!0},loginAct:function(){var e=this;this.$refs.userForm.validate((function(t){t&&r.axios.post(e.host+"login/login",e.userInfoForm).then((function(e){e.success?(r.$message({message:"登录成功",type:"success"}),localStorage.setItem("token",e.data.token),r.loginDialogVisible=!1,r.getUserInfo()):r.$message({type:"error",message:e.mes})}))}))},signUp:function(){var e=this;this.$refs.userForm.validate((function(t){t&&r.axios.post(e.host+"login/signup",e.userInfoForm).then((function(e){e.success?r.loginAct():r.$message({type:"error",message:e.mes})}))}))}},created:function(){r=this,this.axios.interceptors.request.use((function(e){return e.headers.Token=localStorage.getItem("token")||"-9",e}),(function(e){return Promise.reject(e)})),this.axios.interceptors.response.use((function(e){var t=e.data;if(t&&t.success)return e.data;if(t.type&&"NO_LOGIN"==t.type&&-1==e.request.responseURL.indexOf("get_user_info"))throw r.loginDialogVisible=!0,new Error;if(t.type&&"NO_SIGNUP"==t.type)throw r.$confirm("该邮箱尚未注册, 是否完成注册?","提示",{confirmButtonText:"好的",cancelButtonText:"不了",type:"warning"}).then((function(){r.signUp()})).catch((function(){r.$message({type:"info",message:"已取消注册"})})),new Error;return e.data}),(function(e){return Promise.reject(e)})),r.getUserInfo()}},v=g,b=(n("5c0b"),Object(p["a"])(v,a,c,!1,null,null,null)),w=b.exports,y=(n("3ca3"),n("ddb0"),n("8c4f")),k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.getFeList,expression:"getFeList"}],staticClass:"download_app infinite-list",attrs:{"infinite-scroll-disabled":"disabled"}},[0==e.list.length?n("el-empty",{attrs:{"image-size":200,description:"没有找到相关数据"}}):e._e(),e._l(e.list,(function(t,r){return n("el-row",{key:r,attrs:{gutter:12}},e._l(t,(function(t,s){return n("el-col",{key:s,attrs:{span:8},nativeOn:{click:function(n){return e.$router.push({name:"appview",params:{id:t.fe_id}})}}},[n("el-card",{attrs:{shadow:"hover"},nativeOn:{mouseover:function(t){e.nowHover=r+","+s}}},[n("div",{staticClass:"flex_center"},[n("img",{staticStyle:{"margin-right":"20px"},attrs:{src:"./icon/app-ico/"+t.fe_ico+".svg"}}),n("span",{staticClass:"title_app"},[n("h5",{staticStyle:{display:"inline"}},[e._v(" "+e._s(t.fe_name)+" ")]),n("br"),n("div",{staticClass:"flex_center",staticStyle:{height:"34px",width:"100%","justify-content":"flex-start"}},[e.nowHover==r+","+s?n("span",[n("el-button",{attrs:{type:"success",size:"small",round:""}},[e._v("下载")])],1):e._e(),e.nowHover!=r+","+s?n("small",{staticStyle:{"text-overflow":"ellipsis","white-space":"nowrap",overflow:"hidden"}},[e._v(e._s(t.fe_desc))]):e._e()])])])])],1)})),1)})),e.loading?n("p",{staticClass:"flex_center"},[n("i",{staticClass:"el-icon-loading"}),e._v("加载中.... ")]):e._e()],2)},_=[],x=(n("99af"),n("159b"),{data:function(){return{nowHover:"",count:123,loading:!1,page:1,disabled:!1,isEmpty:!1,list:[[]]}},computed:{keywords:function(){return this.$store.state.keywords}},created:function(){o=this,this.$store.state.keywords=""},watch:{keywords:function(e,t){clearInterval(s),s=setTimeout((function(){o.page=1,o.list=[],o.getFeList()}),1e3)}},methods:{getFeList:function(){o.disabled=!0,o.loading=!0,this.axios.get(this.host+"vitor/get_fe_list?page=".concat(this.page,"&size=18&keywords=").concat(o.keywords)).then((function(e){if(o.disabled=!1,o.loading=!1,0==e.data.length&&1==o.page)return o.list=[];o.page++,e.data.length<18&&(o.disabled=!0);var t=[[],[],[],[],[],[]];e.data.forEach((function(e,n){n<=2&&n>=0&&t[0].push(e),n<=5&&n>=3&&t[1].push(e),n<=8&&n>=6&&t[2].push(e),n<=11&&n>=9&&t[3].push(e),n<=14&&n>=12&&t[4].push(e),n<=17&&n>=15&&t[5].push(e)})),o.list=o.list.concat(t)}))}}}),$=x,I=(n("5666"),Object(p["a"])($,k,_,!1,null,null,null)),C=I.exports;i["default"].use(y["a"]);var S=[{path:"/",redirect:function(e){return"fe"}},{path:"/fe",name:"fe",component:C},{path:"/readme",name:"readme",component:function(){return n.e("chunk-2d0aa19b").then(n.bind(null,"1028"))}},{path:"/script",name:"script",component:function(){return n.e("chunk-63876174").then(n.bind(null,"2cc9"))}},{path:"/chat",name:"chat",component:function(){return n.e("chunk-5ecd4b0f").then(n.bind(null,"ee79"))}},{path:"/setting",name:"setting",component:function(){return n.e("chunk-2d0d83ad").then(n.bind(null,"79d9"))}},{path:"/appview",name:"appview",component:function(){return n.e("chunk-47f3abd0").then(n.bind(null,"1fe1"))}},{path:"/mic",name:"mic",component:function(){return n.e("chunk-7c487754").then(n.bind(null,"d9de"))}},{path:"/user",name:"user",component:function(){return n.e("chunk-7c9133cc").then(n.bind(null,"a547"))}},{path:"/pay",name:"pay",component:function(){return n.e("chunk-6f24463f").then(n.bind(null,"76e0"))}},{path:"/download",name:"download",component:function(){return n.e("chunk-2d0c8a24").then(n.bind(null,"565b"))}},{path:"/report",name:"report",component:function(){return n.e("chunk-2d2244e1").then(n.bind(null,"e022"))}}],F=new y["a"]({base:"",routes:S}),L=F,O=n("2f62");i["default"].use(O["a"]);var j=new O["a"].Store({state:{userInfo:{account:"",user_hd:1,is_truely:0,nikname:"",id:""},keywords:""},mutations:{},actions:{},modules:{}}),A=n("5c96"),E=n.n(A),P=(n("0fae"),n("bc3a")),U=n.n(P);i["default"].config.productionTip=!1;var D="http://39.108.216.184";D="http://localhost",i["default"].prototype.hostAddr=D,i["default"].prototype.host=D+"/index.php/niffpc/",i["default"].prototype.axios=U.a,window.ipcRender||(window.ipcRender={send:function(){}}),i["default"].prototype.$ipc=window.ipcRender,i["default"].prototype.updateUserInfo=function(e){e.axios.get(e.host+"index/get_user_info").then((function(t){t.success&&(e.$store.state.userInfo=t.data)}))},i["default"].use(E.a),new i["default"]({router:L,store:j,render:function(e){return e(w)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"9c0c":function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"static/img/logo.382d873a.png"},e61b:function(e,t,n){}});
//# sourceMappingURL=app.3a19dceb.js.map