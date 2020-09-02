import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  kibanaRoot = environment.kibanaRoot;
  urlforAdhoc: string = this.kibanaRoot;
  trustedUrlforAdhoc: any;
  adhoc = '/app/kibana#/discover?_g=()&_a=(columns:!(_source),index:AWGvny0TRiQx02_iiLr2,interval:auto,query:(match_all:()),sort:!(_score,desc))';

  constructor(private sanitizer: DomSanitizer) {
    this.trustedUrlforAdhoc = sanitizer.bypassSecurityTrustUrl(this.urlforAdhoc + this.adhoc);
  }

  ngOnInit() {
    this.trustedUrlforAdhoc = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlforAdhoc + this.adhoc);
  }

}
