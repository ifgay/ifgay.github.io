<template>
  <div id="app">
    <div class="nav_left">
      <br />
      <h3 class="nav_title_h3">
        <img src="./assets/logo.png" />
        蘑菇应用
      </h3>
      <br />
      <br />
      <div
        class="mute_item_box"
        v-for="(item, index) in muteList"
        :key="index"
        @click="
          muteActiveIndex = index;
          $router.push(item.path);
        "
        :style="{
          background: muteActiveIndex == index ? 'var(--light)' : 'none',
        }"
      >
        <span>
          <img
            :src="
              muteActiveIndex == index
                ? `./icon/${item.path}-a.svg`
                : `./icon/${item.path}.svg`
            "
          />
        </span>
        <p
          :style="{
            color:
              muteActiveIndex == index ? 'var(--main)' : 'var(--black)',
          }"
        >
          {{ item.name }}
        </p>
      </div>
    </div>

    <div class="right_top">
      <div class="ser_left">
        <i
          class="el-icon-arrow-left"
          style="font-size: 24px; margin-left: 36px"
          @click="$router.go(-1)"
        ></i>
        <search :placeholder="placeholder" @submit="searchAct" />
      </div>
      <div class="col_right">
        <el-popover
          placement="bottom"
          width="160"
          trigger="manual"
          v-model="showDrawerUser"
        >
          <div class="set_mute">
            <div class="flex_around" style="flex-wrap: wrap; width: 160px">
              <img
                v-for="i in 5"
                :key="i"
                :src="`./icon/hd/${i}.svg`"
                class="use_hd_pike"
                :style="{
                  border:
                    $store.state.userInfo.user_hd == i
                      ? '2px var(--main) solid'
                      : '2px transparent solid',
                }"
                @click="hdPiker(i)"
              />
            </div>
            <li
              @click="$router.push('user')"
              style="text-align: center; width: 160px; justify-content: center"
            >
              个人中心>
            </li>
            <li
              style="
                text-align: center;
                color: var(--red);
                width: 160px;
                justify-content: center;
              "
              class="flex_center"
              @click="exitLogin"
            >
              退出登录
            </li>
          </div>
          <span
            slot="reference"
            class="icon"
            style="color: var(--black)"
            @click.stop="feelHovLogin"
            @blur="showDrawerUser = false"
            :style="{
              color: $store.state.userInfo.is_truely
                ? 'var(--main)'
                : 'var(--black)',
            }"
          >
            <img
              style="width: 24px; height: 24px"
              :src="
                $store.state.userInfo.account
                  ? `./icon/hd/${$store.state.userInfo.user_hd}.svg`
                  : './icon/hd/df-hd.svg'
              "
            />
            <i
              class="el-icon-key"
              style="color: var(--main)"
              v-if="$store.state.userInfo.is_truely"
            ></i>
            {{
              $store.state.userInfo.nikname
                ? $store.state.userInfo.nikname.slice(0, 4) + "**"
                : "登录"
            }}</span
          >
        </el-popover>

        <span class="icon">|</span>

        <el-popover placement="bottom" width="60" trigger="click">
          <div class="set_mute">
            <li>
              <i class="el-icon-s-tools"></i>
              软件设置
            </li>
            <li>
              <i class="el-icon-share"></i>
              分享好友
            </li>
            <li>
              <i class="el-icon-s-opportunity"></i>
              反馈建议
            </li>
          </div>

          <i class="el-icon-s-operation icon" slot="reference"></i>
        </el-popover>
        <i class="el-icon-minus icon"></i>
        <i class="el-icon-close icon"></i>
      </div>
    </div>
    <div class="main_container">
      <router-view></router-view>
    </div>
    <!-- 登录弹出框 -->
    <el-dialog
      title="登录到蘑菇应用"
      :visible.sync="loginDialogVisible"
      width="50%"
    >
      <el-form
        ref="userForm"
        :model="userInfoForm"
        label-width="80px"
        :rules="loginRules"
        size="small"
      >
        <el-form-item label="邮箱" prop="account">
          <el-input
            v-model="userInfoForm.account"
            placeholder="请输入邮箱"
            type="email"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="userInfoForm.password"
            type="password"
            placeholder="没有注册则为设置密码"
          ></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button
            type="primary"
            @click="loginAct"
            :loading="pendingLoginLoading"
            >立即登录/注册</el-button
          >
        </el-form-item>
      </el-form>
      <br />
    </el-dialog>
  </div>
