Component({
  props: {
    chartId: '',
    data: [],
    color: '#1A94FF',
    xField: 'date',
    yField: 'value',

    xFieldConfigs: {
      range: [0, 1]
    },

    yFieldConfigs: {
      min: 0,
      tickCount: 5
    },

    xAxis: {
      labelOffset: 8,

      line: {
        lineWidth: 1,
        stroke: '#EBEBF0',
        top: true
      },

      tickLine: {
        lineWidth: 1,
        stroke: '#27272A',
        length: 5
      },

      label: (text, index, total) => {
        const configs = { fill: '#27272A', fontSize: 10 };
        if (index === 0) {
          configs.textAlign = 'start';
          configs.text = text.split('/').slice(-2).join('/');
        } else {
          const day = text.split('/')[2];
          configs.text = day[0] === '0' ? day[1] : day;
        }
        return configs;
      }
    },

    yAxis: {
      position: 'left',
      labelOffset: 8,

      line: {
        lineWidth: 1,
        stroke: '#EBEBF0',
        top: true
      },

      grid: {
        stroke: '#EBEBF0',
        lineWidth: 1,
        lineDash: null
      },

      tickLine: {
        lineWidth: 1,
        stroke: '#27272A',
        length: 3
      },

      label: (text, index, total) => {
        const configs = { fill: '#27272A', fontSize: 10 };
        if (index === 0) {
          configs.fontSize = 12;
        }
        return configs;
      }
    },

    tooltip: {
      alwaysShow: true,
      showTitle: true,
      showItemMarker: false,
      offsetX: 0,
      offsetY: 0,
      layout: 'vertical',

      crosshairsStyle: {
        stroke: '#DDDDE3',
        lineWidth: 1
      },

      background: {
        radius: 8,
        fill: '#FFF',
        padding: 8,
        stroke: '#DDDDE3',
        lineWidth: 1
      },

      titleStyle: {
        fontSize: 12,
        fill: '#808089',
        lineHeight: 18,
        textAlign: 'start',
        textBaseline: 'middle'
      },

      valueStyle: {
        fontSize: 14,
        fill: '#27272A',
        lineHeight: 21,
        fontWeight: 700,
        textAlign: 'start',
        textBaseline: 'middle'
      },

      onShow: function onShow(ev) {
        const items = ev.items;
        items[0].title = items[0].title.split('/').slice(-2).join('/');
        items[0].name = null;
      }
    }
  },

  methods: {
    handleDraw(chart) {
      const {
        data = [],
        color,
        xField,
        yField,
        xFieldConfigs,
        yFieldConfigs,
        xAxis,
        yAxis,
        tooltip
      } = this.props;

      chart.source(data, {
        [xField]: xFieldConfigs,
        [yField]: yFieldConfigs
      });

      chart.axis(xField, xAxis);

      chart.axis(yField, yAxis);

      chart.tooltip(tooltip);

      chart.line().position(`${xField}*${yField}`).color(color);

      chart.render();

      // Must return chart
      return chart;
    }
  }
});
