import request from '@/utils/request'
export function setTeachInfo(params) {
  return request({
    url: '/api/info/setTeachInfo',
    method: 'post',
    data: {
      l_id: params.l_id, // 登录id
      fullname: params.fullname, // 姓名
      sex: params.sex, // 性别
      nation: params.nation, // 民族
      age: params.age, // 年龄
      worknum: params.worknum, // 校号
      major: params.major, // 专业
      classes: params.classes, // 班级
      phone: params.phone, // 手机号
      email: params.email, // 邮箱
      idcard: params.idcard, // 身份证号
      birthday: params.birthday, // 生日
      origin: params.origin // 籍贯
    }
  })
}
export function getTeachInfo(params) {
  return request({
    url: '/api/info/getTeachInfo',
    method: 'post',
    data: {
      l_id: params // 登录id
    }
  })
}
export function getTeachType(params) {
  return request({
    url: '/api/info/getTeachType',
    method: 'post',
    data: {
      l_id: params // 登录id
    }
  })
}
export function changeEdit(params) {
  return request({
    url: '/api/info/changeEdit',
    method: 'post',
    data: {
      ids: params.ids, // 登录id
      is_edit: params.is_edit // 登录id
    }
  })
}

export function getTeachList(params) {
  return request({
    url: '/api/list/getTeach',
    method: 'post',
    data: {
      major: params.major,
      classes: params.classes,
      t_name: params.t_name,
      pageNum: params.pageNum,
      worknum: params.worknum,
      pageSize: params.pageSize
    }
  })
}
export function delTeach(params) {
  return request({
    url: '/api/list/delTeach',
    method: 'post',
    data: {
      l_id: params.l_id
    }
  })
}

