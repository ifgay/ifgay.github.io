<template>
  <div style="width: 80%; margin: 0 auto">
    <el-dialog title="验证邮箱" :visible.sync="verifyDialogVisible" width="50%">
      <p>验证码已经发送到你的邮箱:{{ form.account }}</p>
      <br />
      <el-input
        v-model="verifyCode"
        style="width: 220px"
        :placeholder="`请输入验证码${second}s`"
      >
      </el-input>
      &nbsp;&nbsp;
      <el-button
        type="primary"
        @click.native="getVeiryRes"
        :loading="verifyCodeLoading"
      >
        验证</el-button
      >
    </el-dialog>

    <el-form
      ref="formUsers"
      :model="form"
      label-width="80px"
      :rules="rulesByUserForm"
    >
      <el-form-item label="头像选择">
        <div class="flex_start" style="flex-wrap: wrap; width: 100%">
          <img
            v-for="i in 5"
            :key="i"
            :src="`./icon/hd/${i}.svg`"
            class="use_hd_pike large_hd"
            :style="{
              border:
                $store.state.userInfo.user_hd == i
                  ? '2px var(--main) solid'
                  : '2px transparent solid',
            }"
            @click="hdPiker(i)"
          />
        </div>
      </el-form-item>
      <el-form-item label="你的名字" style="width: 400px" prop="nikname">
        <el-input v-model="form.nikname" type="text"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" style="width: 400px" prop="account">
        <el-input v-model="form.account" type="email"></el-input>
      </el-form-item>
      <el-form-item label="会员认证" style="width: 400px">
        <span v-if="form.is_vip" style="color: var(--main)">
          恭喜!你已经是会员
        </span>
        <span v-if="!form.is_vip">
          你还不是会员,累计充值1000蘑菇币得永久会员
        </span>
      </el-form-item>
      <el-form-item label="验证邮箱">
        <el-button style="color: var(--main)" v-if="form.is_truely" disabled>
          <i class="el-icon-check"></i>
          已过验证
        </el-button>
        <el-button
          type="primary"
          plain
          v-if="!form.is_truely"
          @click.native="verifyMailAddr"
        >
          <i class="el-icon-key"></i>
          点击验证</el-button
        >
      </el-form-item>
      <el-form-item label="蘑菇币">
        <span style="color: var(--main)">
          <i class="el-icon-coin"></i>
          {{ form.coin }}
        </span>
        &nbsp;&nbsp;&nbsp;
        <el-button
          type="text"
          plain
          size="small"
          @click.native="
            $router.push({ name: 'pay', params: { active: 'keypay' } })
          "
        >
          充值</el-button
        >
        <el-button
          type="text"
          plain
          size="small"
          @click.native="
            $router.push({ name: 'pay', params: { active: 'record' } })
          "
        >
          资金记录</el-button
        >
      </el-form-item>
      <!-- <el-form-item label="BSC地址" style="width: 400px">
        <el-input v-model="form.bsc_addr"> </el-input>
      </el-form-item> -->
      <el-form-item label="">
        <el-button type="primary" @click.native="saveUserInfo">
          <i class="el-icon-document"></i>
          保存更改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let that;
let secondClock;
export default {
  data() {
    return {
      rulesByUserForm: {
        nikname: [{ required: true, message: "请输入你的名字" }],
        account: [
          { required: true, message: "请输入邮箱" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
      verifyCode: "",
      verifyDialogVisible: false,
      verifyCodeLoading: false,
      verifyId: 0,
      second: 60,
      form: {
        nikname: "",
        user_hd: 1,
        account: "",
        is_truely: 0,
        //bsc_addr: "",
        coin: 0,
      },
    };
  },
  methods: {
    saveUserInfo() {
      this.$refs.formUsers.validate((valid) => {
        if (valid) {
          that.axios
            .post(this.host + `index/save_user_info`, {
              nikname: this.form.nikname,
              account: this.form.account,
            })
            .then((res) => {
              if (res.success) {
                that.$message({
                  message: "信息已保存",
                  type: "success",
                });

                that.updateUserInfo(that);
              }
            });
        }
      });
    },
    hdPiker(i) {
      this.$store.state.userInfo.user_hd = i;
      this.axios.get(this.host + "index/set_user_hd?user_hd=" + i);
    },
    verifyMailAddr() {
      this.second = 60;
      clearInterval(secondClock);
      secondClock = setInterval(() => {
        if (that.second < 0) {
          that.second = "";
          clearInterval(secondClock);
        }
        that.second--;
      }, 1000);
      this.verifyDialogVisible = true;
      this.axios.get(this.host + `index/get_verify_id`).then((res) => {
        if (res.success) {
          that.verifyId = res.data.id;
        }
      });
    },
    getVeiryRes() {
      this.verifyCodeLoading = true;
      setTimeout(() => {
        that.axios
          .get(
            this.host +
              `index/verify_code_byid?code=${this.verifyCode}&id=${that.verifyId}`
          )
          .then((res) => {
            this.verifyCodeLoading = false;
            if (res.success) {
              that.verifyDialogVisible = false;
              that.form.is_truely = 1;
              that.$store.state.userInfo.is_truely = 1;
            } else {
              that.$message({
                message: res.mes,
                type: "error",
              });
            }
          });
      }, 1000);
    },
  },
  created() {
    that = this;
    this.form = JSON.parse(JSON.stringify(this.$store.state.userInfo));
  },
};
</script>
<style >
.large_hd {
  width: 48px;
  height: 48px;
}
</style>