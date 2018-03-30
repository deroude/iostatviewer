import { Component, OnInit } from '@angular/core';
import { ParseService } from '../../services/parse.service';
import { Chart } from '../../domain/chart';

@Component({
    selector: 'iostat-chart',
    templateUrl: './chart.component.html'
})

export class ChartComponent implements OnInit {
    constructor(private parser: ParseService) { }
    charts: Chart[];
    loading: boolean = false;

    ngOnInit() {
        this.charts = this.parser.charts;
        this.parser.loading.subscribe(() => this.loading = true);
        this.parser.trigger.subscribe(() => {
            this.charts = this.parser.charts;
            this.loading = false;
        });
    }
}