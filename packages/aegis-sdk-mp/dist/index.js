'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Event {
  constructor() {
    this.eventsMap = {};
  }

  /**
   * 添加监听事件
   * @param {String} name 事件名
   * @param {Function} callback 事件回调函数
   * @param {Object} context 事件执行上下文对象
   */
  on(name, callback, context) {
    this.eventsMap[name] = this.eventsMap[name] || [];
    this.eventsMap[name].push({
      callback,
      context,
      ctx: context || this,
    });
    return this;
  }

  /**
   * 移除事件监听
   * @param {String} name 可选，事件名
   * @param {Function} callback 可选，事件回调函数
   * @param {Object} context 可选，事件执行上下文对象
   */
  off(name, callback, context) {
    if (!name && !callback && !context) {
      this.eventsMap = {};
      return this;
    }
    const events = this.eventsMap[name];
    if (events && events.length > 0) {
      const retain = [];
      if (callback || context) {
        for (let j = 0; j < events.length; j++) {
          const ev = events[j];
          if (
            (callback && callback !== ev.callback && callback !== ev.callback._callback) ||
            (context && context !== ev.context)
          ) {
            retain.push(ev);
          }
        }
        if (retain.length === 0) {
          delete this.eventsMap[name];
        } else {
          this.eventsMap[name] = retain;
        }
      } else {
        delete this.eventsMap[name];
      }
    }
    return this;
  }

  /**
   * 触发事件
   * @param {String} name 事件名
   * @param  {...any} args 参数
   */
  trigger(name, ...args) {
    const events = this.eventsMap[name];
    if (events && events.length > 0) {
      events.forEach((item) => {
        item.callback.apply(item.ctx, args);
      });
    }
    return this;
  }
}

class WeMiniprogramPerformance {
  constructor(options = {}) {
    this.options = options;
    this.event = new Event();
  }
}

const WeMiniprogramPerformanceType = {};

exports.WeMiniprogramPerformance = WeMiniprogramPerformance;
exports.WeMiniprogramPerformanceType = WeMiniprogramPerformanceType;
//# sourceMappingURL=index.js.map
