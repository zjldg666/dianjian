<template>
  <view class="navbar">
    <view class="logoBox">
      <image class="logo" src="../static/logo.png" mode="heightFix"></image>
    </view>
    
    <!-- 只有当username存在时才显示用户名和退出按钮 -->
    <template v-if="username">
      <view class="username">{{ username }}</view>
      <button @click="$emit('logout')" class="nabutton">退出</button>
    </template>
  </view>
</template>

<script >
export default {
  props: {
    username: {
      type: String,
      default: null // 设置默认值为null，便于判断
    }
  }
}
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 90rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 1;
  background: white;
  color: black;
  border-bottom: 1px solid #ccc; 
}
.logoBox {
  position: absolute;
  left: 32rpx;
  top: 14rpx;
  width: 60rpx;
  height: 60rpx;
  opacity: 1;
}
.logo {
  height: 60rpx;
}
.username {
  margin-right: 20rpx; /* 增加间距，使布局更合理 */
  font-size: 28rpx;
}
.nabutton {
  margin: 10rpx;
  padding: 0;
  width: 180rpx;
  background-color: white;
  color: black;
  box-shadow: 0 0 20rpx rgba(0,0,0,0.1);
  cursor: pointer;
  font-size: 28rpx;
}
/* 修复按钮激活状态的类名错误 */
.nabutton:active {
  background-color: white;
  color: white;
   transform: scale(0.95) rotateZ(1.7deg);
}
</style>
