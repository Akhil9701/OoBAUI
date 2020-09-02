import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent implements OnInit {

  kibanaRoot = environment.kibanaRoot;
  webVqdUrlforVisualize: string = this.kibanaRoot;
  trustedWebVqdUrlforKibVis: any;

  constructor(private sanitizer: DomSanitizer) { 
    this.trustedWebVqdUrlforKibVis = sanitizer.bypassSecurityTrustUrl(this.webVqdUrlforVisualize + '/app/kibana#/visualize/new?_g=0');
  }

  ngOnInit() {
    this.trustedWebVqdUrlforKibVis = this.sanitizer.bypassSecurityTrustResourceUrl(this.webVqdUrlforVisualize + '/app/kibana#/visualize/new?_g=0');
  }

}
