declare var _: any;

export class Report {

    public id: number = undefined;
    public createdAt: string = undefined;
    public name: string = undefined;
    public filter = undefined;
    public charts: string[] = [];

    public static fromJson(json: Object) : Report {
        let report = new Report();
        _.each(_.keys(report), p => {
            if (_.contains(_.keys(json), p)) {
                report[p] = json[p] ;
            }
        });

        return report;
    }

    public hasChart(chart: string) : boolean {
        return _.contains(this.charts, chart);
    }

    public addChart(chart: string) {
        if (!_.contains(this.charts, chart)) {
            this.charts.push(chart);
        }
    }

    public removeChart(chart: string) {
        if (_.contains(this.charts, chart)) {
            this.charts.splice(this.charts.indexOf(chart), 1)
        }
    }

}