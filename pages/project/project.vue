<template>
  <view class="container">
    <navbar :username="username" @logout="logout"/>
    <view class="title">{{ inspectionPoint.name }} > {{ currentProject }}</view>
    <view class="content">
      <view v-if="currentItem">
        <view class="item">
          <!-- 点检内容描述 -->
          <view class="item-title">{{ currentItem.Description }}</view>
          <!-- 选择结果 -->
          <view class="form-group">
            <label>选择结果：</label>
            <view class="button-group">
              <button :class="{'selButton': true, 'selected': currentItem.flag === 'OK'}" @click="handleFlagChange('OK')">
                <image src="../../static/dui.png" class="icon-image" />
              </button>
              <button :class="{'selButton': true, 'selected': currentItem.flag === '有问题，但已经解决'}" @click="handleFlagChange('有问题，但已经解决')">
                <image src="../../static/NT.png" class="icon-image" />
              </button>
              <button :class="{'selButton': true, 'selected': currentItem.flag === 'NG'}" @click="handleFlagChange('NG')">
                <image src="../../static/cuo.png" class="icon-image" />
              </button>
            </view>
          </view>

          <!-- 点检说明 -->
          <view class="form-group">
            <label>点检说明：</label>
            <input type="text" v-model="currentItem.remarks" class="input" />
          </view>

          <!-- 上传图片 -->
          <view class="form-group">
            <label>上传图片：</label>
            <button @click="uploadImage" class="button">+</button>
            <view v-if="currentItem.images && currentItem.images.length > 0">
              <view v-for="(image, index) in currentItem.images" :key="index" class="image-preview">
                <image :src="image" class="preview-image" />
                <button @click="deleteImage(index)" class="delete-button">X</button>
              </view>
            </view>
          </view>

          <!-- 上一项和下一项按钮 -->
          <view class="button-group">
            <button @click="prevItem" :disabled="currentItemIndex === 0" class="button">上一项</button>
            <button @click="nextOrFinishItem" class="button">{{ currentItemIndex === inspectionItems.length - 1 ? '点检成功' : '下一项' }}</button>
          </view>
        </view>
      </view>
      <view v-else>
        <!-- 完成信息显示 -->
        <view class="message">所有点检项目完成</view>
      </view>
    </view>
  </view>
</template>


<script>
import Navbar from '@/components/Navbar.vue';

/**
 * 图片地址转换为base64格式图片
 * @param {string} url 图片地址 可网络地址、本地相对路径
 * @param {string} type base64图片类型 默认png
 */
/**
 * 图片地址转换为base64格式图片 - 支持鸿蒙系统
 * @param {string} url 图片地址 可网络地址、本地相对路径、鸿蒙媒体路径
 * @param {string} type base64图片类型 默认png
 */
