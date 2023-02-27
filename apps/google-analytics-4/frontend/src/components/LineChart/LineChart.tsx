import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import tokens from '@contentful/f36-tokens';
import { parseRemToPxInt } from 'helpers/parse-styling-tokens';

const ACCESSIBILITY_LABEL = 'Analytics line chart';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

ChartJS.defaults.font.size = parseRemToPxInt(tokens.fontSizeS);
ChartJS.defaults.font.family = tokens.fontStackPrimary;
ChartJS.defaults.font.weight = tokens.fontWeightMedium.toString();
ChartJS.defaults.borderColor = tokens.gray200;
ChartJS.defaults.datasets.line.borderColor = tokens.colorPrimary;

interface LineChartProps {
  dataValues: number[];
  xAxisLabels: string[];
  tooltipMetricLabel: string;
  accessibilityLabel: string;
}

const LineChart = ({
  dataValues,
  xAxisLabels,
  tooltipMetricLabel,
  accessibilityLabel,
}: LineChartProps) => {
  const data: ChartData<'line'> = {
    labels: xAxisLabels,
    datasets: [
      {
        data: dataValues,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: tokens.gray900,
        bodyColor: tokens.colorWhite,
        padding: parseRemToPxInt(tokens.spacingXs),
        titleMarginBottom: parseRemToPxInt(tokens.spacing2Xs),
        titleFont: {
          size: 9,
        },
        bodyFont: {
          size: 8,
          weight: '700',
        },
        displayColors: false,
        callbacks: {
          beforeBody: () => tooltipMetricLabel,
        },
      },
    },
  };

  const props = {
    'aria-label': accessibilityLabel,
  };

  return <Line data={data} options={options} fallbackContent={accessibilityLabel} {...props} />;
};

LineChart.defaultProps = {
  accessibilityLabel: ACCESSIBILITY_LABEL,
};

export default LineChart;
