var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ParseService } from './../services/parse.service';
import { Component } from '@angular/core';
var ChartComponent = (function () {
    function ChartComponent(parser) {
        this.parser = parser;
        this.loading = false;
    }
    ChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.charts = this.parser.charts;
        this.parser.loading.subscribe(function () { return _this.loading = true; });
        this.parser.trigger.subscribe(function () {
            _this.charts = _this.parser.charts;
            _this.loading = false;
        });
    };
    return ChartComponent;
}());
ChartComponent = __decorate([
    Component({
        selector: 'iostat-chart',
        templateUrl: '../../templates/chart.component.html'
    }),
    __metadata("design:paramtypes", [ParseService])
], ChartComponent);
export { ChartComponent };
//# sourceMappingURL=chart.component.js.map