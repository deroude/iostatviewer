import { Chart } from './../domain/chart';
import { Directive, Input, NgZone, AfterViewInit, OnDestroy, HostBinding } from '@angular/core';
import 'zingchart';

declare var zingchart: any;

@Directive({
    selector: 'zing-chart'
})
export class ZingChartDirective implements AfterViewInit, OnDestroy {
    @Input()
    chart: Chart;

    @HostBinding('id')
    get something() {
        return this.chart.id;
    }

    constructor(private zone: NgZone) { }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            zingchart.render({
                id: this.chart.id,
                data: this.chart.data,
                width: this.chart.width,
                height: this.chart.height
            });
        });
    }

    ngOnDestroy() {
        zingchart.exec(this.chart.id, 'destroy');
    }
}