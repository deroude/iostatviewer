import { ChartMarker } from './chart_marker';
export class ChartDataSeries {
    values: number[];
    lineColor?: string = '#31A59A';
    lineWidth?: number = 1;
    backgroundColor?:string='#909090 #313131';
    marker?: ChartMarker;
    text?:string;
}