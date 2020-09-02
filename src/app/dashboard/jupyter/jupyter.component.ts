import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-jupyter',
  templateUrl: './jupyter.component.html',
  styleUrls: ['./jupyter.component.scss']
})
export class JupyterComponent implements OnInit {

  jupyterRoot = environment.jupyterRoot;
  webVqdUrlforJupyter: string = this.jupyterRoot;
  trustedWebVqdUrlforJpyNb:any;
  jupyterUrl = '';

  constructor(private sanitizer:DomSanitizer) {
    this.trustedWebVqdUrlforJpyNb = sanitizer.bypassSecurityTrustResourceUrl(this.webVqdUrlforJupyter);
   }

  ngOnInit() {
    this.trustedWebVqdUrlforJpyNb = this.sanitizer.bypassSecurityTrustResourceUrl(this.webVqdUrlforJupyter);
  }

}
