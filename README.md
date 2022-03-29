# Tini F2

Tini App component hỗ trợ vẽ biểu đồ sử dụng thư viện [@antv/f2](https://www.npmjs.com/package/@antv/f2)

<img width="300" src="https://i.imgur.com/R2OlLN9.png"/>

## Cách sử dụng

### 1. Cài đặt

```bash
npm install tiki-miniapp-f2
# or
yarn install tiki-miniapp-f2
```

### 2. Sử dụng

###### pages/index/index.json

```json
{
  "usingComponents": {
    "tini-f2": "tiki-miniapp-f2/es/index"
  }
}
```

###### pages/column/index.txml

```xml
<tini-f2
  chartId="chart-id"
  onDraw="handleDraw"
/>
```

Các property của component:

| Props   | Kiểu dữ liệu | Bắt buộc | Mô tả                                                                               |
| ------- | ------------ | -------- | ----------------------------------------------------------------------------------- |
| chartId | string       | x        | ID của chart, mỗi chart phải có một ID khác nhau.                                   |
| onDraw  | function     | x        | Ở đây ta sẽ configs UI cũng như nạp data để render chart. Bắt buộc return về chart. |
| width   | number       |          | Chiều rộng của chart.                                                               |
| height  | number       |          | Chiều cao của chart.                                                                |

###### pages/index/index.js

```js
Page({
  data: {
    chartData: [
      {
        date: '2020/02/01',
        value: 0
      },
      {
        date: '2020/02/02',
        value: 900
      },
      {
        date: '2020/02/03',
        value: 2300
      },
      {
        date: '2020/02/04',
        value: 800
      },
      {
        date: '2020/02/05',
        value: 1600
      },
      {
        date: '2020/02/06',
        value: 2900
      },
      {
        date: '2020/02/07',
        value: 3800
      }
    ]
  },

  handleDraw(chart) {
    chart.source(this.data.chartData, {
      date: {
        type: 'timeCat',
        mask: 'MM-DD'
      },
      value: {
        min: 0,
        tickCount: 5
      }
    });

    chart.tooltip({
      alwaysShow: true
    });

    chart.interval().position('date*value').color('#f00');

    chart.render();

    // Bắt buộc phải return về chart
    return chart;
  }
});
```

## API

- Tra cứu chi tiết các configs/API ở đây: [https://f2.antv.vision/zh/docs/api/f2](https://f2.antv.vision/zh/docs/api/f2)
