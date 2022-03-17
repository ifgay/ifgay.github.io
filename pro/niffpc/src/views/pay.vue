<template>
  <div style="oveflow:hidden" class="pay_space"  v-infinite-scroll="loadCapitalList"
          infinite-scroll-disabled="disabled">
    <el-tabs v-model="activeName" @tab-click="onTabChange">
      <el-tab-pane label="卡密支付" name="keypay">
        <div class="fill_box flex_center" style="min-height: 300px">
          <div style="width: 500px">
            <p>卡密购买联系微信:***</p>
            <br />
            <el-input
              v-model="cardKey"
              style="width: 300px"
              placeholder="输入你的卡密充值"
            ></el-input>
            <el-button
              type="primary"
              @click="recharge"
              :loading="cardKeyLoading"
              >{{ cardKeyLoadingText }}</el-button
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="区块链支付" name="blockpay"> </el-tab-pane>
      <el-tab-pane label="消费记录" name="record">

        <div
          class="record_cel"
         
        >
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in capitalLogs"
              :key="index"
              :color="item.capital_type == 1 ? '#67c23a' : '#f56c6c'"
              :timestamp="item.capital_time"
            >
              <strong
                :style="{
                  color: item.capital_type == 1 ? '#67c23a' : '#f56c6c',
                }"
                >{{ item.capital_type == 1 ? "充值+" : "消费-"
                }}<i class="el-icon-coin"></i>{{ item.capital_price }}</strong
              >
              {{ item.capital_desc }}
            </el-timeline-item>
          </el-timeline>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
let that;
export default {
  created() {
    that = this;
    if (this.activeName == "record") this.onTabChange();
  },
  data() {
    return {
      disabled: true,
      cardKey: "",
      activeName: this.$route.params.active,
      cardKeyLoading: false,
      page: 1,
      cardKeyLoadingText: "充值",
      capitalLogs: [
        //   {
        //   capital_desc: '',
        //   capital_time: '',
        //   capital_type:1,
        //   capital_price:0
        // }
      ],
    };
  },
  methods: {
    loadCapitalList() {
      that.disabled = true;
      this.axios
        .get( `index/get_capital_list?page=${this.page}&size=10`)
        .then((res) => {
          that.disabled = false;
          that.capitalLogs = that.capitalLogs.concat(res.data);
          that.page++;
          if (res.data.length < 10) {
            that.disabled = true;
          }
        });
    },
    onTabChange() {
      console.log(this.activeName);
      if (this.activeName == "record") {
        this.disabled = false;
        this.capitalLogs = [];
        this.page = 1;
        this.loadCapitalList();
      }
    },
    recharge() {
      this.cardKeyLoading = true;
      this.cardKeyLoadingText = "查询中";
      setTimeout(() => {
        this.axios
          .get( `index/charge_by_card?key=${this.cardKey}`)
          .then((res) => {
            if (res.success) {
              that.updateUserInfo(that);
              that.$message({
                message: "恭喜!充值完成",
                type: "success",
              });
            } else {
              that.$message({
                message: res.mes,
                type: "error",
              });
            }
            this.cardKeyLoadingText = "充值";
            this.cardKeyLoading = false;
          });
      }, 3000);
    },
  },
};
</script>

<style lang='scss'>
.record_cel {
  margin-left: 60px;
  width: 100%;
}
.pay_space{
  .el-tabs__header{
    position: sticky;
    top: 0;
    background: var(--light);
    z-index: 90000;
  }
}
</style>