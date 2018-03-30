import { ChartDataScale } from './../domain/chart_data_scale';
import { Subject } from 'rxjs/Subject';
import { ChartDataSeries } from './../domain/chart_data_series';
import { ChartData } from './../domain/chart_data';
import { Chart } from './../domain/chart';
import { Injectable } from '@angular/core';

@Injectable()
export class ParseService {
    charts: Chart[] = [];
    title: string;
    trigger: Subject<void> = new Subject<void>();
    loading: Subject<void> = new Subject<void>();

    private colors: string[] = ['#22f','#23a','#62f','#45f','#32d','#52d','#28e','#37a','#02c','#40d'];
    constructor() { }

    public parse(input: string): void {
        var lines: string[] = input.split('\n');
        var xvalues: number[] = [];
        var devices: string[] = [];
        var cpuplots: string[] = [];
        var ioplots: string[] = [];
        var iovalues: number[][][] = new Array();
        var cpuvalues: number[][] = new Array();
        var devno: number = 0;
        var readIO: boolean = false;
        this.title = lines[0].trim();
        for (var i: number = 1; i < lines.length; i++) {
            var trydate: number = Date.parse(lines[i].trim());
            if (!isNaN(trydate)) {
                xvalues.push(trydate);
                continue;
            }
            if (lines[i].trim().startsWith("avg-cpu")) {
                if (cpuplots.length === 0) {
                    cpuplots = lines[i].trim().split(/[\s\t]+/).slice(1);
                    for (var j: number = 0; j < cpuplots.length; j++) {
                        cpuvalues.push(new Array());
                    }
                }
                readIO = false;
                continue;
            }
            if (lines[i].trim().startsWith("Device")) {
                if (ioplots.length === 0) {
                    ioplots = lines[i].trim().split(/[\s\t]+/).slice(1);
                    for (var j: number = 0; j < ioplots.length; j++) {
                        iovalues.push(new Array());
                    }
                }
                readIO = true;
                devno = 0;
                continue;
            }
            if (lines[i].trim().length > 0) {
                if (readIO) {
                    var line: string[] = lines[i].trim().split(/[\s\t]+/);
                    if (!devices.some(it => it === line[0].trim())) {
                        devices.push(line[0].trim());
                        iovalues.forEach(v => v.push(new Array()));
                    }
                    for (var j: number = 1; j < line.length; j++) {
                        iovalues[j - 1][devno].push(Number(line[j].trim()));
                    }
                    devno++;
                } else {
                    var line: string[] = lines[i].trim().split(/[\s\t]+/);
                    for (var j: number = 1; j < line.length; j++) {
                        cpuvalues[j - 1].push(Number(line[j].trim()));
                    }
                }
                continue;
            }
        }
        for (var i: number = 0; i < cpuplots.length; i++) {
            var chart: Chart = new Chart();
            chart.id = cpuplots[i].replace(/[%\/]/, '_');
            chart.height = '400px';
            chart.width = '100%';
            chart.data = new ChartData();
            chart.data.backgroundColor = '#eee';
            chart.data.title = { text: "CPU: " + cpuplots[i] };
            chart.data.scaleX = new ChartDataScale();
            chart.data.scaleX.values = xvalues;
            chart.data.scaleX.transform = { type: 'date', all: '%h:%i:%s:%q' };
            chart.data.scaleX.zooming = { shared: true };
            chart.data.crosshairX = { shared: true };
            chart.data.zoom = { shared: true };
            chart.data.series = [];
            var s: ChartDataSeries = new ChartDataSeries();
            s.values = cpuvalues[i];
            chart.data.series.push(s);
            this.charts.push(chart);
        }
        for (var i: number = 0; i < ioplots.length; i++) {
            var chart: Chart = new Chart();
            chart.id = ioplots[i].replace(/[%\/]/, '_');
            chart.height = '400px';
            chart.width = '100%';
            chart.data = new ChartData();
            chart.data.backgroundColor = '#eee';
            chart.data.title = { text: "IO: " + ioplots[i] };
            chart.data.scaleX = new ChartDataScale();
            chart.data.scaleX.values = xvalues;
            chart.data.scaleX.transform = { type: 'date', all: '%h:%i:%s:%q' };
            chart.data.scaleX.zooming = { shared: true };
            chart.data.crosshairX = { shared: true };
            chart.data.zoom = { shared: true };
            chart.data.series = [];
            for (var j: number = 0; j < devices.length; j++) {
                var s: ChartDataSeries = new ChartDataSeries();
                s.text = devices[j];
                // s.lineColor = this.colors[Math.floor(Math.random() * this.colors.length)];
                s.values = iovalues[i][j];
                chart.data.series.push(s);
            }
            this.charts.push(chart);
        }
    }
}