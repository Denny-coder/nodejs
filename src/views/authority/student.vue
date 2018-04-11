<template>
  <div>
    <el-row class="m-t-20 m-r-20 m-l-20" :gutter="0">
      <el-form :model="formInline" label-width="90px" :inline="true" class="demo-form-inline" ref="formInline">
        <el-col :span="6">
          <el-form-item class="search-inputType" prop="classes">
            <el-input placeholder="班级" v-model.trim="formInline.classes">
              <el-select v-model="formInline.major" slot="prepend">
                <el-option  label="请选择专业"  value="">
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
        <el-button type="info" @click="changeBtn">修改权限</el-button>
      </el-col>
      <el-col :span="24">
        <!--表格标题-->
        <el-table stripe :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
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
        </el-table>
        <!--尾部工具栏-->
        <div class="m-t-20">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-radio v-model="is_edit" label="1">可编辑</el-radio>
      <el-radio v-model="is_edit" label="0">不可编辑</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getmajor } from '@/api/enum'
import { getStudentList } from '@/api/student'
import { changeEdit } from '@/api/teach'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      formInline: {
        major: '',
        classes: '',
        schoolnum: '',
        s_name: ''
      },
      options: [], // 专业
      sels: [], // 专业
      tableData: [],
      disabled: false,
      dialogVisible: false,
      is_edit: '1', // 是否可编辑
      totalCount: 0, // 分页操作
      pageNum: 1, // 页数
      pageSize: 5 // 每页条数
    }
  },
  methods: {
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
    changeBtn: function() {
      if (this.sels.length <= 0) {
        Message({
          message: '请选择至少一条数据',
          type: 'warning',
          duration: 5 * 1000
        })
      } else {
        this.dialogVisible = true
      }
    },
    // 改变权限
    changeEdit: function() {
      var arr = []
      for (const key of this.sels) {
        arr.push(key.l_id)
      }
      changeEdit({ ids: arr, is_edit: this.is_edit })
        .then(response => {
          Message({
            message: response.msg,
            type: 'success',
            duration: 5 * 1000
          })
          this.dialogVisible = false
          this.is_edit = '1'
        })
        .catch(err => {
          console.log(err)
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
</style>

