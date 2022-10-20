import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './paginas/home/home.component';
import { AdminComponent } from './paginas/admin/admin.component';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import { AlertaService } from './servicios/alerta.service';
import { UsuariosService } from './servicios/usuarios.service';
import { CarouselComponent } from './componentes/carousel/carousel.component';
import {CarouselModule} from 'primeng/carousel';
import {CardModule} from 'primeng/card';


import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';


import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ReactiveFormsModule} from '@angular/forms'
import { VigilanteGuard } from './vigilante.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    CarouselModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    ReactiveFormsModule,
    CardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AlertaService,UsuariosService,VigilanteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
