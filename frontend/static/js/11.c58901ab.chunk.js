(this["webpackJsonpnode-assignment-task"]=this["webpackJsonpnode-assignment-task"]||[]).push([[11],{29:function(e,t,a){"use strict";t.a={url:"http://localhost:10060"}},36:function(e,t,a){e.exports=a.p+"static/media/dashboard_image.6cbdaeca.jpg"},449:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return h}));var n=a(41),l=a(42),r=a(50),c=a(51),s=a(0),o=a.n(s),i=a(43),m=a.n(i),u=a(9),d=a(29),b=a(36),E=a.n(b),h=function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),c=0;c<l;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={users:[]},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;m.a.get(d.a.url+"/users",{headers:{authorization:"".concat(localStorage.token)}}).then((function(t){e.setState({users:t.data.userList})}))}},{key:"viewNote",value:function(e){localStorage.setItem("user_id_forNotes","".concat(e))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{style:{backgroundColor:"black",backgroundImage:"url(".concat(E.a,")"),height:"657px",backgroundSize:"cover",backgroundAttachment:"fixed"}},o.a.createElement("div",{className:"container",style:{width:"900px"}},o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("div",null,o.a.createElement("h3",{style:{color:"#ffe20f",position:"fixed",left:"50px"}},"Users List"),o.a.createElement(u.b,{to:"/dashboard",className:"btn btn-outline-primary",style:{position:"fixed",right:"150px"}},"Go to Dashboard"),o.a.createElement(u.b,{to:"/",className:"btn btn-danger",style:{position:"fixed",right:"34px"}},"Sign Out")),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("div",{className:"row",style:{overflow:"scroll",height:480,width:"900px",overflowX:"hidden"}},this.state.users.map((function(t){return o.a.createElement("div",{className:"col col-12",key:t._id},o.a.createElement("div",{className:"card"},o.a.createElement("div",{className:"card-header",style:{backgroundColor:"#EAD0FF"}},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-9"},o.a.createElement("h3",null,t.firstname," ",t.lastname," ")),o.a.createElement("div",{className:"col-3"},o.a.createElement(u.b,{to:"/allnotes",onClick:function(){return e.viewNote(t._id)},className:"btn btn-info btn-sm",style:{float:"right"}},"View Notes")))))),o.a.createElement("div",{className:"row card-body "},o.a.createElement("div",{className:"col-6"},o.a.createElement("p",null,o.a.createElement("b",null,"Email: "),t.email)),o.a.createElement("div",{className:"col-6"},o.a.createElement("p",null,o.a.createElement("b",null," Mobile Number: "),t.mobileNumber)))),o.a.createElement("br",null))})))))}}]),a}(s.Component)}}]);
//# sourceMappingURL=11.c58901ab.chunk.js.map