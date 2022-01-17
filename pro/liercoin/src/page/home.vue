<template>
  <div class="main">
<van-swipe :autoplay="3000">
  <van-swipe-item v-for="(image, index) in images" :key="index">
    <img :src="image" class="swipe_img_auto" />
  </van-swipe-item>
</van-swipe>
<van-grid :column-num="3" :border='false'>
  <van-grid-item>
    <span style="text-align:center;">
   运行中
   <br>
   {{machine.running}}台
    </span>
  </van-grid-item>
  <van-grid-item>
    <span style="text-align:center;">
    已停止
       <br>
   {{machine.stoped}}台
    </span>
  </van-grid-item>

  <van-grid-item>
  <span style="text-align:center;">
    已过期
       <br>
   {{machine.passed}}台
  </span>
  </van-grid-item>
</van-grid>

<van-divider content-position="left">收益</van-divider>

    <div class="panel">
      <span>
        总净收益资产
      </span>
      <div class="chart_btn">
        <img src="../assets/svg/chart.svg" style="width:16px;height:16px;opacity:.7;" ><span>&nbsp;历史收益</span> 
      </div>
      <strong>
        &nbsp;&nbsp;{{funds}}
        <van-popover
          v-model="showUnitBox"
          trigger="click"
          :actions="unitList"
          @select="onUnitSeclect"
        >
          <template #reference>
            <label class="small_size"
              >{{unitText}}
              <img src="../assets/svg/down.svg" style="margin-bottom: -3px" />
            </label> </template></van-popover>
      </strong> 
        <span>
          今日收益 <span style="color:white;">{{todayInCome}}</span>  <label class="small_size">{{unitText}}</label><label>({{inComeRate}}%)</label>
        </span>
    </div>
<van-divider content-position="left">市场</van-divider>

<van-grid :column-num="3">

  <van-grid-item v-for="(item,index) in virtPrice" :key='index'>
  <small style="word-break:keep-all;text-align:center">
       ETH
    <span v-if='item.point>0' >
       <img src="../assets/svg/up-arrow.svg">
       <span style="color:var(--danger)">
          {{item.point}}%
       </span>
       <br>
       <span style="color:var(--danger)">
         {{item.price}}$
       </span>
     </span>

    <span v-if='item.point<0' >
       <img src="../assets/svg/down-arrow.svg">
       <span style="color:var(--success)">
          {{item.point}}%
       </span>
              <br>
       <span style="color:var(--success)">
         {{item.price}}$
       </span>
     </span>
   
  </small>
  </van-grid-item>

</van-grid>


<div class="steps_box" v-if="$store.state.isLogin">
<van-divider content-position="left">历史记录(近一个月)</van-divider>

<van-steps direction="vertical" :active="-1" >

  <van-step v-for="(item,index) in historySteps" :key="index">
    <p>
      <span>{{item.title}}</span>
        <span style="float:right">
        <span v-if="item.changeType == '+'" style="color:var(--success)">{{item.fundsChange}}</span>
              <span v-if="item.changeType == '-'" style="color:var(--danger)">{{item.fundsChange}}</span>
        </span>
    </p>
    <p>{{item.time}}</p>
  </van-step>
</van-steps>
</div>

<div class="please_login">
  <br>

  你好,请你先<span @click="()=>{$router.push('/login')}">登录</span>
</div>




  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      machine:{
        running:'-',
        stoped:'-',
        passed:'-'
      },
      unitText:'USDT',
      funds:'**',
      todayInCome:'**',
      inComeRate:'**',
      showUnitBox:false,
      unitList:[{text:'USDT'},{text:'CNY'}],
        images:[
            'https://cn.bing.com/th?id=OHR.PFNPAZ_ZH-CN7929165864_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
            'https://cn.bing.com/th?id=OHR.Koenigsbourg_ZH-CN7675452866_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
            'https://cn.bing.com/th?id=OHR.MistyTor_ZH-CN7520952555_1920x1080.jpg&rf=LaDigue_1920x1080.jpg'
        ],
        virtPrice:[{price:'342',point:'1'},{price:'342',point:'-1'},{price:'342',point:'-1'}],
        historySteps:[
          {
            type:1,
            title:'账户充值',
            time:'2020-3-4',
            fundsChange:'+100$',
            changeType:'+'
          },
          {
            type:2,
            title:'账户提款',
            time:'2020-3-4',
            fundsChange:'-100$',
            changeType:'-'
          },
          {
            type:3,
            title:'购买矿机',
            time:'2020-3-4',
            fundsChange:'-100$',
            changeType:'-'
          }
        ]
    };
  },
  methods: {
    onUnitSeclect(e){
      this.unitText=e.text;
    }
  },
  beforeMount(){
    this.$store.commit('setNavConf',{
      title:"概览",
      leftText:'',
      rightText:'',
      leftArrow:false,
      clickRight: () => {
        
      },
    })
  }
};
</script>


<style lang="scss">
.swipe_img_auto{
    width: 100%;
}
.panel{
  position: relative;
  display: flex;
  width: 84%;
  margin: 0 auto;
  height: 100px;
  border-radius: 15px;
  background-color: var(--info);
  padding: 15px;
  color: rgba(255,255,255, .7);
  flex-direction: column;
  justify-content: space-between;
  strong{
    font-size: 6vw;
    color: white;
  }
  .small_size{
      font-size: 2vw;
  }
  .chart_btn{
    position: absolute;
    top: 50%;
    right: 10px;
    border: solid 1px rgba(255,255,255,.7);
    border-radius: 10px;
    width: 100px;
    height: 30px;
    margin-top: -15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
}
.please_login{
  text-align: center;
  color: gray;
  span{
    color: var(--info);
  }
}
</style>
