<template>
  <div class="app-container">
    <el-row>
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <el-col :span="12">
          <el-form-item label="姓名：" prop="fullname">
            <el-input v-show="isShow" v-model="form.fullname">
            </el-input>
            <span v-show="!isShow" v-text="form.fullname"></span>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-show="isShow" v-model="form.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
            <span v-show="!isShow" v-text="form.sex==='0'?'女':'男'"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄：" prop="age">
            <el-input v-show="isShow" v-model="form.age">
            </el-input>
            <span v-show="!isShow" v-text="form.age"></span>
          </el-form-item>
          <el-form-item label="民族：" prop="nation">
            <el-input v-show="isShow" v-model="form.nation">
            </el-input>
            <span v-show="!isShow" v-text="form.nation"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业：" prop="major">
            <el-select v-show="isShow" :disabled="true" v-model="form.major" placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <span v-show="!isShow" v-text="form.major==='1'?'网络工程':'信息管理'"></span>
          </el-form-item>
          <el-form-item label="校号：" prop="schoolnum">
            <el-input v-show="isShow" :disabled="true" v-model="form.schoolnum">
            </el-input>
            <span v-show="!isShow" v-text="form.schoolnum"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="班级："prop="classes">
            <el-input v-show="isShow" v-model="form.classes"  :disabled="true" >
            </el-input>
            <span v-show="!isShow" v-text="form.classes"></span>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input v-show="isShow" v-model="form.phone">
            </el-input>
            <span v-show="!isShow" v-text="form.phone"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱：" prop="email">
            <el-input v-show="isShow" v-model="form.email">
            </el-input>
            <span v-show="!isShow" v-text="form.email"></span>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idcard">
            <el-input v-show="isShow" v-model="form.idcard">
            </el-input>
            <span v-show="!isShow" v-text="form.idcard"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生日：" prop="birthday">
            <el-date-picker v-show="isShow" size="large" v-model="form.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
            <span v-show="!isShow" v-text="form.birthday"></span>
          </el-form-item>
          <el-form-item label="籍贯：" prop="origin">
            <el-input v-show="isShow" v-model="form.origin">
            </el-input>
            <span v-show="!isShow" v-text="form.origin"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="母亲联系方式：" prop="m_phone">
            <el-input v-show="isShow" v-model="form.m_phone">
            </el-input>
            <span v-show="!isShow" v-text="form.m_phone"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="父亲联系方式：" prop="f_phone">
            <el-input v-show="isShow" v-model="form.f_phone">
            </el-input>
            <span v-show="!isShow" v-text="form.f_phone"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button v-if="isShow&&has==='0'" type="primary" @click="onSubmit">保存</el-button>
            <el-button v-if="isShow&&is_edit==='1'" type="primary" @click="onSubmitUpdate">保存</el-button>
            <el-button v-if="has===0" @click="resetForm('form')">重置</el-button>
            <el-button v-if="has===1&&isShow" @click="isShow=false,getInfomation(),resetForm('form')">取消</el-button>
            <el-button v-if="!isShow&&is_edit==='1'" type="primary" @click="isShow=true">编辑</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { setInfo, getInfo, updateStuInfo } from '@/api/student'
import { getmajor } from '@/api/enum'
import { Message } from 'element-ui'

import { mapGetters } from 'vuex'

export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写邮箱地址'))
      } else if (
        !/^([a-zA-Z0-9_-]{1,16})@([a-zA-Z0-9]{1,9})(\.[a-zA-Z0-9]{1,9}){0,3}(\.(?:com|net|org|edu|gov|mil|cn|us)){1,4}$/.test(
          value
        )
      ) {
        callback(new Error('请填写正确的邮箱地址'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写手机号'))
      } else if (!/^[1][3,4,5,6,7,8][0-9]{9}$/.test(value)) {
        callback(new Error('请填写正确的手机号'))
      } else {
        callback()
      }
    }
    const validateId = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写身份证号'))
      } else if (!/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
        callback(new Error('请填写正确的身份证号'))
      } else {
        callback()
      }
    }
    return {
      has: Number, // 是否填写
      isShow: false,
      options: [], // 专业list
      is_edit: 0, // 专业list
      form: {
        fullname: '', // 姓名
        sex: '', // 性别
        nation: '', // 民族
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
      },
      rules: {
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        major: [{ required: true, message: '请选择专业', trigger: 'change' }],
        birthday: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        nation: [{ required: true, message: '请填写民族', trigger: 'blur' }],
        fullname: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        idcard: [{ required: true, trigger: 'blur', validator: validateId }],
        origin: [{ required: true, message: '请填写籍贯', trigger: 'blur' }],
        age: [{ required: true, message: '请填写年龄', trigger: 'blur' }],
        classes: [{ required: true, message: '请填写班级', trigger: 'blur' }],
        schoolnum: [
          { required: true, message: '请填写校号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(valid => {
        this.form.l_id = this.l_id
        if (valid) {
          setInfo(this.form)
            .then(response => {
              Message({
                message: response.msg,
                type: 'success',
                duration: 5 * 1000
              })
              this.getInfomation()
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    onSubmitUpdate: function() {
      this.$refs['form'].validate(valid => {
        this.form.l_id = this.l_id
        if (valid) {
          updateStuInfo(this.form)
            .then(response => {
              Message({
                message: response.msg,
                type: 'success',
                duration: 5 * 1000
              })
              this.isShow = false
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getMajorList() {
      getmajor()
        .then(response => {
          this.options = response.result
        })
        .catch(err => {
          console.log(err)
        })
    },
    getInfomation() {
      getInfo(this.l_id)
        .then(response => {
          if (response.result.has === 1) {
            this.form = response.result
            this.has = response.result.has
            this.is_edit = response.result.is_edit
            this.isShow = false
          } else {
            this.form.schoolnum = response.result.schoolnum
            this.form.major = response.result.major
            this.form.classes = response.result.classes
            this.is_edit = response.result.is_edit
            this.has = response.result.has
            this.isShow = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapGetters(['l_id'])
  },
  mounted: function() {},
  created: function() {
    this.getMajorList()
    this.getInfomation()
  }
}
</script>

<style scoped>
.el-date-editor.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
[v-cloak] {
  display: none;
}
</style>

