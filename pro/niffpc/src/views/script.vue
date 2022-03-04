<template>
  <div v-infinite-scroll="getMicList" infinite-scroll-disabled="disabled">

    <el-row :gutter="12">
      <p>最近使用</p>
      <el-col
        :span="20"
        :offset="2"
        v-for="(item, index) in micAppList"
        :key="index"
        @mouseover.native="cardActiveIndex = index"
      >

  

        <el-card
          :shadow="cardActiveIndex == index ? 'always' : 'never'"
          @click.native="$router.push({name:'mic',params:{id:item.mic_id}})"
        >
          <div class="flex_between">
            <div class="flex_center">

              <img src="../assets/script.svg" style="margin-right: 20px" />


              <div>
                <h3 style="display: inline">{{ item.mic_name }}&nbsp;&nbsp;&nbsp;</h3>
                <br />
                {{ item.mic_desc }}
                <br>
                <small class="badge" v-if="item.mic_price==0"  style="background-color: #28a745;">免费</small><small class="badge" v-if="item.mic_price>0"  style="background-color: #ffc107;">付费</small><small v-if="item.mic_price==-1"  class="badge" style="background-color:var(--main)">vip</small>
              </div>
            </div>
            <span>
              <el-button
                type="success"
                size="small"
                v-if="cardActiveIndex == index"
                round
                >进入</el-button
              >
            </span>
          </div>
        </el-card>


      </el-col>
    </el-row>

        <p v-if="loading" class="flex_center">
      <i class="el-icon-loading"></i>加载中....
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardActiveIndex: -1,
      page: 1,
      disabled: false,
      loading:false,
      micAppList: [
        // {
        //   mic_name: "ni",
        //   mic_desc: "jfdjasidfjsa",
        //   mic_alias: "nilive",
        // },
      ],
    };
  },
  methods: {
    getMicList(page){
  let that = this;
      that.disabled = true;
      that.loading = true;
      this.axios
        .get(this.host + `vitor/get_mic_list?page=${this.page}&size=12`)
        .then((res) => {
          that.disabled=false
          that.loading=false
          that.micAppList = that.micAppList.concat(res.data);
          if(res.data.length<12){
            that.disabled=true
          }
          that.page++
        })

    }
  },
};
</script>
<style>
.badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    color: #fff;
}
</style>