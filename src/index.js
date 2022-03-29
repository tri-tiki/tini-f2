import F2 from './lib/f2';

import { normalizeContext, normalizeEvent } from './utils/normalize';
import { getSystemPixelRatio } from './utils/system';
import { getComponentSizeById } from './utils/query';

Component({
  props: {
    chartId: '',
    width: null,
    height: null,
    onDraw: () => {}
  },

  methods: {
    canvas: null,
    chart: null,

    touchStart(e) {
      if (this.canvas) {
        this.canvas.dispatchEvent('touchstart', normalizeEvent(e));
      }
    },

    touchMove(e) {
      if (this.canvas) {
        this.canvas.dispatchEvent('touchmove', normalizeEvent(e));
      }
    },

    touchEnd(e) {
      if (this.canvas) {
        this.canvas.dispatchEvent('touchend', normalizeEvent(e));
      }
    }
  },

  async didMount() {
    const id = `tini-f2-${this.props.chartId}`;
    let context = my.createCanvasContext(id);
    context = normalizeContext(context);

    const [pixelRatio, canvasSize] = await Promise.all([
      getSystemPixelRatio(),
      getComponentSizeById(id)
    ]);

    const { width, height } = canvasSize ? canvasSize : this.props;
    if (!width || !height) {
      return;
    }

    this.setData(
      {
        width: width * pixelRatio,
        height: height * pixelRatio
      },
      () => {
        const chart = new F2.Chart({ context, width, height, pixelRatio });
        this.props.onDraw(chart);

        if (chart) {
          this.chart = chart;
          this.canvas = chart.get('el');
        }
      }
    );
  }
});
