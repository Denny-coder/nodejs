import request from '@/utils/request'

export function login(account, password) {
  return request({
    url: '/api/user/login',
    method: 'get',
    params: {
      account: account,
      pwd: password
    }
  })
}

export function register(params) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data: {
      ...params
    }
  })
}
export function changePwd(params) {
  return request({
    url: '/api/user/changePwd',
    method: 'post',
    data: {
      ...params
    }
  })
}
// export function login(username, password) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
