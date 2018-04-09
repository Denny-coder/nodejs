<template>
  <div class="app-container">
    <el-row>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名：">
          <el-col :span="12">
            <el-input v-model="form.fullname">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别：">
          <el-col :span="12">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-col :span="12">
            <el-input v-model="form.age">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="校号：">
          <el-col :span="12">
            <el-input v-model="form.schoolnum">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="专业：">
          <el-col :span="12">
            <el-input v-model="form.major">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="班级：">
          <el-col :span="12">
            <el-input v-model="form.classes">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-col :span="12">
            <el-input v-model="form.phone">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-col :span="12">
            <el-input v-model="form.email">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-col :span="12">
            <el-input v-model="form.idcard">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="生日：">
          <el-col :span="12">
            <el-date-picker size="large" v-model="form.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="籍贯：">
          <el-col :span="12">
            <el-input v-model="form.origin">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="父亲联系方式：">
          <el-col :span="12">
            <el-input v-model="form.f_phone">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="母亲联系方式：">
          <el-col :span="12">
            <el-input v-model="form.m_phone">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { setInfo, getInfo } from '@/api/info'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      has: 0, // 是否填写
      form: {
        fullname: '', // 姓名
        sex: '', // 性别
        age: '', // 年龄
        schoolnum: '', // 校号
        major: '', // 专业
        classes: '', // 班级
        phone: '', // 手机号
        email: '', // 邮箱
        idcard: '', // 身份证号
        birthday: '', // 生日
        origin: '', // 籍贯
        f_phone: '', // 父亲手机号
        m_phone: '' // 母亲手机号
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      this.form.l_id = this.l_id
      console.log(this.form)
      setInfo(this.form)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  },
  computed: {
    ...mapGetters(['l_id'])
  },
  mounted: function() {
    getInfo(this.l_id)
      .then(response => {
        this.form = response
      })
      .catch(err => {
        console.log(err)
      })
  },
  created: function() {}
}
</script>

<style scoped>
.el-date-editor.el-input {
  width: 100%;
}
</style>

