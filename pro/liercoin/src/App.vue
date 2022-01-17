<template>
  <div class="main">
    <van-nav-bar
      :title="$store.state.navBarConf.title"
      :left-text="$store.state.navBarConf.leftText"
      :right-text="$store.state.navBarConf.rightText"
      :left-arrow='$store.state.navBarConf.leftArrow'
      fixed
      @click-left="$store.state.navBarConf.clickLeft"
      @click-right="$store.state.navBarConf.clickRight"
    />

    <div class="content">
      <router-view>

      </router-view>
    </div>

    <van-tabbar route v-model="active"  fixed   @change='tabSwitch'>
      <van-tabbar-item
        replace
        name="home"
        to="/home"
        :icon="active=='home'?'./svg/home-active.svg':'./svg/home.svg'"
        >首页</van-tabbar-item
      >
      <van-tabbar-item
        replace
        name="store"
        to="/store"
        :icon="active=='store'?'./svg/store-active.svg':'./svg/store.svg'"
        >购买</van-tabbar-item
      >
      <van-tabbar-item
        replace
        name="mine"
        to="/mine"
        :icon="active=='mine'?'./svg/mine-active.svg':'./svg/mine.svg'"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      active: window.location.hash.replace(/[^a-zA-Z]/g,''),
    };
  },
  methods: {
    tabSwitch(index){
      console.log(index);
    }
  },
};
</script>


<style lang="scss">
.content {
  //顶部46px 底部50px
  height: calc(100vh - 99px);
  width: 100%;
  position: fixed;
  top: 46px;
  left: 0px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
