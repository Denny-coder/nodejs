const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  l_id: state => state.user.l_id,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  classes: state => state.user.classes,
  account: state => state.user.account,
  major: state => state.user.major,
  addRouters: state => state.permission.addRouters
}
export default getters