function urlToBase64(url, type = 'png') {
  if (typeof url !== 'string' || url.trim() === '') {
    return Promise.reject(new Error('Invalid URL'));
  }

  return new Promise((resolve, reject) => {
    if (url.startsWith('http')) {
      // 网络地址 使用request方式
      uni.request({
        url: url,
        method: 'GET',
        responseType: 'arraybuffer',
        success: (res) => {
          const base64 = `data:image/${type};base64,${uni.arrayBufferToBase64(res.data)}`;
          resolve(base64);
        },
        fail: (err) => {
          reject(new Error(`Request failed: ${err}`));
        }
      });
    } else if (url.startsWith('file://media/Photo/')) {
      // 鸿蒙系统媒体文件路径
      // #ifdef APP-PLUS
      // 鸿蒙系统特殊处理
      plus.io.resolveLocalFileSystemURL(url, (entry) => {
        entry.file((file) => {
          const reader = new plus.io.FileReader();
          reader.onload = function(e) {
            resolve(e.target.result);
          };
          reader.onerror = function(error) {
            // 如果FileReader失败，尝试其他方法
            console.error('FileReader failed:', error);
            // 尝试使用uni.compressImage处理
            uni.compressImage({
              src: url,
              quality: 100,
              success: (res) => {
                const tempPath = res.tempFilePath;
                plus.io.resolveLocalFileSystemURL(tempPath, (entry2) => {
                  entry2.file((file2) => {
                    const reader2 = new plus.io.FileReader();
                    reader2.onload = function(e2) {
                      resolve(e2.target.result);
                    };
                    reader2.onerror = function(error2) {
                      reject(new Error(`File read failed: ${error2.message}`));
                    };
                    reader2.readAsDataURL(file2);
                  }, (error2) => {
                    reject(new Error(`File resolution failed: ${error2.message}`));
                  });
                }, (error2) => {
                  reject(new Error(`File resolution failed: ${error2.message}`));
                });
              },
              fail: (err) => {
                reject(new Error(`Compress image failed: ${err}`));
              }
            });
          };
          reader.readAsDataURL(file);
        }, (error) => {
          reject(new Error(`File resolution failed: ${error.message}`));
        });
      }, (error) => {
        reject(new Error(`File resolution failed: ${error.message}`));
      });
      // #endif
      
      // #ifdef APP-PLUS-HARMONY
      // 鸿蒙系统专用处理
      try {
        // 使用鸿蒙特有的文件处理方式
        const fs = weex.requireModule('stream');
        // 或者使用uni-app提供的鸿蒙文件API
        uni.getFileSystemManager().readFile({
          filePath: url,
          encoding: 'base64',
          success: (res) => {
            const base64 = `data:image/${type};base64,${res.data}`;
            resolve(base64);
          },
          fail: (error) => {
            console.error('鸿蒙读取文件失败:', error);
            // 如果直接读取失败，尝试先复制到临时路径
            const tempPath = `_doc/temp_${Date.now()}.${type}`;
            uni.saveFile({
              tempFilePath: url,
              filePath: tempPath,
              success: (saveRes) => {
                uni.getFileSystemManager().readFile({
                  filePath: saveRes.savedFilePath,
                  encoding: 'base64',
                  success: (readRes) => {
                    const base64 = `data:image/${type};base64,${readRes.data}`;
                    resolve(base64);
                  },
                  fail: (readError) => {
                    reject(new Error(`鸿蒙文件读取失败: ${readError.errMsg}`));
                  }
                });
              },
              fail: (saveError) => {
                reject(new Error(`鸿蒙文件保存失败: ${saveError.errMsg}`));
              }
            });
          }
        });
      } catch (e) {
        reject(new Error(`鸿蒙系统处理失败: ${e.message}`));
      }
      // #endif
    } else {
      // Android或其他系统本地路径
      // #ifdef APP-PLUS
      uni.compressImage({
        src: url,
        quality: 100,
        success: (res) => {
          const tempUrl = res.tempFilePath;
          plus.io.resolveLocalFileSystemURL(tempUrl, (entry) => {
            entry.file((e) => {
              let fileReader = new plus.io.FileReader();
              fileReader.onload = (r) => {
                resolve(r.target.result);
              };
              fileReader.onerror = (error) => {
                reject(new Error(`File resolution failed: ${error.message}`));
              };
              fileReader.readAsDataURL(e);
            }, (error) => {
              reject(new Error(`File resolution failed: ${error.message}`));
            });
          }, (error) => {
            reject(new Error(`File resolution failed: ${error.message}`));
          });
        },
        fail: (err) => {
          reject(new Error(`Compress image failed: ${err}`));
        }
      });
      // #endif

      // #ifndef APP-PLUS
      reject(new Error('This method is only supported in the APP environment for local files.'));
      // #endif
    }
  });
}

