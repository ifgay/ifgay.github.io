<template>
  <div class="home">
    <mt-actionsheet :actions="replyAcShet" v-model="showRepShet">
    </mt-actionsheet>

    <mt-search
      v-model="keyword"
      v-if="showSearch"
      cancel-text="取消"
      placeholder="搜索"
      show
      fixed
    >
    </mt-search>
    <mt-header title="通缉令" v-if="!showSearch" fixed>
      <mt-button
        icon="search"
        slot="left"
        @click="showSearch = true"
      ></mt-button>
      <img
        src="../assets/add.svg"
        @click="showRepShet = !showRepShet"
        slot="right"
      />
    </mt-header>
    <br />
    <br />
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <mt-cell
        is-link
        v-for="(item, index) in list"
        :key="index"
        :title="item.discrib"
        :label="'#时间' + item.date + '#曝光' + item.weight"
        @click.native="gotoAbout(item.id)"
      >
        <img src="../assets/flow.svg" slot="icon" width="24" height="24" />
      </mt-cell>
    </mt-loadmore>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    let that = this;
    return {
      keyword: " ",
      showSearch: false,
      allLoaded: false,
      page: 1,
      list: [
        {
          discrib: "",
          date: "",
          weight: 0,
        },
      ],
      showRepShet: false,
      replyAcShet: [
        {
          name: "发布一个通缉令",
          method() {
            that.$router.push("create");
          },
        },
      ],
    };
  },
  watch: {
    keyword(n) {
      if (n.trim() == "") {
        this.showSearch = false;
      }
      this.loadPage(1, true);
    },
  },
  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      this.loadPage(this.page++);
      this.$refs.loadmore.onBottomLoaded();
    },
    goBack() {
      window.history.go(-1);
    },
    gotoAbout(id) {
      this.$router.push({ name: "about", params: { id: id } });
    },
    loadPage(page, reflu) {
      let that = this;
      axios
        .get(
          this.host +
            "get_doc_list?page=" +
            page +
            "&keyword=" +
            this.keyword.trim()
        )
        .then((res) => {
          let data = res.data;
          if (data.success) {
            that.list = that.list.concat(data.data);
            if (data.data.length < 15) {
              that.allLoaded = true;
            }
            if (reflu) {
              that.list = data.data;
            }
          }
        });
    },
  },
  created() {
    this.list = [];
    let that = this;
    this.loadPage(1);
  },
};
</script>

<style>
.mint-searchbar {
  background-color: #f9f9f9 !important;
}
.mint-search {
  height: auto !important;
}
.mint-searchbar {
  top: 0;
  left: 0;
  position: fixed !important;
  width: 100%;
}
</style>