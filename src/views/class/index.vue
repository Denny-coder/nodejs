<template>
  <div>
    <el-row class="m-t-20 m-r-20 m-l-20" :gutter="0">
      <el-form :model="formInline" label-width="90px" :inline="true" class="demo-form-inline" ref="formInline">
        <el-col :span="6">
          <el-form-item class="search-inputType" prop="classes">
            <el-input placeholder="班级" v-model.trim="formInline.classes">
              <el-select v-model="formInline.major" slot="prepend">
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
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row class="m-r-20 m-l-20" :gutter="0">
      <el-col :span="24">
        <!--表格标题-->
        <el-table stripe :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
        <!--尾部工具栏-->
        <div class="m-t-20">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getmajor } from '@/api/enum'

export default {
  data() {
    return {
      formInline: {
        major: '',
        classes: '',
        s_name: ''
      },
      options: [], // 专业
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      currentPage4: 4,
      disabled: false,
      total: 0, // 分页操作
      page: 1, // 页数
      pageSize: 10 // 每页条数
    }
  },
  methods: {
    getData() {},
    resetForm(formName) {
      this.formInline.major = ''
      this.$refs[formName].resetFields()
    },
    // 分页操作
    handleCurrentChange(val) {
      this.page = val
      this.getTable()
    },
    // 每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getTable()
    },
    // 选中行
    selsChange(sels) {},
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

