import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@setrass-hn/layout-core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerContainerCssClasses: string = '';
  currentDateStr: string = new Date().getFullYear().toString();
  systemName: string = 'Sistema Hondureño de Casos Laborales';
  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.footerContainerCssClasses =
      this.layout.getStringCSSClasses('footerContainer');
  }
}
