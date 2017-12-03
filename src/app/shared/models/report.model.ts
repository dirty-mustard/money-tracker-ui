import * as _ from 'underscore';

import { Filter } from './filter.model';

export const PIE = 'PIE';
export const LINE = 'LINE';

export class Report {

    public id: number = undefined;
    public createdAt: string = undefined;
    public name: string = undefined;
    public icon: string = undefined;
    public filter: any = undefined;
    public charts: string[] = [];

    constructor(
      id: number,
      createdAt: string,
      name: string,
      icon: string,
      filter: Filter|number,
      charts: string[]
    ) {
      this.id = id;
      this.createdAt = createdAt;
      this.name = name;
      this.icon = icon;
      this.filter = filter;
      this.charts = charts;
    }

    public hasChart(chart: string): boolean {
        return _.contains(this.charts, chart);
    }

    public addChart(chart: string) {
        if (!_.contains(this.charts, chart)) {
            this.charts.push(chart);
        }
    }

    public removeChart(chart: string) {
        if (_.contains(this.charts, chart)) {
            this.charts.splice(this.charts.indexOf(chart), 1);
        }
    }
}
