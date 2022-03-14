<template>
  <div style="height: 100%; width: 100%; overflow: hidden">
    <div
      class="flex_center"
      style="min-height: 20px; width: 100%"
      v-if="loading"
    >
      <small style="color: var(--main)">
        <i class="el-icon-loading"></i>
        加载消息中...
      </small>
    </div>

    <div class="chat_que" ref="que" @scroll="queScrollHander">
      <span v-for="(item, index) in chatRows" :key="index">
        <div class="bef" v-if="item.user_id != $store.state.userInfo.id">
          <img :src="`./icon/hd/${item.user_hd}.svg`" class="hd_img" @click="atFriends(item.nikname)" />
          <div class="nak flex_start" style="flex-wrap: wrap">
            <div style="width: 100%">
              <span style="color: var(--blue)">{{ item.nikname }}</span>
              &nbsp;
              <small style="color: var(--gray)">{{ item.chat_time }}</small>
            </div>
            <div class="speak">
              <span class="mes_text_yo">
                {{ item.chat_text }}
              </span>




              <p v-for="(mg, key) in JSON.parse(item.chat_img_arr)" :key="key">
                <img
                  class="mes_keep_img"
                  :src="hostAddr + '/static/uploads/' + mg"
                  preview="1"
                  :preview-text="mg"
                />
              </p>

              <p
                v-for="(lin, key) in JSON.parse(item.chat_file_arr)"
                :key="key"
                style="text-align:left;"
              >
                <i class="el-icon-document"></i> 附件{{ key + 1 }}:
                {{ lin.slice(0, 7) + lin.slice(lin.length - 4) }}
                <small style="color: var(--main)">下载</small>
              </p>





            </div>
          </div>
        </div>
        <div class="aft" v-if="item.user_id == $store.state.userInfo.id">
          <div class="nak flex_end" style="flex-wrap: wrap">
            <div style="width: 100%; align-items: flex-end" class="flex_end">
              <small style="color: var(--gray)">{{ item.chat_time }}</small>
              &nbsp; <span style="color: var(--green)">{{ item.nikname }}</span>
            </div>
            <div class="speak">
              <span class="mes_text_yo">
                {{ item.chat_text }}
              </span>

              <p v-for="(mg, key) in JSON.parse(item.chat_img_arr)" :key="key">
                <img
                  class="mes_keep_img"
                  :src="hostAddr + '/static/uploads/' + mg"
                  preview="1"
                  :preview-text="mg"
                />
              </p>

              <p
                v-for="(lin, key) in JSON.parse(item.chat_file_arr)"
                :key="key"
                style="text-align:right;"
              >
                <i class="el-icon-document"></i> 附件{{ key + 1 }}:
                {{ lin.slice(0, 7) + lin.slice(lin.length - 4) }}
                <small style="color: var(--main)">下载</small>
              </p>


            </div>
          </div>
          <img :src="`./icon/hd/${item.user_hd}.svg`" class="hd_img" />
        </div>
      </span>
      <br />
      <br />
    </div>
    <div class="chat_bam">
      <small
        class="tips_inside"
        v-if="fileUploadQuu.length > 0 || imgUploadWind.length > 0 || fileUploadingCount>0"
      >
        {{ fileUploadQuu.length }}个附件,{{ imgUploadWind.length }}张图片,{{fileUploadingCount}}正在上传
        <span @click="cancelUpload"><i class="el-icon-close"></i>取消上传</span>
      </small>
      <textarea
        v-model="message"
        @keydown.enter="saveMessageDis"
        placeholder="说点什么吧..."
      >
      </textarea>
      <button @click="saveMessageDis">发送</button>
      <div class="moon flex_between">
        <!-- 附件上传 -->
        <el-popover
          placement="top-start"
          :width="(fileUploadQuu.length + 1) * 70"
          trigger="click"
        >
          <div
            :style="{ width: `${(fileUploadQuu.length + 1) * 70 + 20}px` }"
            class="flex_center"
          >
            <div
              class="flex_center img_cloud"
              v-for="(item, index) in fileUploadQuu"
              :key="index"
              :title="item"
            >
              <img src="../assets/unknown-file.svg" />
              <p style="text-align: center">
                {{ item }}
              </p>
            </div>
            <div
              class="flex_center img_cloud"
              @click="$refs.eleFileNever.click()"
            >
              <img src="../assets/upload-file.svg" />
              <p style="text-align: center">点击上传</p>
            </div>
          </div>

          <div slot="reference">
            <img src="../assets/file.svg" />
          </div>
        </el-popover>

        <el-popover
          placement="top-start"
          :width="(imgUploadWind.length + 1) * 70"
          trigger="click"
        >
          <div
            :style="{ width: `${(imgUploadWind.length + 1) * 70 + 20}px` }"
            class="flex_center"
          >
            <div
              class="flex_center img_cloud"
              v-for="(item, index) in imgUploadWind"
              :key="index"
              :title="item"
            >
              <img
                :src="hostAddr + '/static/uploads/' + item"
                style="width: 64px; height: 64px"
              />
              <p style="text-align: center">{{ item }}</p>
            </div>
            <div
              class="flex_center img_cloud"
              @click="$refs.eleFileNever.click()"
            >
              <img src="../assets/upload-file.svg" />
              <p style="text-align: center">点击上传</p>
            </div>
          </div>

          <div slot="reference">
            <img src="../assets/img-file.svg" />
          </div>
        </el-popover>
      </div>
    </div>
    <input type="file" hidden ref="eleFileNever" @change="saveFileFall" />
  </div>
</template>

