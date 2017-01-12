import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { Config } from "../app.config";

@Component({
  selector: 'app-transaction-importer',
  templateUrl: './transaction-importer.component.html',
  styleUrls: ['./transaction-importer.component.css']
})
export class TransactionImporterComponent implements OnInit {

  public uploader    : FileUploader = new FileUploader({ url: Config.FILE_UPLOAD_URL });
  public selectedBank: string = "";

  ngOnInit(): void {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("bank", this.selectedBank)
    };

    console.log(this.selectedBank, this.selectedBank.length);
  }
}
