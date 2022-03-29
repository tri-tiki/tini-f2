Component({
  props: {
    chartId: '',
    data: [],
    color: '#1A94FF',
    xField: 'date',
    yField: 'value',

    xFieldConfigs: {
      type: 'timeCat',
      mask: 'MM-DD'
    },

    yFieldConfigs: {
      min: 0,
      tickCount: 5
    },

    tooltip: {
      alwaysShow: true
    }
  },

  methods: {
    handleDraw(chart) {
      const {
        data = [],
        xField,
        yField,
        xFieldConfigs,
        yFieldConfigs,
        color,
        tooltip
      } = this.props;

      chart.source(data, {
        [xField]: xFieldConfigs,
        [yField]: yFieldConfigs
      });

      chart.tooltip(tooltip);

      chart.interval().position(`${xField}*${yField}`).color(color);

      chart.render();

      // Must return chart
      return chart;
    }
  }
});