export default {
  components: {
    Navbar
  },
  data() {
    return {
      username: uni.getStorageSync('username') || '',
      inspectionPoint: { id: '', name: '' },
      inspectionItems: [], // 初始化为空数组
      currentItemIndex: 0,
      currentProject: ''
    };
  },
  onLoad(options) {
    // 初始化检查点信息
    this.inspectionPoint.id = options.id;
    this.inspectionPoint.name = options.name;
    const token = uni.getStorageSync('token');
    // 加载点检详情
    this.loadInspectionDetails(this.inspectionPoint.id, token);

  },
  onPullDownRefresh() {
    // 处理下拉刷新
    const id = this.inspectionPoint.id;
    const token = uni.getStorageSync('token');
    if (!id) {
      console.error('id 参数为空');
      uni.stopPullDownRefresh(); // 停止下拉刷新
      return;
    }
    this.loadInspectionDetails(id, token, () => {
      uni.stopPullDownRefresh(); // 停止下拉刷新动作
    });
  },
  computed: {
    // 计算当前项
    currentItem() {
      return this.inspectionItems[this.currentItemIndex] || null;
    }
  },
  methods: {
    // 加载点检详情
    loadInspectionDetails(id, token, callback) {
      if (!id) {
        console.error('id 参数为空');
        return;
      }
      console.log('请求参数:', { code: id, token: token });
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/GetCheckListDetailNew',
        method: 'POST',
        data: {
          code: id,
          token: token
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          if (!data.isError) {
            this.inspectionItems = data.dt.map(item => ({
              ...item,
              remarks: '',
              images: [], // 初始化 images 数组
              flag: '' // 初始值为空
            }));
            this.currentProject = this.inspectionItems[0]?.Project || '';
            console.log('点检详情加载成功:', this.inspectionItems);
          } else {
            console.error('加载点检详情失败:', data.message);
          }
          if (callback) callback(); // 确保回调被调用
        },
        fail: (err) => {
          console.error('加载点检详情失败:', err);
          if (callback) callback(); // 确保回调被调用
        }
      });
    },
    // OK, NT, NG 选择结果
    handleFlagChange(flag) {
      this.currentItem.flag = flag;
    },
    // 上一项
    prevItem() {
      if (this.currentItemIndex > 0) {
        this.currentItemIndex--;
        this.currentProject = this.inspectionItems[this.currentItemIndex].Project;
      }
    },
 // 下一项或完成检查
 nextOrFinishItem() {
   if (this.currentItem.flag) {
     if (this.currentItem.flag === 'NG') {
       if (!this.currentItem.remarks.trim()) {
         uni.showToast({
           title: '请填写点检说明',
           icon: 'none'
         });
         return;
       }
       if (!this.currentItem.images || this.currentItem.images.length === 0) {
         uni.showToast({
           title: '请上传至少一张图片',
           icon: 'none'
         });
         return;
       }
     } else if (this.currentItem.flag === '有问题，但已经解决') {
       if (!this.currentItem.remarks.trim()) {
         uni.showToast({
           title: '请填写点检说明',
           icon: 'none'
         });
         return;
       }
     }
 
     if (this.currentItemIndex < this.inspectionItems.length - 1) {
       this.nextItem();
     } else {
       console.log('当前 inspectionItems:', this.inspectionItems);
       this.saveInspection();
     }
   } else {
     uni.showToast({
       title: '请先选择结果',
       icon: 'none'
     });
   }
 },
    // 下一项
    nextItem() {
      if (this.currentItemIndex < this.inspectionItems.length - 1) {
        this.currentItemIndex++;
        this.currentProject = this.inspectionItems[this.currentItemIndex].Project;
      }
    },
    // 选择图片
    uploadImage() {
      uni.chooseImage({
        count: 9, // 支持最多选择9张图片
        success: (res) => {
          if (res.tempFilePaths.length > 0) {
            if (!this.currentItem.images) {
              this.$set(this.currentItem, 'images', []);
            }
            this.convertImagesToBase64(res.tempFilePaths); // 转换为 Base64 编码
          }
        },
        fail: (err) => {
          console.error('选择图片失败:', err);
        }
      });
    },
	
