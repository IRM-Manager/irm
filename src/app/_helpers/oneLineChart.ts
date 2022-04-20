import { Options } from 'highcharts';

export const AreaChartOptions: Options = {
  chart: {
    type: 'spline',
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false,
      },
    },
    spline: {
      marker: {
        radius: 4,
        lineColor: '#666666',
        lineWidth: 1,
      },
    },
  },
  title: {
    verticalAlign: 'middle',
    floating: true,
    text: '',
  },
  legend: {
    enabled: false,
  },
  yAxis: {
    visible: true,
    title: {
      text: '',
    },
    labels: {
      formatter: function () {
        return this.value + ' M';
      },
    },
  },
  xAxis: {
    visible: true,
    lineColor: '#FFFFFF',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
  },
  defs: {
    gradient0: {
      tagName: 'linearGradient',
      id: 'gradient-0',
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1,
      children: [
        {
          tagName: 'stop',
          offset: 0,
        },
        {
          tagName: 'stop',
          offset: 0,
        },
      ],
    },
  } as any,
  series: [
    {
      color: '#32A969',
      type: 'spline',
      keys: ['y', 'selected'],
      data: [
        [29.9, false],
        [24.9, false],
        [21.9, false],
        [22.9, false],
        [294.9, false],
        [67.9, false],
        [89.9, false],
      ],
    },
  ],
};
