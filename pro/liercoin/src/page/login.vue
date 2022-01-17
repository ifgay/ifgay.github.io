<template>
  <div class="main">



<van-tabs v-model="active">
  <van-tab title="登录">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="账号/邮箱/用户名"
        :rules="[{ required: true, message: '' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </van-tab>
  <van-tab title="注册">
        <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '' }]"
      />
      <van-field
        v-model="repass"
        type="password"
        name="密码"
        label="确认密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '' }]"
      />
      <van-field
        v-model="mail"
        type="email"
        name="邮箱"
        label="邮箱"
        placeholder="请输入你的邮箱"
        :rules="[{ required: true, message: '' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
  </van-tab>
</van-tabs>

    <br />
    <br />
    <small class="foot_tips">
      注册及你已同意<span>《用户协议》</span> 和 <span>《隐私协议》</span>
    </small>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      active:0,
      repass:'',
      mail:''
      };
  },
  methods: {
    onSubmit() {},
  },
  beforeMount() {
    this.$store.commit("setNavConf", {
      title: "登录/注册",
      leftText: "返回",
      rightText: "",
      leftArrow: true,
    });
  },
};
</script>


<style lang="scss">
.foot_tips {
  text-align: center;
  display: block;
  span {
    color: var(--info);
  }
}
</style>
