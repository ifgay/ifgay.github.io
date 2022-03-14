<template>
  <div v-infinite-scroll="getCommentList" infinite-scroll-disabled="disabled">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-card shadow="always">
          <div class="flex_between">
            <div class="flex_center">
              <img
                :src="`./icon/app-ico/${feAppInfo.fe_ico}.svg`"
                style="margin-right: 20px"
              />
              <div>
                <h3 style="display: inline">{{ feAppInfo.fe_name }}</h3>
                <br />
                {{ feAppInfo.fe_desc }}
                <br />
                <small style="color: var(--gray)"
                  >{{ feAppInfo.fe_tim }}次下载<el-rate
                    :value="parseInt(feAppInfo.fe_rate)"
                    disabled
                    show-score
                    allow-half
                    text-color="#ff9900"
                    score-template="{value}分"
                  >
                  </el-rate>
                </small>
              </div>
            </div>
            <el-button type="success" size="small" round>下载</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <br />
    <div class="detai_tab flex_center">
      <h2
        :style="{
          'border-bottom':
            tabActive == 0 ? '5px var(--main) solid' : '5px transparent solid',
        }"
        @mouseover="tabActive = 0"
      >
        详情
      </h2>
      <el-badge :value="feAppInfo.comment_count" :max="99">
        <h2
          :style="{
            'border-bottom':
              tabActive == 1
                ? '5px var(--main) solid'
                : '5px transparent solid',
          }"
          @mouseover="tabActive = 1"
        >
          评论
        </h2>
      </el-badge>
    </div>
    <br />
    <div
      v-if="tabActive == 0"
      class="box_deta"
      v-html="feAppInfo.fe_readme"
    ></div>
    <div v-if="tabActive == 1" class="box_deta">
      <el-form
        :model="formData"
        :rules="rulesComment"
        ref="formByComment"
        label-width="100px"
      >
        <h3 class="flex_start">
          我的评分:<el-rate v-model="formData.feRate"></el-rate>
        </h3>
        <br />
        <el-form-item prop="feCommentContent">
          <el-input
            type="textarea"
            placeholder="留下你的评论..."
            v-model="formData.feCommentContent"
          ></el-input>
        </el-form-item>
        <span style="float: right" class="ch_bt_submi">
          <el-button
            type="default"
            size="small"
            round
            @click.native="subMitComment"
            >发表评价</el-button
          >
        </span>
      </el-form>
      <br />
      <br />

      <div v-for="(item, index) in feComment" :key="index">
        <div class="comment_item flex_between">
          <div class="comment_info">
            <div class="flex_start">
              <img :src="`./icon/hd/${item.user_hd}.svg`" class="df_img" />
              <small>{{ item.nikname }}</small
              >&nbsp;&nbsp;<small>{{ item.comment_time }}</small>
            </div>

            <span style="font-size: 13px">
              {{ item.comment_content }}
            </span>
          </div>
          <div class="right_col_comm">
            <el-rate
              :value="parseInt(item.comment_rate)"
              allow-half
              disabled
              text-color="#ff9900"
            >
            </el-rate>
            <span class="col_l">
              <p class="flex_center" @click="niceAddPush(item.id)">
                <img
                  src="../assets/nice.svg"
                  v-if="activeNiceCommentId != item.id"
                />
                <img
                  src="../assets/nice-a.svg"
                  v-if="activeNiceCommentId == item.id"
                />
                <span>{{ item.comment_nice }}</span>
              </p>
              <p
                class="flex_center"
                @click="replyEditOpen(item.id, item.nikname)"
              >
                <img src="../assets/comment.svg" /><span>回复</span>
              </p>
            </span>
          </div>
        </div>

        <div
          class="comment_item flex_between comment_child"
          style="width: calc(100% - 44px); margin-left: 44px; opacity: 1"
          v-for="(child, k) in item.children"
          :key="k"
        >
         
          <div class="comment_info">
            <div class="flex_start">
               <img :src="`./icon/hd/${child.user_hd}.svg`" class="df_img" />
              <small
                >{{ child.nikname
                }}{{
                  child.is_reply ? "回复" + child.face_user_name : ""
                }}</small
              >&nbsp;&nbsp;<small>{{ child.comment_time }}</small>
            </div>
            <span style="font-size: 13px">
              {{ child.comment_content }}
            </span>
          </div>
          <div class="right_col_comm">
            <el-rate
              :value="parseInt(child.comment_rate)"
              disabled
              allow-half
              text-color="#ff9900"
              style="color: #fff"
            >
            </el-rate>
            <span class="col_l">
              <p class="flex_center" @click="niceAddPush(child.id)">
                <img
                  src="../assets/nice.svg"
                  v-if="activeNiceCommentId != child.id"
                />
                <img
                  src="../assets/nice-a.svg"
                  v-if="activeNiceCommentId == child.id"
                />

                <span>{{ child.comment_nice }}</span>
              </p>
              <p
                class="flex_center"
                @click="replyEditOpen(item.id, child.nikname)"
              >
                <img src="../assets/comment.svg" /><span>回复</span>
              </p>
            </span>
          </div>
        </div>
        <div
          class="comment_item flex_center comment_child"
          style="min-height: 20px"
          v-if="item.children.length % 5 == 0 && item.children.length != 0"
        >
          <small
            style="color: var(--main)"
            @click="loadMoreCommentPull(item.id, index)"
          >
            <i class="el-icon-arrow-down" v-if="!loadMoreCommentGrant"></i>
            <i class="el-icon-loading" v-if="loadMoreCommentGrant"></i>
            查看更多
          </small>
        </div>
        <div
          class="comment_item flex_center comment_child"
          style="min-height: 20px"
          v-if="item.children.length % 5 != 0 && item.children.length > 5"
        >
          <small
            style="color: var(--gray)"
            @click="loadMoreCommentPull(item.id, index)"
          >
            已加载全部
          </small>
        </div>
        <el-divider content-position="right"></el-divider>
      </div>

      <p v-if="loading" class="flex_center">
        <i class="el-icon-loading"></i>加载中....
      </p>
    </div>

    <el-dialog
      :visible.sync="dialogReplyVisible"
      :modal="false"
      :title="`回复给${replyUserForm.faceToName}`"
      width="50%"
    >
      <el-form :model="replyUserForm" :rules="rulesReply" ref="formByReply">
        <el-form-item prop="feCommentContent">
          <el-input
            type="textarea"
            placeholder="这是回复内容"
            v-model="replyUserForm.feCommentContent"
          ></el-input>
        </el-form-item>

        <span style="float: right" class="ch_bt_submi">
          <el-button
            type="default"
            size="small"
            round
            @click.native="subMitCommentReply"
            >回复</el-button
          >
        </span>
        <br />
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
let that;
export default {
  created() {
    that = this;
    this.getFeDetails();
  },
  methods: {
    getFeDetails() {
      this.axios
        .get(
          this.host + `vitor/fe_details_own?id=${this.$route.params.id || 1}`
        )
        .then((res) => {
          that.feAppInfo = res.data;
        });
    },
    niceAddPush(commentId) {
      this.feComment.forEach((val, i) => {
        if (val.id == commentId) {
          that.feComment[i].comment_nice++;
        }
        val.children.forEach((ch, o) => {
          if (ch.id == commentId) {
            that.feComment[i].children[o].comment_nice++;
          }
        });
      });
      this.activeNiceCommentId = commentId;
      this.axios.get(this.host + `index/inc_comment_nice?id=${commentId}`);
    },
    loadMoreCommentPull(itemId, itemIndex) {
      if (this.loadMoreCommentGrant) return;
      this.loadMoreCommentGrant = true;
      let pageIndexCommentArea = Math.floor(
        this.feComment[itemIndex].children.length / 5
      );
      this.axios
        .get(
          this.host +
            `vitor/get_comment_reply?page=${
              (pageIndexCommentArea == 0 ? 1 : pageIndexCommentArea) + 1
            }&size=5&id=${itemId}`
        )
        .then((res) => {
          that.loadMoreCommentGrant = false;
          that.feComment[itemIndex].children = that.feComment[
            itemIndex
          ].children.concat(res.data);
        });
    },
    parseInt: (v) => {
      return window.parseInt(v);
    },
    getCommentList() {
      this.disabled = true;
      this.axios
        .get(
          this.host +
            `vitor/get_comment_list?id=${that.feId}&page=${this.page}&size=7`
        )
        .then((res) => {
          that.disabled = false;
          if (res.data.length < 7) {
            that.disabled = true;
          }
          that.page++;
          that.feComment = that.feComment.concat(res.data);
          that.getFeDetails();
        });
    },
    subMitCommentReply() {
      let feTruans = {
        comment_parent_id: this.replyUserForm.parentId,
        comment_content: this.replyUserForm.feCommentContent,
        is_reply: 1,
        face_user_name: this.replyUserForm.faceToName,
        fe_id: this.feId,
        comment_rate: 2.5,
        //comment_time:'',
      };

      this.$refs.formByReply.validate((valid) => {
        if (valid) {
          this.axios
            .post(this.host + `index/save_user_comment`, feTruans)
            .then((res) => {
              that.$message({
                type: "success",
                message: "回复已发送!",
              });
              that.feComment = [];
              that.page = 1;
              that.getCommentList(1);
              that.dialogReplyVisible = false;
            });
        }
      });
    },
    replyEditOpen(parentId, faceName) {
      this.replyUserForm.faceToName = faceName;
      this.dialogReplyVisible = true;
      this.replyUserForm.parentId = parentId;
    },
    subMitComment() {
      let feTruans = {
        comment_parent_id: "",
        comment_content: this.formData.feCommentContent,
        is_reply: 0,
        face_user_name: "",
        fe_id: this.feId,
        comment_rate: this.formData.feRate,
        //comment_time:'',
      };

      this.$refs.formByComment.validate((valid) => {
        if (valid) {
          this.axios
            .post(this.host + `index/save_user_comment`, feTruans)
            .then((res) => {
              that.$message({
                type: "success",
                message: "评论发表成功!",
              });
              that.feComment = [];
              that.page = 1;
              that.getCommentList(1);
            });
        }
      });
    },
  },
  data() {
    return {
      replyUserForm: {
        feCommentContent: "",
        faceToName: "",
        parentId: "",
      },
      dialogReplyVisible: false,
      loadMoreCommentGrant: false,
      loading: false,
      page: 1,
      disabled: false,
      feId: this.$route.params.id || 1,
      tabActive: 0,
      activeNiceCommentId: -1,
      feAppInfo: {
        fe_name: "",
        fe_rate: 0,
        fe_ico: 1,
      },
      formData: {
        feCommentContent: "",
        feRate: 5,
      },
      feComment: [],
      rulesReply: {
        feCommentContent: [
          { required: true, message: "评论内容不能为空" },
          { min: 3, max: 125, message: "长度在 1 到 125 个字符" },
        ],
      },
      rulesComment: {
        feCommentContent: [
          { required: true, message: "评论内容不能为空" },
          { min: 3, max: 125, message: "长度在 1 到 125 个字符" },
        ],
      },
    };
  },
};
</script>
<style lang='scss'>
.detai_tab {
  h2 {
    margin-right: 14px;
  }
}
.box_deta {
  width: 83.33333%;
  margin-left: 8.33333%;
  .el-form-item__content {
    margin-left: 0 !important;
  }
  overflow: scroll;
}
.comment_child {
  .el-rate {
    opacity: 0;
  }
}
.comment_item {
  min-height: 70px;
  .comment_info {
    width: 73%;
    word-break: break-all;
  }
  .df_img {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
  .right_col_comm {
    color: var(--main);
    .col_l {
      width: 120px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;
      span {
        margin-right: 3px;
      }
    }
  }
}
.ch_bt_submi .el-button--default {
  background: var(--main);
  color: var(--light);
  border: none;
  box-shadow: none;
}
</style>