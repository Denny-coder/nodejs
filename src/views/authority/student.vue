<template>
  <div>
    <el-row class="m-t-20 m-r-20 m-l-20" :gutter="0">
      <el-form :model="formInline" label-width="90px" :inline="true" class="demo-form-inline" ref="formInline">
        <el-col :span="6">
          <el-form-item class="search-inputType" prop="classes">
            <el-input placeholder="班级" v-model.trim="formInline.classes">
              <el-select v-model="formInline.major" slot="prepend">
                <el-option label="请选择专业" value="">
                </el-option>
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="学生姓名" prop="s_name">
            <el-input v-model.trim="formInline.s_name" placeholder="请输入学生姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="校号" prop="schoolnum">
            <el-input v-model.trim="formInline.schoolnum" placeholder="请输入学生校号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row class="m-r-20 m-l-20" :gutter="0">
      <el-col :span="6" class="m-b-20">
        <el-button type="primary" plain @click="dialogVisible=true">添加学生</el-button>
      </el-col>
      <el-col :span="24">
        <!--表格标题-->
        <el-table stripe :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection" width="55">
          </el-table-column> -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="right" label-width="130px" inline class="demo-table-expand">
                <el-form-item label="性别：">
                  <span v-text="props.row.sex?'男':'女'"></span>
                </el-form-item>
                <el-form-item label="民族：">
                  <span>{{ props.row.nation }}</span>
                </el-form-item>
                <el-form-item label="身份证号：">
                  <span>{{ props.row.idcard }}</span>
                </el-form-item>
                <el-form-item label="生日：">
                  <span>{{ props.row.birthday }}</span>
                </el-form-item>
                <el-form-item label="籍贯：">
                  <span>{{ props.row.origin }}</span>
                </el-form-item>
                <el-form-item label="父亲手机号：">
                  <span>{{ props.row.f_phone }}</span>
                </el-form-item>
                <el-form-item label="母亲手机号：">
                  <span>{{ props.row.m_phone }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="fullname" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="schoolnum" label="校号" width="180">
          </el-table-column>
          <el-table-column prop="major" label="专业">
            <template slot-scope="scope">
              <span v-text="scope.row.major==='1'?'网络工程':'信息管理'"></span>
            </template>
          </el-table-column>
          <el-table-column prop="classes" label="班级">
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
          </el-table-column>
          <el-table-column prop="email" label="邮箱">
          </el-table-column>
          <el-table-column prop="age" label="年龄">
            <template slot-scope="scope">
              <span v-text="scope.row.age+'岁'"></span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄">
            <template slot-scope="scope">
              <el-button type="danger" @click="dialogVisibleDel=true,deletId=scope.row.l_id" plain>删 除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!--尾部工具栏-->
        <div class="m-t-20">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisibleDel" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDel = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" @close="beforeClose">
      <el-form ref="form" :model="form" label-width="80px" :rules="loginRules">
        <el-form-item label="校号" prop="account">
          <el-input v-model="form.account" placeholder="请输入校号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-radio-group :disabled="true" v-model="form.roles">
            <el-radio label="student">学生</el-radio>
            <el-radio label="teach">教师</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="modal" label="专业" prop="major">
          <el-select v-model="form.major" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classes">
          <el-input v-model="form.classes" placeholder="请输入班级">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getmajor } from '@/api/enum'
import { getStudentList, delStudent } from '@/api/student'
import { register } from '@/api/login'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于六位'))
      } else {
        callback()
      }
    }
    const validateClasses = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('班级号不得为空'))
      } else if (!/^[0-9]*$/.test(value)) {
        callback(new Error('班级号只能为数字'))
      } else if (value.length < 4) {
        callback(new Error('班级号不得小于四位'))
      } else if (value.length > 6) {
        callback(new Error('班级号不得大于六位'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        major: '',
        classes: '',
        schoolnum: '',
        s_name: ''
      },
      form: {
        roles: 'student',
        account: '',
        major: '',
        classes: '',
        pwd: ''
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', message: '请输入校号' }],
        major: [{ required: true, trigger: 'change', message: '请选择专业' }],
        pwd: [{ required: true, trigger: 'blur', validator: validatePass }],
        classes: [
          { required: true, trigger: 'blur', validator: validateClasses }
        ]
      },
      options: [], // 专业
      sels: [], // 专业
      tableData: [],
      disabled: false,
      dialogVisible: false,
      dialogVisibleDel: false,
      deletId: '',
      is_edit: '1', // 是否可编辑
      totalCount: 0, // 分页操作
      pageNum: 1, // 页数
      pageSize: 5 // 每页条数
    }
  },
  methods: {
    resetFormMoadl() {
      this.$refs['form'].resetFields()
    },
    beforeClose() {
      this.resetFormMoadl()
    },
    getData() {
      const param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.formInline
      }
      getStudentList(param)
        .then(response => {
          this.totalCount = response.totalCount
          this.tableData = response.result
        })
        .catch(err => {
          console.log(err)
        })
    },
    del() {
      delStudent({ l_id: this.deletId })
        .then(response => {
          Message({
            message: response.msg,
            type: 'success',
            duration: 5 * 1000
          })
          this.dialogVisibleDel = false
          this.getData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 添加学生
    addStudent: function() {
      const para = {
        roles: this.form.roles.split(','),
        account: this.form.account,
        classes: this.form.classes,
        major: this.form.major,
        pwd: this.form.pwd
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          register(para)
            .then(response => {
              Message({
                message: response.msg + '请告知学生',
                type: 'success',
                duration: 5 * 1000
              })
              this.dialogVisible = false
              this.resetFormMoadl()
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    resetForm(formName) {
      this.pageNum = 1 // 页数
      this.pageSize = 5 // 每页条数
      this.formInline.major = ''
      this.$refs[formName].resetFields()
      this.getData()
    },
    // 分页操作
    handleCurrentChange(val) {
      this.pageNum = val
      this.getData()
    },
    // 每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    handleSelectionChange(val) {
      this.sels = val
    },
    getMajorList() {
      getmajor()
        .then(response => {
          this.options = response.result
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted: function() {},
  created: function() {
    this.getMajorList()
    this.getData()
  },
  computed: {
    ...mapGetters(['l_id'])
  }
}
</script>

<style scoped>
.m-t-20 {
  margin-top: 20px;
}
.m-r-20 {
  margin-right: 20px;
}
.m-l-20 {
  margin-left: 20px;
}
.m-b-20 {
  margin-bottom: 20px;
}
.el-input .el-select {
  width: 130px;
}
.modal .el-select {
  width: 100%;
}
</style>

