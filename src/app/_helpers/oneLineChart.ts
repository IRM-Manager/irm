import { Options } from 'highcharts';

export const AreaChartOptions: Options = {
  chart: {
    styledMode: true,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false,
      }
    },
  },
  title: {
    verticalAlign: 'middle',
    floating: true,
    text: 'Area Chart',
  },
  legend: {
    enabled: false,
  },
  yAxis: {
    visible: false,
  },
  xAxis: {
    visible: false,
    categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'July'
    ]
  },
  defs: {
    gradients: {
        tagName: 'linearGradient',
        id: 'gradient-0',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
            {
                tagName: 'stop',
                offset: 0
            },
            {
                tagName: 'stop',
                offset: 0
            }
        ]
    },
  } as any
};