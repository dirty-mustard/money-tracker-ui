import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { Transaction, Report, Filter, PieChart } from "../../shared/models";
import { ActivatedRoute } from "@angular/router";
import { ReportsService, FiltersService } from "../../shared/services";

declare var _ : any;
declare var numeral: any;

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit, OnChanges {

  public report: Report = new Report();
  public filter: Filter = new Filter();
  public transactions : Transaction[] = [];

  public pieChartDataSet : any[] = [ {data: [], backgroundColor: []} ];

  public pieChartColors : string[] = [];
  public pieChartLabels : string[] = [];
  public pieChartData   : number[] = [];
  public pieChartType   : string   = 'pie';

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (_.contains(_.keys(params),'id')) {
        let reportId = params['id'];
        this.reportService.get(reportId).subscribe(this.reportSuccessHandler.bind(this));
        this.reportService.getReportTransactions(reportId).subscribe(this.reportTransactionSuccessHandler.bind(this));
        this.reportService.getReportPieData(reportId).subscribe(this.reportPieDataSuccessHandler.bind(this));
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (_.contains(_.keys(changes), 'transactions')) {
      this.calculateExpenses();
      this.calculateIncome();
      this.calculateBalance();
    }
  }

  reportSuccessHandler(r: Report) : void {
      this.report = r;
      this.filterService.get(r.filter).subscribe(this.reportFilterSuccessHandler.bind(this));
  }

  reportFilterSuccessHandler(f: Filter) : void {
    this.filter = f;
  }

  reportTransactionSuccessHandler(transactions: any) : void {
    this.transactions = transactions;
  }

  reportPieDataSuccessHandler(pieChartData: PieChart[]) : void {
    this.pieChartLabels  = pieChartData.map((pieChart: PieChart) => pieChart.name);
    this.pieChartColors  = pieChartData.map((pieChart: PieChart) => pieChart.color);
    this.pieChartData    = pieChartData.map((pieChart: PieChart) => (pieChart.y > 0) ? pieChart.y : pieChart.y * -1);
    this.pieChartDataSet = [ {data: this.pieChartData, backgroundColor: this.pieChartColors} ];
  }

  public lineChartData:Array<any> = [
    [41, 53, 60, 49, 68, 33, 65],
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';

  constructor(private reportService: ReportsService,
              private filterService: FiltersService,
              private route: ActivatedRoute)
  {}

  public calculateExpenses() : number {
    let expenseTransactions = this.transactions.map((t: Transaction) => t.amount).filter((amount: number) => amount < 0);

    return (expenseTransactions.length > 0)
      ? expenseTransactions.reduce((a, b) => a + b, 0)
      : 0;
  }

  public calculateIncome() : number {
    let incomeTransactions = this.transactions.map((t: Transaction) => t.amount).filter((amount: number) => amount > 0);

    return (incomeTransactions.length > 0)
      ? incomeTransactions.reduce((a, b) => a + b, 0)
      : 0;
  }

  public calculateBalance() : number {
    return this.calculateExpenses() + this.calculateIncome();
  }

}
