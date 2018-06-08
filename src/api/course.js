import request from '@/utils/request'

export function setCourse(params) {
  return request({
    url: '/api/course/setCourse',
    method: 'post',
    data: {
      major: params.major,
      classes: params.classes,
      course: params.course
    }
  })
}
export function updateCourse(params) {
  return request({
    url: '/api/course/updateCourse',
    method: 'post',
    data: {
      course: params.course,
      major: params.major,
      classes: params.classes
    }
  })
}
export function getCourse(params) {
  return request({
    url: '/api/course/getCourse',
    method: 'post',
    data: {
      major: params.major,
      classes: params.classes
    }
  })
}

