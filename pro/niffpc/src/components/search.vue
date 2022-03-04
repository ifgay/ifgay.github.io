<template>
  <div
    class="search_box"
    :style="{ border: isFocus ? '2px solid var(--main)' : '2px solid var(--light)',background:isFocus ? 'var(--light)' : 'var(--lime)' }"
  >
    <input type="text" @focus="isFocus = true" @blur="isFocus = false" :placeholder="placeholder" v-model="value" />

    <i class="el-icon-search" @click="$emit('submit',value)"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFocus: false,
      value:'',
    };
  },
  props:{
          placeholder:String,
  }
};
</script>

<style lang="scss">
.search_box {
  margin-left: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: var(--lime);
  padding-left: 12px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 14px;
  i {
    margin: 6px;
  }
  input {
    width: 200px;
    outline: none;
    border: none;
    background: none;
  }
}
</style>
