<template>
  <div>
    <el-row :gutter="20">

      <el-form :model="formInline" label-width="90px" class="demo-form-inline" ref="formInline">
        <el-col :span="11">
          <el-form-item class="search-inputType">
            <el-input placeholder="订单编号/合同编号" v-model.trim="formInline.inputName">
              <el-select v-model="formInline.inputType" slot="prepend">
                <el-option label="订单编号" value="1"></el-option>
                <el-option label="合同编号" value="2"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="客户名称" prop="custName">
            <el-input v-model.trim="formInline.custName" placeholder="请输入客户名称"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="ew-content">
          <!--表格标题-->
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
          <!--尾部工具栏-->
          <div class="ew-block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
          </div>
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
        inputName: '',
        inputType: ''
      },
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
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
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
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted: function() {
    this.getMajorList()
  }
}
</script>

<style scoped>

</style>

