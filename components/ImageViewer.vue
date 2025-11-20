<template>
  <view v-if="isPreviewVisible" class="image-viewer-overlay" @click="closePreview">
    <image 
      :src="'data:image/png;base64,' + currentImage" 
      class="image-viewer-image"
      @click.stop=""
    ></image>
  </view>
</template>

<script>
export default {
  props: {
    isPreviewVisible: {
      type: Boolean,
      required: true
    },
    currentImage: {
      type: String,
      required: true
    }
  },
  methods: {
    closePreview() {
      this.$emit('update:isPreviewVisible', false);
    }
  }
}
</script>

<style>
.image-viewer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.image-viewer-image {
  max-width: 90%;
  max-height: 90%;
}
</style>