<script>
let that;
let lockScroll; //滚动锁
let lockAjax; //请求锁
let clockListenMes;
let imgTypeSent = ["png", "svg", "jpg", "jpeg"];
export default {
  setup() {},
  updated() {},
  beforeDestroy() {
    clearInterval(clockListenMes);
  },
  mounted() {
    clockListenMes = setInterval(() => {
      this.getChatRows(that.chatRows[that.chatRows.length - 1].chat_id, 1);
    }, 6000);
  },
  data() {
    return {
      message: "", //发送的消息内容
      chatRows: [], //消息列表
      loading: false,
      imgUploadWind: [], //上传的图片
      fileUploadQuu: [], //上传的文件
      fileUploadingCount:0,//正在上传的文件
    };
  },

  created() {
    that = this;
    this.loading = true;
    //初始化几条消息保证滚动加载进行
    this.axios.get(this.host + "index/get_chat_init").then((res) => {
      if (res.success) {
        that.chatRows = res.data;
        that.loading = false;
        that.$nextTick(() => {
          that.$refs.que.scrollTop = that.$refs.que.scrollHeight;
        });
      }
    });
  },
  methods: {
    cancelUpload(){
      this.imgUploadWind=[]
      this.fileUploadQuu=[]
    },
    //保存文件 附件或者图片
    saveFileFall() {
      let file = this.$refs.eleFileNever.files[0];
      let data = new FormData();
      data.append("file", file);
      this.fileUploadingCount++
      this.axios.post(this.host + `index/save_file_fall`, data).then((res) => {
        if (res.success) {
          that.fileUploadingCount--
          let fileType = res.data.split(".")[1];
          //图片文件和附件分别保存
          if (imgTypeSent.includes(fileType)) {
            that.imgUploadWind.push(res.data);
          } else {
            that.fileUploadQuu.push(res.data);
          }
        }
      });
    },
    //滚动 节流
    queScrollHander(e) {
      if (this.$refs.que.scrollTop == 0) {
        if (lockScroll) return false;
        lockScroll = true;
        this.getChatRows(this.chatRows[0].chat_id, 0, true);
      }
    },
    //获取消息 is_after:是否是获取后面的 show_loading 是否展示加载中
    getChatRows(id, is_after = 1, show_loading = false) {
      if (show_loading) this.loading = true;
      lockAjax = true;
      this.axios
        .get(this.host + `index/get_chat_rows?is_after=${is_after}&id=${id}`)
        .then((res) => {
          that.loading = false;
          if (res.success) {
            lockScroll = false;
            lockAjax = false;
            if (res.data.length == 0) return;
            if (!is_after) {
              that.chatRows = res.data.concat(that.chatRows);
              that.$refs.que.scrollTop = 400;
            } else {
              that.chatRows = that.chatRows.concat(res.data);
              that.$nextTick(() => {
                that.$refs.que.scrollTop = that.$refs.que.scrollHeight;
              });
            }
          }
        });
    },
    //艾特
    atFriends(name){
      this.message+=` @${name} `
    },
    //发送消息
    saveMessageDis() {
      if (this.message.trim().length == 0) {
        return false;
      }
      this.axios
        .post(this.host + "index/save_mes_dis", {
          message: this.message,
          chat_file_arr: JSON.stringify(this.fileUploadQuu),
          chat_img_arr: JSON.stringify(this.imgUploadWind),
        })
        .then((res) => {
          if (res.success) {
            that.message = "";
            that.imgUploadWind=[]
            that.fileUploadQuu=[]
            that.fileUploadingCount=0
            if (!lockAjax) {
              that.getChatRows(
                that.chatRows[that.chatRows.length - 1].chat_id,
                1
              );
            }
          }
        });
    },
  },
};
</script>

<style lang='scss'>
.mes_keep_img {
  max-width: 200px;
  max-height: 200px;
}
.chat_que {
  position: absolute;
  top: 0px;
  right: 0;
  margin-top: 7px;
  height: calc(100% - 100px);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .bef {
    display: flex;
    justify-content: flex-start;
    min-height: 48px;
    align-items: flex-start;
        padding-right: 40%;
    word-break: break-all;
  }
  .nak {
    .speak {
      font-size: 14px;
      min-height: 20px;
      .mes_text_yo {
        letter-spacing: 2px;
        display: inline-block;
      }
    }
  }

  .hd_img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
    margin-left: 5px;
    border: var(--main) solid 1px;
    border-radius: 100px;
  }

  .aft {
    display: flex;
    justify-content: flex-end;
    min-height: 48px;
    margin-top: 7px;
    align-items: flex-start;
    padding-left: 40%;
    word-break: break-all;
  }
}
.chat_bam {
  border-top: 1px var(--lime) solid;
  height: 100px;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  box-sizing: content-box;
  overflow: hidden;
  textarea {
    width: calc(100% - 16px);
    height: 100px;
    border: 0;
    outline: none;
    resize: none;
    padding: 8px;
    letter-spacing: 1px;
    font-family: sans-serif;
    overflow: hidden;
  }
  .tips_inside {
    position: absolute;
    bottom: 4px;
    width: 300px;
    height: 20px;
    text-align: center;
    font-size: 10px;
    left: 50%;
    margin-left: -150px;
    span {
      color: var(--red);
    }
  }
  .moon {
    position: absolute;
    bottom: 4px;
    left: 6px;
    width: 50px;

    img {
      width: 24px;
      height: 24px;
    }
  }
  button {
    width: 68px;
    height: 20px;
    background: #fff;
    border: 1px solid var(--gray);
    position: absolute;
    bottom: 4px;
    right: 6px;
  }
}
.img_cloud {
  width: 64px;
  margin: 2px;
  height: 80px;
  flex-wrap: wrap;
  p {
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img {
    // border: 1px #bfbfbf solid;
    border-radius: 3px;
  }
}
</style>