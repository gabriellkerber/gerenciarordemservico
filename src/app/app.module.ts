import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatIconModule} from '@angular/material/icon'; 


import { AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ClienteComponent } from './cad-cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { CadOSComponent } from './cad-os/cad-os.component';
import { BuscarOSComponent } from './buscar-os/buscar-os.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { BuscarClienteComponent } from './buscar-cliente/buscar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card'
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { CadProdutoComponent } from './cad-produto/cad-produto.component';
import { BuscarProdutoComponent } from './buscar-produto/buscar-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { LoginComponent } from './login/login.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EditarOsComponent } from './editar-os/editar-os.component';
import { TelaClienteComponent } from './tela-cliente/tela-cliente.component';
import { BuscarOrdemComponent } from './buscar-ordem/buscar-ordem.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // fonts provided for pdfmake
import { MatSortModule } from '@angular/material/sort';
import { DialogExclusaoComponent } from './dialog-exclusao/dialog-exclusao.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};
 
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);


@NgModule({
  declarations: [
    AppComponent,
    PaginaNaoEncontradaComponent,
    ClienteComponent,
    HomeComponent,
    CadOSComponent,
    BuscarOSComponent,
    BuscarClienteComponent,
    EditarClienteComponent,
    CadProdutoComponent,
    BuscarProdutoComponent,
    EditarProdutoComponent,
    LoginComponent,
    EditarOsComponent,
    TelaClienteComponent,
    BuscarOrdemComponent,
    DialogExclusaoComponent,
  ],
  entryComponents:[DialogExclusaoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    MatGridListModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    CurrencyMaskModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue :{ duration: 3000}},
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

