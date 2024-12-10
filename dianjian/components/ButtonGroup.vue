<template>
  <view class="button-group">
    <view v-for="(button, index) in buttons" :key="index" class="ZujianButton-item">
      <button :disabled="button.disabled" @click="handleClick(button.action)" class="ZujianButton">{{ button.label }}</button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array,
      required: true
    }
  },
  methods: {
    // 处理按钮点击事件
    handleClick(action) {
      if (typeof action === 'function') {
        action();
      }
    }
  }
}
</script>

<style scoped>
.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

/* 组件按钮容器样式 */
.ZujianButton-item {
  width: 32%;
  margin-bottom: 20rpx;
}

/* 组件按钮样式 */
.ZujianButton {
  width: 100%;
  aspect-ratio: 1 / 1; /* 保持宽高比为 1:1 */
  background-color: white;
  color: black;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; /* 确保内容垂直居中 */
  padding: 10px; /* 可以根据需要调整内边距 */
  line-height: 1.2; /* 调整行距 */
}

.ZujianButton:disabled {
  background-color: white;
  color: black;
  cursor: not-allowed;
}

.ZujianButton:active {
  background-color: #005bb5;
}
</style>