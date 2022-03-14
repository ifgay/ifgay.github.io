<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="反馈类型" prop="report_type">
        <el-select v-model="form.report_type" placeholder="请选择反馈类型">
          <el-option label="bug反馈" value="1"></el-option>
          <el-option label="改进建议" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="report_maile" label="反馈内容">
        <el-input type="textarea" v-model="form.report_maile"></el-input>
      </el-form-item>
      <el-button type="primary" round>提交反馈</el-button>
    </el-form>

    
  </div>
</template>
<script>
export default {
  setup() {},
  data() {
    return {
      form: {
        report_maile: "",
        report_type: "1",
      },
      rules: {
        report_maile: [
          { required: true, message: "请输入你的反馈内容", trigger: "blur" },
          { min: 3, max: 125, message: "长度在 1 到 125 个字符" },
        ],
        report_type: [
          { required: true, message: "请选择反馈类型", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    reportMail() {
      let that = this;
      this.axios
        .post(this.host + "index/save_report_maile", this.form)
        .then((res) => {
          if (res.success) {
            that.$message({
              message: " (*￣(エ)￣)提交成功,谢谢的反馈。",
            });
          }
        });
    },
  },
};
</script>