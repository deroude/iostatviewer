var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Chart } from './../domain/chart';
import { Directive, Input, NgZone, HostBinding } from '@angular/core';
var ZingChartDirective = (function () {
    function ZingChartDirective(zone) {
        this.zone = zone;
    }
    Object.defineProperty(ZingChartDirective.prototype, "something", {
        get: function () {
            return this.chart.id;
        },
        enumerable: true,
        configurable: true
    });
    ZingChartDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            zingchart.render({
                id: _this.chart.id,
                data: _this.chart.data,
                width: _this.chart.width,
                height: _this.chart.height
            });
        });
    };
    ZingChartDirective.prototype.ngOnDestroy = function () {
        zingchart.exec(this.chart.id, 'destroy');
    };
    return ZingChartDirective;
}());
__decorate([
    Input(),
    __metadata("design:type", Chart)
], ZingChartDirective.prototype, "chart", void 0);
__decorate([
    HostBinding('id'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ZingChartDirective.prototype, "something", null);
ZingChartDirective = __decorate([
    Directive({
        selector: 'zing-chart'
    }),
    __metadata("design:paramtypes", [NgZone])
], ZingChartDirective);
export { ZingChartDirective };
//# sourceMappingURL=zingchart.directive.js.map