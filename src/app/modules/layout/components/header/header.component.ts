import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {ActivatedRoute, NavigationCancel, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {LayoutService} from '@setrass-hn/layout-core';
import {components} from '@setrass-hn/kt';
import { AuthService } from '@setrass-hn/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  headerContainerCssClasses: string = '';
  asideDisplay: boolean = true;
  headerLeft: string = 'menu';
  pageTitleCssClasses: string = '';
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  };
  @ViewChild('ktPageTitle', {static: true}) ktPageTitle: ElementRef;

  private unsubscribe: Subscription[] = [];
  public isShowNavbar: boolean = false;
  public currentUser: any = {};
  public inDashboard: boolean = false;
  

  constructor(
    private layout: LayoutService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,) {
    this.routingChanges();
  }

  ngOnInit(): void {
    this.headerContainerCssClasses = this.layout.getStringCSSClasses('headerContainer');
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
    this.authService.checkAuth();
    this.isShowNavbar = localStorage.getItem('current_user') ? true : false;
    this.currentUser = this.authService.user;
  }

  ngAfterViewInit() {
    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (this.pageTitleAttributes.hasOwnProperty(key)) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      this.inDashboard = this.router.url == "/" || this.router.url == "/dashboard" ? true: false;    
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        components.MenuComponent.reinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  get initialName(){
    let names = this.authService.user.name ?
    this.authService.user.name.split(' ') :
    "Jorge Aguilar".split(" ");
    return names[0][0]+names[1][0];
  }

  logout(): void{
    this.authService.logout();
    this.isShowNavbar = false;
    
    if(this.router.url.split('/').includes('patrono-empleador')){
      this.router.navigate(['./auth/login']);
    }else{
      this.router.navigate(['./auth/personal/login']);
    }
  }

  changePassword(): void{
    const frontendHost = window.location.href.split("//")[1].split("/")[0]
    if( frontendHost && this.currentUser && this.currentUser.email){
      let data:any = {
        email: this.currentUser.email,
        frontendHost: frontendHost
      }

      const Toast = this.createToast();
      this.authService.sendPasswordChange(data).subscribe({
        next:(res:any)=>{
          console.log("res: ", res)

          Toast.fire({
            icon: 'success',
            title: "Correo enviado exitosamente, revisar su bandeja de entrada o spam"
          });
          this.logout();
        },
        error:(error)=>{
          
          const err = error.message || error;
          console.warn(err);
          return Toast.fire({
            icon: 'error',
            title: err
          });
        }
      });        
    }
  }

  showAlertChangePassword() {
    Swal.fire({
      icon: 'warning',
      title: `¿Estás seguro qué desea Cambiar su contraseña?`,
      text: "Recibirá un enlace por correo para actualizar su contraseña",          
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.changePassword();
      }
    });
  }

  ngOnDestroy() {

  }


  createToast():any{
    return Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }
}
