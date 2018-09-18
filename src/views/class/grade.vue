<template>
  <div>
    <el-row class="m-t-20 m-r-20 m-l-20" :gutter="0">
      <el-col :span="6"  v-if="roles[0]==='teach'">
        <el-button type="primary" @click="add">添加成绩</el-button>
      </el-col>
      <el-col :span="24">
        <el-table border :data="list" style="width: 100%">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="account" label="校号" width="180">
            <template slot-scope="scope">
              <span v-text="scope.row.account"></span>
            </template>
          </el-table-column>
          <el-table-column prop="fullname" label="姓名" width="180">
            <template slot-scope="scope">
              <span v-text="scope.row.fullname"></span>
            </template>
          </el-table-column>
          <el-table-column prop="major" label="专业" width="180">
            <template slot-scope="scope">
              <span  v-text="scope.row.major==='1'?'信息管理':'网络工程'"></span>
            </template>
          </el-table-column>
          <el-table-column prop="classes" label="班级" width="180">
            <template slot-scope="scope">
              <span v-text="scope.row.classes"></span>
            </template>
          </el-table-column>
          <el-table-column prop="semester" label="学期" width="180">
            <template slot-scope="scope">
              <span v-text="scope.row.semester==='1'?scope.row.year+'年上学期':scope.row.year+'年下学期'"></span>
            </template>
          </el-table-column>
          <el-table-column prop="subject" label="课程">
            <template slot-scope="scope">
              <el-input v-show="scope.row.show" type="text" v-model="scope.row.subject"></el-input>
              <span v-show="!scope.row.show" v-text="scope.row.subject"></span>
            </template>
          </el-table-column>
          <el-table-column prop="grade" label="成绩">
            <template slot-scope="scope">
              <el-input v-if="scope.row.show" type="text" v-model="scope.row.grade"></el-input>
              <span v-show="!scope.row.show" v-text="scope.row.grade"></span>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="操作" v-if="roles[0]==='teach'">
            <template slot-scope="scope">
              <el-button v-if="scope.row.show" type="primary" @click="submitGrade(scope.row)">保存</el-button>
              <el-button v-if="!scope.row.show" type="primary" @click="getModal(scope.row)">编辑</el-button>
              <el-button type="danger" @click="del(scope)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" label-position="right" label-width="130px" inline class="demo-table-expand">
        <el-form-item label="校号：">
          <span>{{ form.account }}</span>
        </el-form-item>
        <el-form-item label="姓名：">
          <span>{{ form.fullname }}</span>
        </el-form-item>
        <el-form-item label="专业：">
          <span>{{ form.account }}</span>
        </el-form-item>
        <el-form-item label="班级：">
          <span>{{ form.classes }}</span>
        </el-form-item>
        <el-form-item label="学期：">
          <span v-text="form.semester==='1'?form.year+'年上学期':form.year+'年下学期'"></span>
        </el-form-item>
        <el-form-item label="课程：">
          <el-input type="text" v-model="form.subject"></el-input>
        </el-form-item>
        <el-form-item label="成绩：">
          <el-input type="text" v-model="form.grade"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateGrade">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addGrade, getGrade, updateGrade, delGrade } from '@/api/grade'

import { Message } from 'element-ui'
// import router from '@/router'
export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      form: {
        account: '',
        fullname: '',
        major: '',
        classes: '',
        semester: '',
        subject: '',
        grade: ''
      }
    }
  },
  methods: {
    // 前端添加成绩
    add() {
      let semester
      let year
      if (new Date().getMonth() + 1 < 9) {
        semester = '2'
        year = new Date().getFullYear() - 1
      } else {
        semester = '1'
        year = new Date().getFullYear()
      }
      this.list.push({
        major: this.major, // 专业
        account: this.$route.query.schoolnum, // 账号
        fullname: this.$route.query.fullname, // 姓名
        subject: '', // 科目
        grade: '', // 成绩
        semester: semester, // 学期
        year: year, // 学年
        l_id: this.$route.query.l_id, // id
        show: true, // id
        classes: this.classes // 班级
      })
    },
    // 打开弹窗
    getModal(row) {
      this.dialogVisible = true
      this.form = {
        account: row.account,
        fullname: row.fullname,
        major: row.major,
        classes: row.classes,
        semester: row.semester,
        subject: row.subject,
        year: row.year,
        _id: row._id,
        grade: row.grade
      }
    },
    // 保存成绩
    submitGrade(row) {
      addGrade(row)
        .then(response => {
          this.getGrade()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 保存成绩
    del(scope) {
      const _this = this
      if (scope.row._id) {
        this.$confirm('确认删除？')
          .then(_ => {
            delGrade({ _id: scope.row._id })
              .then(response => {
                _this.getGrade()
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(_ => {})
      } else {
        this.list.splice(scope.$index, 1)
      }
    },
    // 更新成绩
    updateGrade() {
      updateGrade({
        grade: this.form.grade,
        _id: this.form._id,
        subject: this.form.subject
      })
        .then(response => {
          this.getGrade()
          this.dialogVisible = false
          Message({
            message: response.msg,
            type: 'success',
            duration: 5 * 1000
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取成绩
    getGrade() {
      let l_id = ''
      if (this.roles[0] === 'teach') {
        l_id = this.$route.query.l_id
      } else {
        l_id = this.l_id
      }
      // const l_id = {}
      getGrade({ l_id: l_id })
        .then(response => {
          this.list = response.result
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted: function() {},
  created: function() {
    this.getGrade()
  },
  computed: {
    ...mapGetters(['major', 'classes', 'account', 'roles', 'l_id'])
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
.demo-table .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
</style>

