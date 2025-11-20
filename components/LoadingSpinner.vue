<!-- components/LoadingSpinner.vue -->
<template>
  <view v-if="show" class="loading-overlay">
    <view class="spinner"></view>
    <text class="loading-text">加载中...</text>
  </view>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  onLoad() {
  	console.log("加载组件更新成功")
  }
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  --size: 30px;
  --first-block-clr: #0051a3;
  --second-block-clr: #fadd01;
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 20rpx;
}

.spinner::after,
.spinner::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  width: var(--size);
  height: var(--size);
  top: 50%;
  left: 50%;
  background: var(--first-block-clr);
  border-radius: 50%;
  animation: up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

.spinner::after {
  background: var(--second-block-clr);
  top: calc(50% - var(--size));
  left: calc(50% - var(--size));
  animation: down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes down {
  0%, 100% { transform: none; }
  25% { transform: translateX(100%); }
  50% { transform: translateX(100%) translateY(100%); }
  75% { transform: translateY(100%); }
}

@keyframes up {
  0%, 100% { transform: none; }
  25% { transform: translateX(-100%); }
  50% { transform: translateX(-100%) translateY(-100%); }
  75% { transform: translateY(-100%); }
}

.loading-text {
  font-size: 28rpx;
  color: #666;
}
</style>