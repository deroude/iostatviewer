import { ChartDataScaleZooming } from './chart_data_scale_zooming';
import { ChartCrosshair } from './chart_crosshair';
import { ChartDataScale } from './chart_data_scale';
import { ChartTitle } from './chart_title';
import { ChartDataSeries } from './chart_data_series';
export class ChartData {
    type?: string = 'line';
    title?: ChartTitle;
    backgroundColor?: string = '#2C2C39';
    series: ChartDataSeries[];
    scaleX?: ChartDataScale;
    scaleY?: ChartDataScale;
    crosshairX?: ChartCrosshair;
    crosshairY?: ChartCrosshair;
    zoom?: ChartDataScaleZooming;
}