<template>
  <div class="main">
    <van-search
      v-model="searchValue"
      shape="round"
      background="#fff"
      placeholder="请输入搜索关键词"
    />

    <van-popup
      v-model="showFilterBox"
      position="right"
      :style="{ height: '100%', width: '70%' }"
    >
      <br />
      <br />
      <br />
      <van-cell title="价格">
        <template #right-icon>
          <label class="filter">
            <input type="number" placeholder="最低价" />-<input
              type="number"
              placeholder="最高价"
            />
          </label>
        </template>
      </van-cell>
      <van-cell title="库存">
        <template #right-icon>
          <label class="filter">
            <input type="number" placeholder="最少" />-<input
              type="number"
              placeholder="最多"
            />
          </label>
        </template>
      </van-cell>
      <van-divider>参数筛选</van-divider>
      <van-cell title="回本时间">
        <template #right-icon>
          <van-stepper v-model="payBackTime" integer />
        </template>
      </van-cell>

      <van-cell title="产出币种">
        <template #right-icon>
          <van-popover
            v-model="showSelectCoinType"
            theme="light"
            trigger="click"
            :actions="coinActions"
            position="left"
            @select="onCoinSelect"
          >
            <template #reference>
              <span>
                {{ coinTypeText }}
              </span>
              
            </template>
          </van-popover>
          &nbsp;&nbsp;<span style="width: 30px"></span>
        </template>
      </van-cell>


      <van-cell title="矿机品牌">
        <template #right-icon>
          <van-popover
            v-model="showSelectMachineType"
            theme="light"
            trigger="click"
            :actions="machineActions"
            position="left"
            @select="onSelectMachine"
          >
            <template #reference>
              <span>
                {{ machineTypeText }}
              </span>
              
            </template>
          </van-popover>
          &nbsp;&nbsp;<span style="width: 30px"></span>
        </template>
      </van-cell>
      <van-cell title="矿机地址">
        <template #right-icon>
          <van-popover
            v-model="showSelectMachineAddr"
            theme="light"
            trigger="click"
            :actions="machineAddrActions"
            position="left"
            @select="onSelectMachineAddr"
          >
            <template #reference>
              <span>
                {{ machineAddr }}
              </span>
              
            </template>
          </van-popover>
          &nbsp;&nbsp;<span style="width: 30px"></span>
        </template>
      </van-cell>

            <van-cell title="起租时长">
        <template #right-icon>
          <van-stepper v-model="minRentTime" integer />
        </template>
      </van-cell>

            <van-cell title="收益率">
        <template #right-icon>
          <van-stepper v-model="profitRate" integer />
        </template>
      </van-cell>

<br>
<br>
<div class="flex_evenly" style="justify-content:center;">
<van-button   plain>重&nbsp;置</van-button>
&nbsp;
<van-button type="info"  >筛&nbsp;选</van-button>
</div>


    </van-popup>

    <van-card
      tag="标签"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
      origin-price="10.00"
    />
  </div>
</template>

<script>
export default {
  name: "store",
  components: {},
  data() {
    return {
      showSelectMachineType:false,
      machineActions:[{ text: "BTC" }, { text: "ETH" }, { text: "USDT" }],
      machineTypeText:'矿机',
      searchValue: "",
      showFilterBox: false,
      payBackTime: "",
      showSelectCoinType: false,
      coinActions: [{ text: "BTC" }, { text: "ETH" }, { text: "USDT" }],
      coinTypeText: "USDT",
      minRentTime:1,
      profitRate:1,
      machineAddrActions:[{ text: "成都" }, { text: "广州" }, { text: "新加坡" }],
      machineAddr:'广州',
      showSelectMachineAddr:false,
    };
  },
  methods: {
    onCoinSelect(target){
      this.coinTypeText=target.text
    },
    onSelectMachine(target){
      this.machineTypeText=target.text
    },
    onSelectMachineAddr(target){
      this.machineAddr=target.text
    }
  },
  beforeMount() {
    let that = this;
    this.$store.commit("setNavConf", {
      title: "商店",
      leftText: "返回",
      rightText: "筛选",
      leftArrow: true,
      clickRight: () => {
        that.showFilterBox = !that.showFilterBox;
      },
    });
  },
};
</script>


<style lang="scss">
.flex_evenly {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.param_filter {
  @extend .flex_evenly;
}
.filter {
  @extend .flex_evenly;
  input {
    width: 20vw;
    border-radius: 10vw;
    text-align: center;
    background-color: #f1f1f1;
    border: none;
    font-size: 13px;
  }
}
</style>
