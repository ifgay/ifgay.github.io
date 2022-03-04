<template>
  <div
    class="download_app infinite-list"
    v-infinite-scroll="load"
    infinite-scroll-disabled="disabled"
  >
    <el-row :gutter="12" v-for="(arr, index) in list" :key="index">
      <el-col
        :span="8"
        v-for="(item, key) in arr"
        :key="key"
        @click.native="$router.push({name:'appview',params : {id:item.fe_id}})"
      >
        <el-card
          shadow="hover"
          @mouseover.native="nowHover = `${index},${key}`"
        >
          <div class="flex_center">
            <img :src="`./icon/app-ico/${item.fe_ico}.svg`" style="margin-right: 20px" />
            <span class="title_app">
              <h5 style="display: inline">
                {{ item.fe_name }}
              </h5>

              <br />
              <div
                class="flex_center"
                style="height: 34px; width: 100%; justify-content: flex-start"
              >
                <span v-if="nowHover == `${index},${key}`">
                  <el-button type="success" size="small" round>下载</el-button>
                </span>
                <small v-if="nowHover != `${index},${key}`">{{
                  item.fe_desc
                }}</small>
              </div>
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
      nowHover: "",
      count: 123,
      loading: false,
      page: 0,
      disabled: false,
      list: [
        [
          // {
          //   fe_name: "铁石生成器",
          //   fe_desc: "使用者可以生成使用者可以生成",
          //   fe_url: "./",
          // },
        ],
      ],
    };
  },
  computed: {},
  methods: {
    load() {
      this.page++
      this.getFeList(this.page);
    },
    getFeList(page) {
      let that = this;
      that.disabled = true;
      that.loading = true;
      this.axios
        .get(this.host + `vitor/get_fe_list?page=${page}&size=18`)
        .then((res) => {
          that.disabled = false;
          that.loading = false;
          if (res.data.length < 18) {
            that.disabled = true;
          }
          let tmpAr = [[], [], [], [], [], []];
          res.data.forEach((ch, index) => {
            if (index <= 2 && index >= 0) {
              tmpAr[0].push(ch);
            }
            if (index <= 5 && index >= 3) {
              tmpAr[1].push(ch);
            }
            if (index <= 8 && index >= 6) {
              tmpAr[2].push(ch);
            }
            if (index <= 11 && index >= 9) {
              tmpAr[3].push(ch);
            }
            if (index <= 14 && index >= 12) {
              tmpAr[4].push(ch);
            }
            if (index <= 17 && index >= 15) {
              tmpAr[5].push(ch);
            }
          });
          that.list = that.list.concat(tmpAr);
        });
    },
  },
};
</script>
<style lang='scss'>
.download_app {
  .title_app {
    width: 160px;
  }
}
.flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-card {
  margin-bottom: 10px;
}
</style>