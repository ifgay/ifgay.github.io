<template>
  <div id="app">
    <div class="slide_left">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :color="activityIndex == index ? '#0bbd87' : ''"
        >
          <span @click="activityIndex = index">
            <a
              :href="'#' + activity.id"
              :style="{ color: activityIndex == index ? '#0bbd87' : '#000' }"
            >
              {{ activity.content }}
            </a>
          </span>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="right_main_box">
      <h1 id="one">#控制</h1>
      <el-alert
        title="过多的开始任务可能会导致错乱等问题!建议开始任务为一个"
        type="info"
      >
      </el-alert>
      <div class="mod_box">
        <el-card class="box_card">
          <div slot="header">
            <span>自动发送消息机器人</span>
            <el-button
              :style="{
                float: 'right',
                padding: '3px 0',
                color:
                  state.one.stateMes == '启动'
                    ? 'var(--info)'
                    : 'var(--danger)',
              }"
              type="text"
              @click.native="nomalStartProject(config.appid[0])"
              >{{ state.one.stateMes }}</el-button
            >
          </div>
          <small>
            适用于自动发送确定性的消息,
            模拟操作:复制消息(从队列中)->粘贴消息->回车;
            如果你想编辑自己的词库请<a href="#three-1">点击此处</a>编辑
          </small>
        </el-card>
        <el-card class="box_card">
          <div slot="header" class="clearfix">
            <span>敬请期待</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              href="#one"
              >启动</el-button
            >
          </div>
          无描述
        </el-card>
      </div>

      <h1 id="two">#日志</h1>
      <el-card
        class="box_card_log"
        style="background: black; color: white; border-radius: 10px"
      >
        <code v-for="(txt, index) in log" :key="index">
          >{{ txt }}{{ logLoading }}</code
        >
      </el-card>
      <h1 id="three">#配置</h1>

      <el-divider content-position="left">自动发送消息机器人</el-divider>

      <span id="three-1"></span>
      <el-form :model="config.one" label-width="100px">
        <el-form-item label="发送频率" prop="time">
          <el-input
            v-model="config.one.time"
            type="number"
            placeholder="秒每次"
          ></el-input>
        </el-form-item>
        <el-form-item label="词库编辑" prop="mesListByStr">
          <el-input
            type="textarea"
            v-model="config.one.mesListByStr"
            placeholder="词语之间使用#号隔开"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          style="float: right"
          @click="saveConfig"
          :loading="state.one.saveLoading"
          >{{ state.one.loadingMes }}</el-button
        >
      </el-form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 id="fore">#捐赠</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      state: {
        one: {
          stateMes: "启动",
          saveLoading: false,
          loadingMes: "保存",
        },
      },
      logLoading: ".",
      activityIndex: 0,
      activities: [
        {
          content: "控制",
          id: "one",
        },
        {
          content: "日志",
          id: "two",
        },
        {
          content: "配置",
          id: "three",
        },
        {
          content: "捐赠",
          id: "fore",
        },
      ],
      log: ["加载日志中..."],
      config: {
        appid: ["ufi43432kdkf"],
        one: {
          time: 3,
          mesListByStr: "",
          mesList: [],
        },
      },
    };
  },
  watch: {
    config(_, clear) {
      this.config.one.mesList = clear.one.mesListByStr.split("#");
    },
  },
  methods: {
    nomalStartProject(id) {
      let that = this;
      if (that.state.one.stateMes == "停止") {
        window.dieTrik(id);
        return;
      }
      const h = this.$createElement;
      this.$notify({
        title: "任务启动",
        message: h("i", { style: "color: teal" }, "任务启动中请等待..."),
      });

      window.launchTrik(id, (code) => {
        if (code == -1) {
          that.state.one.stateMes = "启动";
          that.$notify({
            title: "任务启动失败",
            message: h("i", { style: `color:var(--danger)` }, "原因请查看日志"),
          });
        }
        if (code == 1) {
          that.state.one.stateMes = "停止";
          that.$notify({
            title: "任务运行中",
            message: h("i", { style: `color:var(--success)` }, "任务已经启动"),
          });
        }
      });
    },
    saveConfig() {
      let that = this;
      const h = this.$createElement;
      that.state.one.loadingMes = "保存中...";
      that.state.one.saveLoading = true;
      window.updateConfig(this.config, (code) => {
        if (code == -1) {
          that.$notify({
            title: "错误",
            message: h(
              "i",
              { style: `color:var(--danger)` },
              "保存失败，详情查看日志"
            ),
          });
        }
        if (code == 1) {
          that.$notify({
            title: "保存成功",
            message: h(
              "i",
              { style: `color:var(--success)` },
              "你需要重新启动任务才能生效"
            ),
          });
        }
      });
      that.state.one.loadingMes = "保存";
      that.state.one.saveLoading = false;
    },
  },
  created() {
    let loadingChart = [".", "..", "...", "....", ".....", "......"];
    let countDerc = 7;
    setInterval(() => {
      countDerc++;
      if (countDerc == 10000000000000) countDerc = 7;
      this.logLoading = loadingChart[countDerc % 7];
    }, 800);
    let that = this;
    window.getConfig((config) => {
      that.config = config;
    });
  },
};
</script>

<style>
.slide_left {
  width: 160px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}
.right_main_box {
  width: calc(100vw - 181px);
  height: 100vh;
  padding: 10px;
  position: fixed;
  right: 0;
  top: 0;
  border-left: 1px solid #eee;
  overflow-y: scroll;
  overflow-x: hidden;
}
.box_card {
  width: 260px;
  margin: 10px;
  height: 200px;
}
.mod_box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.box_card_log {
  width: 90%;
  height: 200px;
  padding: 10px;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: scroll;
  word-break: break-all;
}
</style>
