import request from '@/utils/request'
export function addGrade(params) {
  return request({
    url: '/api/grade/addGrade',
    method: 'post',
    data: {
      major: params.major, // 专业
      account: params.account, // 账号
      fullname: params.fullname, // 姓名
      subject: params.subject, // 科目
      grade: params.grade, // 成绩
      semester: params.semester, // 学期
      year: params.year, // 学年
      l_id: params.l_id, // 学年
      classes: params.classes // 班级
    }
  })
}
export function updateGrade(params) {
  return request({
    url: '/api/grade/updateGrade',
    method: 'post',
    data: {
      _id: params._id, // 登录id
      subject: params.subject, // 登录id
      grade: params.grade // 成绩
    }
  })
}
export function getGrade(params) {
  return request({
    url: '/api/grade/getGrade',
    method: 'post',
    data: {
      l_id: params.l_id // 登录id
    }
  })
}
export function delGrade(params) {
  return request({
    url: '/api/grade/delGrade',
    method: 'post',
    data: {
      _id: params._id // 成绩id
    }
  })
}
