import request from '@/utils/request'

export function getmajor(params) {
  return request({
    url: '/api/enum/major',
    method: 'post'
  })
}
