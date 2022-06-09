import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
// import { CodeInputModule } from 'angular-code-input';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
// import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
// import 'hammerjs';
import { NgxPrintModule } from 'ngx-print';
// import { AppPublicSidenavListComponent } from '../public-layout/app-public-sidenav-list/app-public-sidenav-list.component';
// import { AppPublicSidenavComponent } from '../public-layout/app-public-sidenav/app-public-sidenav.component';
import { DialogComponent } from '../../dashboard/dialog/dialog.component';
import { FooterComponent } from '../../dashboard/footer/footer.component';
// import { HeaderComponent } from '../dashboard/header/header.component';
import { PayeeDialogComponent } from '../../dashboard/payee-layout/payee-dialog/payee-dialog.component';

// import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { PaymentDialogComponent } from '../dashboard/payment-dialog/payment-dialog.component';


@NgModule({
  declarations: [
    // component here
    // AppPublicSidenavComponent,
    // HeaderComponent,
    // AppPublicSidenavListComponent,
    FooterComponent,
    DialogComponent,
    PayeeDialogComponent
  ],
  entryComponents: [
    // dialog component here
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatListModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    // CodeInputModule,
    // MatSnackBar,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    // NgxMatSelectSearchModule,
    // Ng2SearchPipeModule,
    // IvyCarouselModule
  ],
  exports: [
    // component here
    // AppPublicSidenavComponent,
    // HeaderComponent,
    // AppPublicSidenavListComponent,
    FooterComponent,

    MatListModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    // CodeInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    // NgxMatSelectSearchModule,
    // Ng2SearchPipeModule,
    // IvyCarouselModule
  ],
})
export class PublicSharedModuleModule {}
