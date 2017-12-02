declare var _: any;

export const PIE = 'PIE';
export const LINE = 'LINE';

export class Report {

    public id: number = undefined;
    public createdAt: string = undefined;
    public name: string = undefined;
    public icon: string = undefined;
    public filter: any = undefined;
    public charts: string[] = [];

    public static fromJson(json: Object): Report {
        const report = new Report();
        _.each(_.keys(report), p => {
            if (_.contains(_.keys(json), p)) {
                report[p] = json[p] ;
            }
        });

        return report;
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
