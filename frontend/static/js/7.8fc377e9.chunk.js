(this["webpackJsonpnode-assignment-task"]=this["webpackJsonpnode-assignment-task"]||[]).push([[7],{29:function(e,t,a){"use strict";t.a={url:"http://localhost:10060"}},36:function(e,t,a){e.exports=a.p+"static/media/dashboard_image.6cbdaeca.jpg"},40:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))},448:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));var n=a(40),s=a(41),l=a(42),r=a(56),m=a(50),i=a(51),o=a(0),c=a.n(o),u=a(9),b=a(29),h=a(36),d=a.n(h),f=function(e){Object(i.a)(o,e);var t=Object(m.a)(o);function o(e){var a;return Object(s.a)(this,o),(a=t.call(this,e)).state={firstname:"",lastname:"",email:"",mobileNumber:"",password:"",users:[],validation:{firstname:null,lastname:null,email:null,mobileNumber:null,password:null}},a.formInputChange=a.formInputChange.bind(Object(r.a)(a)),a.formSubmit=a.formSubmit.bind(Object(r.a)(a)),a}return Object(l.a)(o,[{key:"formInputChange",value:function(e){this.setState(Object(n.a)({},e.target.name,e.target.value));var t=this.state.validation;e.target.value?t[e.target.name]=null:t[e.target.name]="Can't be empty",this.setState({validation:t})}},{key:"formSubmit",value:function(e){e.preventDefault();var t=this.state.users;t.push({firstname:this.state.firstname,lastname:this.state.lastname,email:this.state.email,mobileNumber:this.state.mobileNumber,password:this.state.password}),this.setState({users:t,firstname:"",lastname:"",email:"",mobileNumber:"",password:""}),a(43).post(b.a.url+"/users",{firstname:t[0].firstname,lastname:t[0].lastname,email:t[0].email,mobileNumber:t[0].mobileNumber,password:t[0].password}).then((function(e){alert("Registration done successfully")})).catch((function(e){}))}},{key:"render",value:function(){return c.a.createElement("div",{style:{backgroundColor:"black",backgroundImage:"url(".concat(d.a,")"),height:"657px",backgroundSize:"cover",backgroundAttachment:"fixed"}},c.a.createElement("div",{className:"container col-5"},c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("h3",{style:{color:"#ffe20f",position:"fixed",left:"400px"}},"Sign Up Form"),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("form",{onSubmit:this.formSubmit},c.a.createElement("div",{className:"form-row mb-3"},c.a.createElement("input",{type:"text",name:"firstname",placeholder:"First Name",className:"form-control color",value:this.state.firstname,onChange:this.formInputChange}),this.state.validation.firstname?c.a.createElement("span",{style:{color:"red"}},this.state.validation.firstname):null),c.a.createElement("div",{className:"form-row mb-3"},c.a.createElement("input",{type:"text",name:"lastname",placeholder:"Last Name",className:"form-control",value:this.state.lastname,onChange:this.formInputChange}),this.state.validation.lastname?c.a.createElement("span",{style:{color:"red"}},this.state.validation.lastname):null),c.a.createElement("div",{className:"form-row mb-3"},c.a.createElement("input",{type:"text",name:"email",placeholder:"Email",className:"form-control",value:this.state.email,onChange:this.formInputChange}),this.state.validation.email?c.a.createElement("span",{style:{color:"red"}},this.state.validation.email):null),c.a.createElement("div",{className:"form-row mb-3"},c.a.createElement("input",{type:"text",name:"mobileNumber",placeholder:"Mobile Number",className:"form-control",value:this.state.mobileNumber,onChange:this.formInputChange}),this.state.validation.mobileNumber?c.a.createElement("span",{style:{color:"red"}},this.state.validation.mobileNumber):null),c.a.createElement("div",{className:"form-row mb-3"},c.a.createElement("input",{type:"text",name:"password",placeholder:"Password",className:"form-control",value:this.state.password,onChange:this.formInputChange}),this.state.validation.password?c.a.createElement("span",{style:{color:"red"}},this.state.validation.password):null),c.a.createElement("div",{className:"form-row mb-3"},c.a.createElement("button",{type:"submit",className:"btn btn-success"},"Confirm"),c.a.createElement(u.b,{to:"/",className:"btn btn-primary ml-5"},"Go to Home ")))),"  ")}}]),o}(o.Component)}}]);
//# sourceMappingURL=7.8fc377e9.chunk.js.map