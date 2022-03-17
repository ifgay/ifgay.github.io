<template>
  <div
    class="mic_vm"
    id="micfj"
    v-loading="loading"
    :element-loading-text="processTips"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
    <iframe frameborder="0" id="vmJc"></iframe>
    <div></div>
  </div>
</template>

<script>
//import {ipcRenderer} from 'electron'
let that;
export default {
  data() {
    return {
      loading: true,
      processTips: "获取脚本信息中...",
      micInfo: {},
    };
  },
  methods: {
    loadUserInfo() {
      let that = this;
      that.processTips = "获取登录信息中...";
      that.axios.get(`index/get_user_info`).then((res) => {
        if (res.data && res.data.account) {
          that.loadAssetsIframe();
        } else {
          that.$message({
            type: "error",
            message: "获取登录信息失败,请重新登录!",
          });
        }
      });
    },
    loadAssetsIframe() {
      let that = this;
      that.processTips = "加载脚本中...";
      let ifram = document.getElementById("vmJc");
      ifram.src = that.micInfo.mic_src;
      setTimeout(() => {
        that.loading = false;
        ifram.contentWindow.ipc = that.$ipc;
        console.log(ifram.contentWindow.ipc);
      }, 500);
    },
    authFade() {
      if (that.micInfo.mic_auth.split("").includes("1")) {
        that.loadUserInfo();
      } else {
        that.loadAssetsIframe();
      }
    },
  },

  mounted() {
    //获取脚本信息
    that = this;
    this.axios
      .get( `vitor/get_mic_one?id=${this.$route.params.id || 1}`)
      .then((res) => {
        that.micInfo = res.data;
        //找一下有没有支付过
        if (res.data.mic_price > 0) {
          that.processTips = "检查订单状态...";
          that.axios
            .get(that.host + `index/get_mic_buy?id=${res.data.mic_id}`)
            .then((cb) => {
              if (cb.success) {
                that.authFade();
              } else {
                that
                  .$confirm(
                    `该应用需要支付${res.data.mic_price}个蘑菇币`,
                    "提示",
                    {
                      confirmButtonText: "购买",
                      showCancelButton: true,
                      type: "info",
                      beforeClose: (action, vo, done) => {
                        if (action != "confirm") {
                          that.$router.go(-1);
                        } else {
                          that.axios
                            .get(
                              
                                `index/buy_mic_app?id=${res.data.mic_id}&price=${res.data.mic_price}`
                            )
                            .then((from) => {
                              //购买成功
                              if (from.success) {
                                that.$store.state.userInfo.coin -=
                                  res.data.mic_price;
                                that.$message({
                                  type: "success",
                                  message: "恭喜,购买成功!",
                                });
                                that.authFade();
                              } else {
                                that.$message({
                                  type: "error",
                                  message: from.mes,
                                });
                              }
                              done();
                            });
                        }
                      },
                    }
                  )
                  .then(() => {})
                  .catch(() => {});
              }
            });
        }
        if (res.data.mic_price == -1) {
          if (that.$store.state.userInfo.is_vip) {
            that.authFade();
          } else {

                that
                  .$confirm(
                    `该脚本应用需要会员才能使用,累计充值1000蘑菇币可获得会员`,
                    "提示",
                    {
                      confirmButtonText: "好的",
                      showCancelButton: false,
                      type: "info",
                      beforeClose: (action, vo, done) => {
                        that.$router.go(-1)
                        done()
                      },
                    }
                  )



          }
        }
        if (res.data.mic_price == 0) {
          that.authFade();
        }
      });
  },
};
</script>
<style>
.mic_vm {
  width: 100%;
  height: 100%;
}
</style>