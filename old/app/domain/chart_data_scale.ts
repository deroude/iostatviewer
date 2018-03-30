import { ChartDataScaleZooming } from './chart_data_scale_zooming';
import { ChartDataScaleItem } from './chart_data_scale_item';
import { ChartDataScaleTransform } from './chart_data_scale_transform';
import { ChartDataScaleGuide } from './chart_data_scale_guide';
export class ChartDataScale {
    guide?: ChartDataScaleGuide;
    values: any[];
    transform: ChartDataScaleTransform;
    zooming: ChartDataScaleZooming;
    item: ChartDataScaleItem;
}