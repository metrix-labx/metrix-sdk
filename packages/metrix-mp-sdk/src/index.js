import Event from './event';
import { processAppLaunchData, processRouteData } from './process';

export class WeMiniprogramPerformance {
  constructor(options = {}) {
    this.options = options;

    console.time('init');
    Promise.all([this.initSystemInfo(), this.initNetworkInfo()]).then((res) => {
      const [systemInfo, networkInfo] = res;
      this.baseInfo = {
        ...systemInfo,
        ...networkInfo,
      };
      console.log(this);
      console.timeEnd('init');

      this.initObserver();
    });
  }

  initObserver() {
    const performance = wx.getPerformance();
    const observer = performance.createObserver((entryList) => {
      const entries = entryList.getEntries();
      const data = entries.map((entry) => {
        if (entry.name === 'appLaunch') {
          return processAppLaunchData(entry);
        } else if (entry.name === 'route') {
          return processRouteData(entry);
        } else {
          return entry;
        }
      });
      console.log(data);
      console.log(JSON.stringify(data));
    });
    observer.observe({ entryTypes: ['render', 'script', 'navigation'] });
  }

  // 初始化网络类型信息
  initNetworkInfo() {
    return new Promise((resolve) => {
      wx.getNetworkType()
        .then((res) => {
          resolve({
            networkType: res.networkType,
          });
        })
        .catch((err) => {
          resolve({ networkType: 'unknown' });
        });
    });
  }

  // 初始化系统信息
  initSystemInfo() {
    return new Promise((resolve, reject) => {
      // 基础库 >= 2.14.1
      wx.getSystemInfoAsync({
        success(res) {
          const systemInfo = {
            // 设备品牌
            brand: res.brand,
            // 设备型号。新机型刚推出一段时间会显示unknown，微信会尽快进行适配。
            model: res.model,
            // 设备像素比
            pixelRatio: res.pixelRatio,
            // 屏幕宽度，单位px
            screenWidth: res.screenWidth,
            // 屏幕高度，单位px
            screenHeight: res.screenHeight,
            // 微信设置的语言
            language: res.language,
            // 微信版本号
            version: res.version,
            // 操作系统及版本
            system: res.system,
            // 客户端平台，ios/android/windows/mac
            platform: res.platform,
            // 客户端基础库版本
            SDKVersion: res.SDKVersion,
            /**
             * 设备性能等级（仅 Android）。取值为：
             * -2 或 0（该设备无法运行小游戏）
             * -1（性能未知）
             * >=1（设备性能值，该值越高，设备性能越好，目前最高不到50）
             */
            benchmarkLevel: res.benchmarkLevel,
            // 当前小程序运行的宿主环境
            host: res.host,
          };
          resolve(systemInfo);
        },
        fail() {
          resolve({});
        },
      });
    });
  }
}