// 将图片路径转换为 Base64 编码
convertImagesToBase64(imagePaths) {
  const promises = imagePaths.map(imagePath => {
    return urlToBase64(imagePath).catch(err => {
      console.error('转换图片失败，使用原始路径:', err, imagePath);
      // 如果转换失败，直接使用原始路径
      return imagePath;
    });
  });

  Promise.all(promises).then(base64Images => {
    // 更新 images 数组中的 Base64 编码
    this.currentItem.images.push(...base64Images);
    console.log('图片路径数组:', this.currentItem.images);
    this.$forceUpdate(); // 强制更新视图
  }).catch(err => {
    console.error('转换图片为 Base64 编码失败:', err);
  });
},
    // 删除图片
    deleteImage(index) {
      this.currentItem.images.splice(index, 1);
    },
    // 保存点检详情
    saveInspection() {
      if (!this.inspectionItems || !this.inspectionItems.length) {
        console.error('inspectionItems 未定义或为空');
        return;
      }

      uni.showLoading({
        title: '正在上传数据...'
      });

      const token = uni.getStorageSync('token');
      const inspectionData = {
        token: token,
        list: this.inspectionItems.map(item => {
          const now = new Date();
          const formattedTime = `${now.getFullYear()}:${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}:${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
          return {
            ID: item.ID,
            Time: formattedTime,
            Flag: item.flag || 'NG',
            FileList: (item.images || []).map(image => image), // 确保 FileList 包含 Base64 编码
            Remark: item.remarks || ''
          };
        })
      };

      console.log('发送到 SaveDetail 接口的数据:', inspectionData);

      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/SaveDetail',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: inspectionData,
        success: (res) => {
          console.log('第一次请求返回数据为:', res.data); // 打印原始响应数据
          if (typeof res.data === 'string') {
            try {
              const data = JSON.parse(res.data);
              if (!data.isError) {
                const docnum = data.docnum;
                this.saveFinalResult(docnum, token);
              } else {
                uni.showToast({
                  title: data.msg || '保存失败',
                  icon: 'none'
                });
                console.error('保存点检详情失败:', data.msg);
              }
            } catch (parseError) {
              console.error('解析第一次请求返回数据时出错:', parseError);
            }
          } else {
            console.error('第一次请求响应数据不是字符串:', res.data);
          }
        },
        fail: (err) => {
          console.error('保存点检详情失败:', err);
        }
      });
    },
    // 保存最终的检查结果
    saveFinalResult(docnum, token) {
      uni.request({
        url: 'http://13.94.38.44:8080/CheckList/SaveDetail2',
        method: 'POST',
        data: {
          docnum: docnum,
          token: token
        },
        success: (res) => {
          console.log('第二次请求返回数据为:', res.data); // 打印原始响应数据
          if (typeof res.data === 'string') {
            try {
              const result = JSON.parse(res.data);
              if (!result.IsError) {
                uni.showToast({
                  title: '检查成功',
                  icon: 'success'
                });
                uni.redirectTo({
                  url: '/pages/home/home'
                });
              } else {
                uni.showToast({
                  title: result.msg,
                  icon: 'none'
                });
                console.error('保存检查结果失败:', result.msg);
              }
            } catch (parseError) {
              console.error('解析第二次请求返回数据时出错:', parseError);
            }
          } else {
            console.error('第二次请求响应数据不是字符串:', res.data);
          }
        },
        fail: (err) => {
          console.error('保存检查结果失败:', err);
        }
      });
    },
    // 退出登录
    logout() {
      uni.removeStorageSync('username');
      uni.redirectTo({
        url: '/pages/login/login'
      });
    }
  }
}
</script>

<style scoped>
.container {
	
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}
.content {
	width: 100%%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
 
}
.title {
  font-size: 40rpx;
  margin:40rpx 20rpx;
}
.image-preview {
  position: relative;
  display: inline-block;
  margin: 20rpx;
}
.preview-image {
  width: 160rpx;
  height: 160rpx;
}
.delete-button {
 position: absolute;
   top: 0;
   right: 0;
   width: 60rpx;
   height: 60rpx;
   background-color: red;
   color: white;
   border: none;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
}

.item {
  width: 600rpx;
  padding: 40rpx;
  background-color: #fff;
  box-shadow: 0 0 20rpx rgba(0,0,0,0.1);
  border-radius: 20rpx;
  margin-bottom: 40rpx;
}
.item-title {
  font-size: 40rpx;
  margin-bottom: 40rpx;
}
.form-group {
  margin-bottom: 30rpx;
  
}
.input {
  width: 93%;
  padding: 20rpx;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
}
.button-group{
	display: flex;
	justify-content: space-between;
}
.Picbutton{
	width: 90%;
	padding: 20rpx;
	background-color: #007aff;
	color: #fff;
	text-align: center;
	border: none;
	border-radius: 10rpx;
	cursor: pointer;
}
.button {
  width: 40%;
  padding: 20rpx;
  background-color: #007aff;
  color: #fff;
  text-align: center;
  border: none;
  border-radius: 10rpx;
  cursor: pointer;
}
.selButton {
  width: 100rpx; /* 设置固定宽度 */
  height: 100rpx; /* 设置固定高度 */
  margin: 10rpx;
  background-color: white; /* 默认灰色 */
  color: #fff;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 50%; /* 圆形按钮 */
  cursor: pointer;
  display: flex; /* Flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  overflow: hidden; /* 防止内容超出圆形边界 */
}
.selButton.selected {
  background-color: #007aff; /* 选择后蓝色 */
}
.icon-image {
  max-width: 100%; /* 图片最大宽度 */
  max-height: 44rpx; /* 图片最大高度 */
  border-radius: 50%; /* 确保图片也是圆形 */
}



.uploaded-image {
  width: 200rpx;
  height: 200rpx;
  margin-top: 20rpx;
}
.message {
  font-size: 36rpx;
  color: #333;
  margin-bottom: 40rpx;
}
.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.button:active {
  background-color: #005bb5;
}
</style>
