import { uniRequest } from '@dcloudio/uni-app';

export const uniRequest = async (options) => {
  const { url, method, data } = options;
  const response = await uni.request({
    url,
    method,
    data
  });
  return response;
};