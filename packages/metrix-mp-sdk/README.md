## 安装

```bash
# npm
npm i @metrix/metrix-mp-sdk --save

# yarn
yarn add @metrix/metrix-mp-sdk
```

## 使用

```js
import { WeMiniprogramPerformance } from '@metrix/metrix-mp-sdk';

new WeMiniprogramPerformance({
  appId: 'd83010aa-4d89-16ec-a1da-70b1ba7c0078',
});
```

## 上报的数据格式

| 字段      | 类型   | 说明                                             |
| --------- | ------ | ------------------------------------------------ |
| name      | String | 指标名称                                         |
| entryType | String | 指标类型                                         |
| startTime | Number | 开始时间，不同指标的具体含义会有差异             |
| duration  | Number | 耗时 ms，仅对于表示阶段的指标有效。              |
| path      | String | 页面路径，仅 render 和 navigation 类型指标有效。 |

```json
{
  "name": "appLaunch",
  "entryType": "navigation",
  "startTime": 1646882325919,
  "endTime": 1646882326751,
  "duration": 832,
  "navigationType": "appLaunch",
  "path": "pages/index/index"
}
```
