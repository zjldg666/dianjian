<template>
  <view class="navbar">
    <view class="logoBox">
      <image class="logo" src="../static/logo.png" mode="heightFix"></image>
    </view>
    <view class="username">{{ username }}</view>
    <button @click="$emit('logout')" class="nabutton">退出</button>
  </view>
</template>

<script >
export default {
  props: {
    username: String
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
  background: white; /* 设置背景色为固定颜色 */
  color: black;
 
    border-bottom: 1px solid  #ccc ; 
}
.logoBox {
  position: absolute;
  left: 16px;
  top: 7px;
  width: 30px;
  height: 30px;
  opacity: 1;
}
.logo {
  height: 30px;
}
.username {}
.nabutton {
  margin:10rpx;
  padding: 0;
  width: 180rpx;
  background-color: white;
  color: black;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  cursor: pointer;
}
.button:active {
  background-color: #c32f27;
}
</style>
