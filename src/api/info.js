import request from '@/utils/request'

export function setInfo(params) {
  return request({
    url: '/api/info/setInfo',
    method: 'post',
    data: {
      l_id: params.l_id, // 登录id
      fullname: params.fullname, // 姓名
      sex: params.sex, // 性别
      age: params.age, // 年龄
      schoolnum: params.schoolnum, // 校号
      major: params.major, // 专业
      classes: params.classes, // 班级
      phone: params.phone, // 手机号
      email: params.email, // 邮箱
      idcard: params.idcard, // 身份证号
      birthday: params.birthday, // 生日
      origin: params.origin, // 籍贯
      f_phone: params.f_phone, // 父亲手机号
      m_phone: params.m_phone // 母亲手机号
    }
  })
}
export function getInfo(params) {
  return request({
    url: '/api/info/getInfo',
    method: 'post',
    data: {
      l_id: params // 登录id
    }
  })
}
