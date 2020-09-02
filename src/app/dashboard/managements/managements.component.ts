import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-managements',
  templateUrl: './managements.component.html',
  styleUrls: ['./managements.component.scss']
})
export class ManagementsComponent implements OnInit {

  kibanaRoot = environment.kibanaRoot;
  webVqdUrlforVisualize: string = this.kibanaRoot;
  trustedUrlforManagement:any;
  
  constructor(private sanitizer: DomSanitizer) {
  this.trustedUrlforManagement = sanitizer.bypassSecurityTrustUrl(this.webVqdUrlforVisualize + '/app/kibana#/management?_g=()');
   }

  ngOnInit() {
    this.trustedUrlforManagement = this.sanitizer.bypassSecurityTrustResourceUrl(this.webVqdUrlforVisualize + '/app/kibana#/management?_g=()');
  }

}
