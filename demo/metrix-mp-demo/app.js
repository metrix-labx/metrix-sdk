const {
  WeMiniprogramPerformance
} = require('@metrix/metrix-mp-sdk');
const client = new WeMiniprogramPerformance({
  appId: 'd83010aa-4d89-16ec-a1da-70b1ba7c0078',
});

// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
  globalData: {
    userInfo: null,
  },
});