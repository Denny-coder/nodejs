webpackJsonp([4],{SsGj:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("Dd8w"),o=l.n(a),n=l("9JVh"),s=l("ts7I"),r=l("M9A7"),i=l("NYxO"),c=l("zL8q"),m={data:function(){return{formInline:{major:"",classes:"",schoolnum:"",s_name:""},form:{roles:"student",account:"",major:"",classes:"",pwd:""},options:[],sels:[],tableData:[],disabled:!1,dialogVisible:!1,dialogVisibleDel:!1,deletId:"",is_edit:"1",totalCount:0,pageNum:1,pageSize:5}},methods:{getData:function(){var e=this,t=o()({pageNum:this.pageNum,pageSize:this.pageSize},this.formInline);Object(s.c)(t).then(function(t){e.totalCount=t.totalCount,e.tableData=t.result}).catch(function(e){console.log(e)})},del:function(){var e=this;Object(s.a)({l_id:this.deletId}).then(function(t){Object(c.Message)({message:t.msg,type:"success",duration:5e3}),e.dialogVisibleDel=!1,e.getData()}).catch(function(e){console.log(e)})},addStudent:function(){var e=this,t={roles:this.form.roles.split(","),account:this.form.account,classes:this.form.classes,major:this.form.major,pwd:this.form.pwd};Object(r.d)(t).then(function(t){Object(c.Message)({message:t.msg+"请告知学生",type:"success",duration:5e3}),e.dialogVisible=!1,e.form.roles=e.form.roles.join(",")}).catch(function(e){console.log(e)})},resetForm:function(e){this.pageNum=1,this.pageSize=5,this.formInline.major="",this.$refs[e].resetFields(),this.getData()},handleCurrentChange:function(e){this.pageNum=e,this.getData()},handleSizeChange:function(e){this.pageSize=e,this.getData()},handleSelectionChange:function(e){this.sels=e},getMajorList:function(){var e=this;Object(n.a)().then(function(t){e.options=t.result}).catch(function(e){console.log(e)})}},mounted:function(){},created:function(){this.getMajorList(),this.getData()},computed:o()({},Object(i.b)(["l_id"]))},p={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("el-row",{staticClass:"m-t-20 m-r-20 m-l-20",attrs:{gutter:0}},[l("el-form",{ref:"formInline",staticClass:"demo-form-inline",attrs:{model:e.formInline,"label-width":"90px",inline:!0}},[l("el-col",{attrs:{span:6}},[l("el-form-item",{staticClass:"search-inputType",attrs:{prop:"classes"}},[l("el-input",{attrs:{placeholder:"班级"},model:{value:e.formInline.classes,callback:function(t){e.$set(e.formInline,"classes","string"==typeof t?t.trim():t)},expression:"formInline.classes"}},[l("el-select",{attrs:{slot:"prepend"},slot:"prepend",model:{value:e.formInline.major,callback:function(t){e.$set(e.formInline,"major",t)},expression:"formInline.major"}},[l("el-option",{attrs:{label:"请选择专业",value:""}}),e._v(" "),e._l(e.options,function(e){return l("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})],2)],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:6}},[l("el-form-item",{attrs:{label:"学生姓名",prop:"s_name"}},[l("el-input",{attrs:{placeholder:"请输入学生姓名"},model:{value:e.formInline.s_name,callback:function(t){e.$set(e.formInline,"s_name","string"==typeof t?t.trim():t)},expression:"formInline.s_name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:6}},[l("el-form-item",{attrs:{label:"校号",prop:"schoolnum"}},[l("el-input",{attrs:{placeholder:"请输入学生校号"},model:{value:e.formInline.schoolnum,callback:function(t){e.$set(e.formInline,"schoolnum","string"==typeof t?t.trim():t)},expression:"formInline.schoolnum"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:6}},[l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:e.getData}},[e._v("搜索")]),e._v(" "),l("el-button",{on:{click:function(t){e.resetForm("formInline")}}},[e._v("重置")])],1)],1)],1)],1),e._v(" "),l("el-row",{staticClass:"m-r-20 m-l-20",attrs:{gutter:0}},[l("el-col",{staticClass:"m-b-20",attrs:{span:6}},[l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.dialogVisible=!0}}},[e._v("添加学生")])],1),e._v(" "),l("el-col",{attrs:{span:24}},[l("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:e.tableData,border:""},on:{"selection-change":e.handleSelectionChange}},[l("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"right","label-width":"130px",inline:""}},[l("el-form-item",{attrs:{label:"性别："}},[l("span",[e._v(e._s(t.row.sex))])]),e._v(" "),l("el-form-item",{attrs:{label:"民族："}},[l("span",[e._v(e._s(t.row.nation))])]),e._v(" "),l("el-form-item",{attrs:{label:"身份证号："}},[l("span",[e._v(e._s(t.row.idcard))])]),e._v(" "),l("el-form-item",{attrs:{label:"生日："}},[l("span",[e._v(e._s(t.row.birthday))])]),e._v(" "),l("el-form-item",{attrs:{label:"籍贯："}},[l("span",[e._v(e._s(t.row.origin))])]),e._v(" "),l("el-form-item",{attrs:{label:"父亲手机号："}},[l("span",[e._v(e._s(t.row.f_phone))])]),e._v(" "),l("el-form-item",{attrs:{label:"母亲手机号："}},[l("span",[e._v(e._s(t.row.m_phone))])])],1)]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"fullname",label:"姓名",width:"180"}}),e._v(" "),l("el-table-column",{attrs:{prop:"schoolnum",label:"校号",width:"180"}}),e._v(" "),l("el-table-column",{attrs:{prop:"major",label:"专业"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{domProps:{textContent:e._s("1"===t.row.major?"网络工程":"信息管理")}})]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"classes",label:"班级"}}),e._v(" "),l("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),e._v(" "),l("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),e._v(" "),l("el-table-column",{attrs:{prop:"age",label:"年龄"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{domProps:{textContent:e._s(t.row.age+"岁")}})]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"age",label:"年龄"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"danger",plain:""},on:{click:function(l){e.dialogVisibleDel=!0,e.deletId=t.row.l_id}}},[e._v("删 除")])]}}])})],1),e._v(" "),l("div",{staticClass:"m-t-20"},[l("el-pagination",{attrs:{"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"提示",visible:e.dialogVisibleDel,width:"30%"},on:{"update:visible":function(t){e.dialogVisibleDel=t}}},[l("span",[e._v("确认删除？")]),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogVisibleDel=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.del}},[e._v("确 定")])],1)]),e._v(" "),l("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[l("el-form-item",{attrs:{label:"校号"}},[l("el-input",{model:{value:e.form.account,callback:function(t){e.$set(e.form,"account",t)},expression:"form.account"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"密码"}},[l("el-input",{model:{value:e.form.pwd,callback:function(t){e.$set(e.form,"pwd",t)},expression:"form.pwd"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"角色"}},[l("el-radio-group",{attrs:{disabled:!0},model:{value:e.form.roles,callback:function(t){e.$set(e.form,"roles",t)},expression:"form.roles"}},[l("el-radio",{attrs:{label:"student"}},[e._v("学生")]),e._v(" "),l("el-radio",{attrs:{label:"teach"}},[e._v("教师")])],1)],1),e._v(" "),l("el-form-item",{staticClass:"modal",attrs:{label:"专业：",prop:"major"}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.major,callback:function(t){e.$set(e.form,"major",t)},expression:"form.major"}},e._l(e.options,function(e){return l("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"班级：",prop:"classes"}},[l("el-input",{model:{value:e.form.classes,callback:function(t){e.$set(e.form,"classes",t)},expression:"form.classes"}})],1)],1),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.addStudent}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=l("VU/8")(m,p,!1,function(e){l("aj02")},"data-v-e2f14888",null);t.default=u.exports},aj02:function(e,t,l){var a=l("dnoP");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);l("rjj0")("320e12e3",a,!0)},dnoP:function(e,t,l){(e.exports=l("FZ+f")(!1)).push([e.i,"\n.m-t-20[data-v-e2f14888] {\r\n  margin-top: 20px;\n}\n.m-r-20[data-v-e2f14888] {\r\n  margin-right: 20px;\n}\n.m-l-20[data-v-e2f14888] {\r\n  margin-left: 20px;\n}\n.m-b-20[data-v-e2f14888] {\r\n  margin-bottom: 20px;\n}\n.el-input .el-select[data-v-e2f14888] {\r\n  width: 130px;\n}\n.modal .el-select[data-v-e2f14888] {\r\n  width: 100%;\n}\r\n",""])}});