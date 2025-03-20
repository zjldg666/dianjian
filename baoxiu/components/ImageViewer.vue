<template>
  <view v-if="visible" class="image-viewer" @click.self="closeViewer">
    <!-- 关闭按钮 -->
    <view class="close-btn" @click.stop="closeViewer">X</view>
    <image :src="currentImage" class="preview-image"></image>
  </view>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentImage: {
      type: String,
      required: true
    },
    onClose: {
      type: Function,
      required: true // 确保父组件传递了一个关闭方法
    }
  },
  methods: {
    closeViewer() {
      this.onClose(); // 直接调用父组件提供的关闭方法
    }
  }
};
</script>


<style scoped>
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 确保在最上层 */
}

.preview-image {
  max-width: 90%;
  max-height: 90%; /* 调整为略小于100%以便留出空间给关闭按钮 */
}

/* 添加样式用于关闭按钮 */
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001; /* 确保关闭按钮在图片之上 */
}
</style>