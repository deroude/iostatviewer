var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChartDataScale } from './../domain/chart_data_scale';
import { Subject } from 'rxjs/Subject';
import { ChartDataSeries } from './../domain/chart_data_series';
import { ChartData } from './../domain/chart_data';
import { Chart } from './../domain/chart';
import { Injectable } from '@angular/core';
var ParseService = (function () {
    function ParseService() {
        this.charts = [];
        this.trigger = new Subject();
        this.loading = new Subject();
        this.colors = ['#f22', '#22f', '#2f2', '#2ff', '#ff2', '#f2f'];
    }
    ParseService.prototype.parse = function (input) {
        var lines = input.split('\n');
        var xvalues = [];
        var devices = [];
        var cpuplots = [];
        var ioplots = [];
        var iovalues = new Array();
        var cpuvalues = new Array();
        var devno = 0;
        var readIO = false;
        this.title = lines[0].trim();
        for (var i = 1; i < lines.length; i++) {
            var trydate = Date.parse(lines[i].trim());
            if (!isNaN(trydate)) {
                xvalues.push(trydate);
                continue;
            }
            if (lines[i].trim().startsWith("avg-cpu")) {
                if (cpuplots.length === 0) {
                    cpuplots = lines[i].trim().split(/[\s\t]+/).slice(1);
                    for (var j = 0; j < cpuplots.length; j++) {
                        cpuvalues.push(new Array());
                    }
                }
                readIO = false;
                continue;
            }
            if (lines[i].trim().startsWith("Device")) {
                if (ioplots.length === 0) {
                    ioplots = lines[i].trim().split(/[\s\t]+/).slice(1);
                    for (var j = 0; j < ioplots.length; j++) {
                        iovalues.push(new Array());
                    }
                }
                readIO = true;
                devno = 0;
                continue;
            }
            if (lines[i].trim().length > 0) {
                if (readIO) {
                    var line = lines[i].trim().split(/[\s\t]+/);
                    if (!devices.some(function (it) { return it === line[0].trim(); })) {
                        devices.push(line[0].trim());
                        iovalues.forEach(function (v) { return v.push(new Array()); });
                    }
                    for (var j = 1; j < line.length; j++) {
                        iovalues[j - 1][devno].push(Number(line[j].trim()));
                    }
                    devno++;
                }
                else {
                    var line = lines[i].trim().split(/[\s\t]+/);
                    for (var j = 1; j < line.length; j++) {
                        cpuvalues[j - 1].push(Number(line[j].trim()));
                    }
                }
                continue;
            }
        }
        for (var i = 0; i < cpuplots.length; i++) {
            var chart = new Chart();
            chart.id = cpuplots[i].replace(/[%\/]/, '_');
            chart.height = '400px';
            chart.width = '100%';
            chart.data = new ChartData();
            chart.data.backgroundColor = '#F0E0D0';
            chart.data.title = { text: "CPU: " + cpuplots[i] };
            chart.data.scaleX = new ChartDataScale();
            chart.data.scaleX.values = xvalues;
            chart.data.scaleX.transform = { type: 'date', all: '%H:%m:%s' };
            chart.data.scaleX.zooming = { shared: true };
            chart.data.crosshairX = { shared: true };
            chart.data.zoom = { shared: true };
            chart.data.series = [];
            var s = new ChartDataSeries();
            s.values = cpuvalues[i];
            chart.data.series.push(s);
            this.charts.push(chart);
        }
        for (var i = 0; i < ioplots.length; i++) {
            var chart = new Chart();
            chart.id = ioplots[i].replace(/[%\/]/, '_');
            chart.height = '400px';
            chart.width = '100%';
            chart.data = new ChartData();
            chart.data.backgroundColor = '#E0F0D0';
            chart.data.title = { text: "IO: " + ioplots[i] };
            chart.data.scaleX = new ChartDataScale();
            chart.data.scaleX.values = xvalues;
            chart.data.scaleX.transform = { type: 'date', all: '%H:%m:%s' };
            chart.data.scaleX.zooming = { shared: true };
            chart.data.crosshairX = { shared: true };
            chart.data.zoom = { shared: true };
            chart.data.series = [];
            for (var j = 0; j < devices.length; j++) {
                var s = new ChartDataSeries();
                s.text = devices[j];
                s.lineColor = this.colors[Math.floor(Math.random() * this.colors.length)];
                s.values = iovalues[i][j];
                chart.data.series.push(s);
            }
            this.charts.push(chart);
        }
    };
    return ParseService;
}());
ParseService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ParseService);
export { ParseService };
//# sourceMappingURL=parse.service.js.map