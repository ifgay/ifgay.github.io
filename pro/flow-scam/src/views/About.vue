<template>
  <div class="about">
    <h1>{{ $route.params }}</h1>
    <mt-header title="通缉详情" fixed>
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <small>&nbsp;&nbsp;#时间{{info.date}}#曝光{{info.weight}}</small>
    <br>
    <p>
      &nbsp;&nbsp; {{info.discrib}}
    </p>
    <br>
    <p class="img_box">
      <img v-for="(name,index) in info.list" :key="index" :src="publicPath + '/static/uploads/' + name" >
    </p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "About",
  data() {
    return {
      info: {
        discrib: "-",
        date: "",
        weight: "",
        list:[]
      },
    };
  },
  created() {
    let that = this;
    if(!this.$route.params.id){
      return this.$router.push('/')
    }
    axios.get(this.host + "get_own_doc?id="+this.$route.params.id).then((res) => {
      res.data.data.list=JSON.parse(res.data.data.list)
      console.log(res.data.data.list);
      that.info = res.data.data;
    });
    axios.get(this.host+'add_weight_doc?id='+this.$route.params.id)
  },
};
</script>
<style scoped>
.img_box{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.img_box > img{
  width: 92%;
  height: auto;
  margin-top: 20px;
}
</style>