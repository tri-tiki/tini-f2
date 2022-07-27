Component({
  methods: {
    handleDraw(chart) {
      const map = {
        water: '50%',
        milk: '30%',
        juice: '20%'
      };
      const data = [
        { name: 'water', percent: 0.5, a: '1' },
        { name: 'milk', percent: 0.3, a: '1' },
        { name: 'juice', percent: 0.2, a: '1' }
      ];

      chart.source(data, {
        percent: {
          formatter(val) {
            return val * 100 + '%';
          }
        }
      });
      chart.legend({
        position: 'right',
        itemFormatter(val) {
          return val + '  ' + map[val];
        }
      });
      chart.tooltip(false);
      chart.coord('polar', {
        transposed: true,
        radius: 0.85
      });
      chart.axis(false);
      chart
        .interval()
        .position('a*percent')
        .color('name', ['#1890FF', '#FACC14', '#F04864'])
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        })
        .animate({
          appear: {
            duration: 1200,
            easing: 'bounceOut'
          }
        });

      chart.render();

      // Must return chart
      return chart;
    }
  }
});
