import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  kibanaRoot = environment.kibanaRoot;
  webVqdUrlforVisualize: string = this.kibanaRoot;
  trustedWebVqdUrlforKibRep: any;
  reportKibanaUrl = '/app/kibana#/dashboards?_g=()';

  // if (user.json().space_type === 'space1') {
  //   this.reportKibanaUrl = environment.peteSpaceUrl
  // } else if (user.sjon)
  // reportKibanaUrl=environment.reportingShortUrl;
  // reportKibanaUrl = "/app/kibana#/dashboard/AWQYJgUHjj6LB7tBRxMq?embed=true&_g=()";
  //  reportKibanaUrl= "/goto/9dd9c710bf7e966d91dcbecdec774571";
   
  constructor(private sanitizer: DomSanitizer) {
    this.trustedWebVqdUrlforKibRep = sanitizer.bypassSecurityTrustUrl(this.webVqdUrlforVisualize + this.reportKibanaUrl);
  }

  ngOnInit() {
    this.trustedWebVqdUrlforKibRep = this.sanitizer.bypassSecurityTrustResourceUrl(this.webVqdUrlforVisualize + this.reportKibanaUrl);
  }

}
