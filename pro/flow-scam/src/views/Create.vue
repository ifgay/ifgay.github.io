<template>
  <div>
    <mt-header title="发布通缉令">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
      <span slot="right" @click="saveDoc">发布</span>
    </mt-header>
    <mt-actionsheet :actions="opts" v-model="showAct"> </mt-actionsheet>
    <mt-field
      placeholder="说明发布的缘由等"
      type="textarea"
      rows="4"
      v-model="discrib"
    ></mt-field>
    <br />
    <br />
    <div class="flex_cent">
      <mt-button type="primary" @click="uploadImg">
        <img src="../assets/add.svg" height="20" width="20" slot="icon" />
        上传图片
      </mt-button>
    </div>
    <br />
    <input
      type="file"
      name=""
      ref="imgFile"
      accept="image/*"
      hidden
      @change="submitImg"
    />
    <ul class="flex_cent priew_img" style="justify-content: flex-start">
      <img
        v-for="(sr, index) in list"
        :key="index"
        @click="actDelSure(index)"
        :src="publicPath + '/static/uploads/' + sr"
        :alt="sr"
      />
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import { Toast, Indicator, MessageBox } from "mint-ui";
export default {
  name: "Create",
  data() {
    let that = this;
    return {
      discrib: "",
      showAct: false,
      imgDownSelect: 0,
      opts: [
        {
          name: "删除图片",
          method() {
            that.list.splice(that.imgDownSelect,1)
          },
        },
      ],
      list: [],
    };
  },
  methods: {
    saveDoc() {
      let that = this;
      if (this.discrib.trim().length == 0) {
        MessageBox("提示", "文本不能为空");
        return;
      }
      Indicator.open({
        text: "上传中...",
        spinnerType: "fading-circle",
      });
      axios
        .post(this.host + "save_doc", {
          list: JSON.stringify(that.list),
          discrib: that.discrib,
        })
        .then((res) => {
          Indicator.close();
          if (res.data.success) {
            Toast({
              message: "发布成功",
              position: "bottom",
              duration: 3000,
            });
            that.$router.push('/')
          } else {
            Toast({
              position: "bottom",
              message: res.data.mes,
              duration: 3000,
            });
          }
        });
      return;
    },
    goBack() {
      window.history.go(-1);
    },
    actDelSure(i) {
      this.showAct = true;
      this.imgDownSelect = i;
    },
    uploadImg() {
      this.$refs.imgFile.click();
    },
    submitImg(e) {
      let data = new FormData();
      let that = this;
      if (this.list.length >= 6) {
        MessageBox("提示", "最多只能上传六张图片");
        return;
      }
      data.append("img_data", e.target.files[0]);
      axios.post(this.host + "save_img", data).then((res) => {
        let data = res.data;
        if (data.success) {
          that.list.push(data.data);
        } else {
          Toast({
            message: res.mes,
            position: "bottom",
            duration: 3000,
          });
        }
      });
    },
  },
};
</script>
<style>
.flex_cent {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.priew_img > img {
  width: 64px;
  height: 64px;
  border: solid 1px #e9e9e9;
  border-radius: 3px;
  margin: 2px;
}
</style>
