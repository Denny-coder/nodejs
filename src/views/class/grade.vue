<template>
  <div>
    <el-row class="m-t-20 m-r-20 m-l-20" :gutter="0">
      <el-col :span="6">
        <el-button type="primary" @click="addGrade">添加成绩</el-button>
      </el-col>
      <el-col :span="24">
        <el-table border :data="list" style="width: 100%">
          <el-table-column prop="major" label="专业" width="180">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.major"></el-input>
              <span v-text="scope.row.major"></span>
            </template>
          </el-table-column>
          <el-table-column prop="classes" label="班级" width="180">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.classes"></el-input>
              <span v-text="scope.row.classes"></span>
            </template>
          </el-table-column>
          <el-table-column prop="semester" label="学期" width="180">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.semester"></el-input>
              <span v-text="scope.row.semester"></span>
            </template>
          </el-table-column>
          <el-table-column prop="curriculum" label="课程">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.curriculum"></el-input>
              <span v-text="scope.row.curriculum"></span>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="成绩">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.score"></el-input>
              <span v-text="scope.row.score"></span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { Message } from 'element-ui'
// import router from '@/router'
export default {
  data() {
    return {
      list: [],
      formInline: {
        major: '',
        classes: '',
        schoolnum: '',
        s_name: ''
      }
    }
  },
  methods: {
    // 跳转成绩编辑列表
    addGrade() {
      console.log(this.$router)
      // router.push({ path: '/class/index/grade' })
    }
  },
  mounted: function() {},
  created: function() {},
  computed: {
    ...mapGetters(['major', 'classes', 'account', 'roles'])
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