</template>
<script>
let that
import search from "./components/search.vue";
export default {
  components: {
    search,
  },
  data() {
    return {
      pendingLoginLoading: false,
      userInfoForm: {
        account: "",
        password: "",
        must: false,
      },
      muteActiveIndex: 1,
      placeholder: "铁石生成器",
      loginDialogVisible: false,
      showDrawerUser: false,
      loginRules: {
        account: [
          { required: true, message: "请输入你的邮箱" },
          { min: 3, max: 25, message: "限制3-5字符" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          { required: true, message: "请输入你的密码" },
          { min: 3, max: 25, message: "限制3-5字符" },
        ],
      },
      muteList: [
        {
          name: "介绍",
          path: "readme",
        },
        {
          name: "应用",
          path: "download",
        },
        {
          name: "脚本",
          path: "script",
        },
        {
          name: "更新",
          path: "update",
        },
      ],
    };
  },
  methods: {
    searchAct(v) {},
    exitLogin() {
      localStorage.removeItem("token");
      //this.axios.get(this.host + "index/test")
      this.$store.state.userInfo.account = "";
      this.$store.state.userInfo.nikname = "";
    },
    hdPiker(i) {
      this.$store.state.userInfo.user_hd = i;
      this.axios
        .get(this.host + "index/set_user_hd?user_hd=" + i)
        .then((res) => {
          that.$message({
            type: "success",
            message: "头像已更新!",
          });
        });
    },
    getUserInfo() {
      that.updateUserInfo(that);
    },
    feelHovLogin() {
      if (!this.$store.state.userInfo.account) {
        this.loginDialogVisible = true;
      } else {
        this.showDrawerUser = true;
      }
    },
    loginAct() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          that.axios
            .post(this.host + "login/login", this.userInfoForm)
            .then((res) => {
              if (res.success) {
                that.$message({ message: "登录成功", type: "success" });
                localStorage.setItem("token", res.data.token);
                that.loginDialogVisible = false;
                that.getUserInfo();
              }
            });
        }
      });
    },
    signUp() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          that.axios
            .post(this.host + "login/signup", this.userInfoForm)
            .then((res) => {
              if (res.success) {
                that.loginAct();
              } else {
                that.$message(res.mes);
              }
            });
        }
      });
    },
  },
  created() {
    that=this
    this.axios.interceptors.request.use(
      function (config) {
        config.headers.Token = localStorage.getItem("token") || "-9";
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      function (response) {
        let data = response.data;
        //console.log(response,data,'---');
        if (data && data.success) {
          return response.data;
        } else {
          if (data.type && data.type == "NO_LOGIN") {
            if (response.request.responseURL.indexOf("get_user_info") == -1) {
              that.loginDialogVisible = true;
            }
          }
          if (data.type && data.type == "ERROR_PWD") {
            that.$message({
              type: "error",
              message: "密码错误",
            });
          }
          if (data.type && data.type == "NO_SIGNUP") {
            that
              .$confirm("该邮箱尚未注册, 是否完成注册?", "提示", {
                confirmButtonText: "好的",
                cancelButtonText: "不了",
                type: "warning",
              })
              .then(() => {
                that.signUp();
              })
              .catch(() => {
                that.$message({
                  type: "info",
                  message: "已取消注册",
                });
              });
          }
        }
        return response.data;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    that.getUserInfo();
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
li {
  list-style: none;
}
:root {
  --lime: rgb(245, 244, 244); //左边背景颜色
  --gray: gray; //蘑菇应用的字体颜色
  --main: #ff8041;
  --red: #fe0000; //高亮颜色
  --black: #2c2c2c;
  --light: #fff;
}
.flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex_end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.flex_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex_around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nav_left {
  width: 180px;
  height: 100vh;
  padding-top: 20px;
  background-color: var(--lime);
  .mute_item_box {
    @extend .flex_start;
    padding-left: 25px;
    height: 50px;
    p {
      display: inline-block;
    }
    span {
      @extend .flex_center;
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
  }
}
.main_container {
  position: absolute;
  width: calc(100vw - 180px);
  height: calc(100vh - 58px);
  top: 58px;
  left: 180px;
  box-sizing: border-box;
  padding: 14px;
  overflow: scroll;
}
.nav_title_h3 {
  @extend .flex_center;
  color: var(--gray);
  img {
    width: 38px;
    height: 38px;
    border-radius: 6px;
    margin-right: 5px;
  }
}
#app {
  position: relative;
}
.right_top {
  @extend .flex_between;
  position: absolute;
  left: 180px;
  top: 0;
  height: 58px;
  width: calc(100vw - 180px);
  .ser_left {
    @extend .flex_start;
    width: 50%;
    height: 100%;
  }
  .col_right {
    @extend .flex_end;
    width: 50%;
    height: 100%;
    span.icon {
      font-size: 15px;
      color: rgb(219, 217, 217);
    }
    .icon {
      &:hover {
        color: var(--main);
      }
      font-size: 24px;
      margin-right: 20px;
      color: var(--black);
    }
  }
}
.set_mute {
  width: 92px;
  li {
    width: 90px;
    margin-top: 10px;
    @extend .flex_start;
    i {
      margin-right: 6px;
    }
  }
  li:hover {
    color: var(--main);
  }
}
.el-popover {
  min-width: 90px !important;
}
.use_hd_pike {
  width: 24px;
  height: 24px;
  border-radius: 100%;
}
.fill_box{
  min-width: 100%;
  min-height: 100%;
}
</style>
