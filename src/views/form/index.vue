<template>
  <el-row class="m-100">
    <el-col :span="24" class="m-b-20" v-if="roles[0] === 'teach'">
      <el-button type="primary" v-show="isEdit" @click="isEdit=false">编辑</el-button>
      <el-button type="primary" v-show="!isEdit&&!have" @click="editSubmit">保存</el-button>
      <el-button type="primary" v-show="!isEdit&&have" @click="updateCourse">保存</el-button>
    </el-col>
    <el-col :span="24">
      <el-table border :data="course" style="width: 100%">
        <el-table-column prop="one" label="" width="180">
        </el-table-column>
        <el-table-column prop="two" label="星期一" width="180">
          <template slot-scope="scope">
            <el-input type="text" v-show="!isEdit" v-model="scope.row.two"></el-input>
            <span v-text="scope.row.two" v-show="isEdit"></span>
          </template>
        </el-table-column>
        <el-table-column prop="three" label="星期二" width="180">
          <template slot-scope="scope">
            <el-input type="text" v-show="!isEdit" v-model="scope.row.three"></el-input>
            <span v-text="scope.row.three" v-show="isEdit"></span>
          </template>
        </el-table-column>
        <el-table-column prop="four" label="星期三">
          <template slot-scope="scope">
            <el-input type="text" v-show="!isEdit" v-model="scope.row.four"></el-input>
            <span v-text="scope.row.four" v-show="isEdit"></span>
          </template>
        </el-table-column>
        <el-table-column prop="five" label="星期四">
          <template slot-scope="scope">
            <el-input type="text" v-show="!isEdit" v-model="scope.row.five"></el-input>
            <span v-text="scope.row.five" v-show="isEdit"></span>
          </template>
        </el-table-column>
        <el-table-column prop="six" label="星期五">
          <template slot-scope="scope">
            <el-input type="text" v-show="!isEdit" v-model="scope.row.six"></el-input>
            <span v-text="scope.row.six" v-show="isEdit"></span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>

</template>

<script>
import { getTeachType } from '@/api/teach'
import { getInfo } from '@/api/student'
import { setCourse, getCourse, updateCourse } from '@/api/course'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      isEdit: true,
      course: [
        {
          one: '第一、二节',
          two: '',
          three: '',
          four: '',
          five: '',
          six: ''
        },
        {
          one: '第三、四节',
          two: '',
          three: '',
          four: '',
          five: '',
          six: ''
        },
        {
          one: '第五、六节',
          two: '',
          three: '',
          four: '',
          five: '',
          six: ''
        },
        {
          one: '第七、八节',
          two: '',
          three: '',
          four: '',
          five: '',
          six: ''
        }
      ],
      major: '',
      classes: '',
      have: false
    }
  },
  methods: {
    editSubmit() {
      const para = {
        major: this.major,
        classes: this.classes,
        course: this.course
      }
      setCourse(para)
        .then(response => {
          this.isEdit = true
          this.have = true
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
    getTeachType() {
      getTeachType(this.l_id)
        .then(response => {
          this.major = response.result.major
          this.classes = response.result.classes
          this.getCourse()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getInfomation() {
      getInfo(this.l_id)
        .then(response => {
          this.major = response.result.major
          this.classes = response.result.classes
          this.getCourse()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCourse() {
      const para = {
        major: this.major,
        classes: this.classes
      }
      getCourse(para)
        .then(response => {
          if (response.flag) {
            this.have = true
            this.course = response.result.course
          } else {
            this.have = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateCourse() {
      const para = {
        major: this.major,
        classes: this.classes,
        course: this.course

      }
      updateCourse(para)
        .then(response => {
          this.isEdit = true
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapGetters(['l_id', 'roles'])
  },
  created: function() {
    if (this.roles[0] === 'teach') {
      this.getTeachType()
    } else if (this.roles[0] === 'student') {
      this.getInfomation()
    }
  }
}
</script>

<style scoped>
.m-100 {
  margin: 100px 100px;
}
.m-b-20 {
  margin-bottom: 20px;
}
</style>

