<template>
  <div class="dashboard-container">
    <img :src="hello" alt="首页" class="img-style">
    <!-- <div class="dashboard-text">账号:{{name}}</div>
    <div class="dashboard-text">角色:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import hello from '@/assets/helloWord.png'

  export default {
    name: 'dashboard',
    data() {
      return {
        hello
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.img-style {
  width: 768px;
  margin: 0px auto;
  display: block;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
