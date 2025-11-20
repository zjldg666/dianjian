<template>
  <view class="button-group">
    <view v-for="(button, index) in buttons" :key="index" class="ZujianButton-item">
      <button :disabled="button.disabled" @click="handleClick(button.action)" class="ZujianButton">
        <image v-if="button.image" :src="button.image" class="button-image"></image>
        {{ button.label }}
        <span v-if="button.badge" class="badge">{{ button.badge }}</span>
      </button>
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
   /* 可以根据需要调整内边距 */
  line-height: 1.2; /* 调整行距 */
  position: relative; /* 添加相对定位以便 badge 定位 */
}

.ZujianButton:disabled {
  background-color: white;
  color: black;
  cursor: not-allowed;
}

.ZujianButton:active {
  transform: scale(0.95) rotateZ(1.7deg);
}

/* 添加 badge 样式 */
.ZujianButton .badge {
  position: absolute;
  top: 15rpx;
  right: 15rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: red;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 40rpx;
  font-size: 24rpx;
}

/* 图片样式 */
.button-image {
  width:170rpx;
  height: 170rpx;
  margin-bottom: 10rpx;
}
</style>