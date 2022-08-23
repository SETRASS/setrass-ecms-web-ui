import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'ecms-calculo-generado',
  templateUrl: './calculo-generado.component.html',
  styleUrls: ['./calculo-generado.component.scss']
})
export class CalculoGeneradoComponent implements OnInit {

  //files
  readonly assetsRoute: string = 'assets/templates';
  initialHtmlText = "";
  finalHtmlText: any;

  constructor(private httpClient: HttpClient,
              private sanitize: DomSanitizer) { }

  ngOnInit(): void {
    this.loadHtmlTemplate("calculo-de-prestaciones-doc.html");
  }


  loadHtmlTemplate(htmlTemplateName: string): void {
    this.httpClient.get(`${this.assetsRoute}/${htmlTemplateName}`, { responseType: 'text' }).subscribe((data) => {
      this.initialHtmlText = data;
      this.sanitizeHtml();
    });
  }

  stringToHTML = (str: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  }

  sanitizeHtml(): void {
    this.finalHtmlText = this.sanitize.bypassSecurityTrustHtml(this.initialHtmlText);
  }

  printDocument(): void {
    const printWindow = window.open('', '', 'height=400,width=800');
    // @ts-ignore
    if (printWindow !== null) {
      printWindow.document.write(this.finalHtmlText);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 1000)

    }
  }

}
