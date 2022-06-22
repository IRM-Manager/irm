// modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
// import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
// components
import { DialogComponent } from '../../dashboard/dialog/dialog.component';
import { FooterComponent } from '../../dashboard/footer/footer.component';
import { PayeeDialogComponent } from '../../dashboard/payee-layout/payee-dialog/payee-dialog.component';
import { HeaderComponent } from '../header/header.component';
import { AppPublicSidenavListComponent } from '../app-public-sidenav-list/app-public-sidenav-list.component';
import { MdaDialogComponent } from '../mda-component/mda-dialog/mda-dialog.component';
import { DirectDialogComponent } from '../direct-access-component/direct-dialog/direct-dialog.component';
import { VehicleRegDetailsComponent } from '../vehicle-component/vehicle-reg-component/vehicle-reg-details/vehicle-reg-details.component';
import { VehicleRegAssessmentComponent } from '../vehicle-component/vehicle-reg-component/vehicle-reg-assessment/vehicle-reg-assessment.component';
import { VehicleRegPlateComponent } from '../vehicle-component/vehicle-reg-component/vehicle-reg-plate/vehicle-reg-plate.component';
import { VehicleDialogComponent } from '../vehicle-component/vehicle-dialog/vehicle-dialog.component';
import { SideNavListComponent } from '../vehicle-component/side-nav-list/side-nav-list.component';
import { BottomSidenavMenuComponent } from '../bottom-sidenav-menu/bottom-sidenav-menu.component';
import { AdminSidenavListComponent } from '../admin-console-component/admin-sidenav-list/admin-sidenav-list.component';
import { DashboardSidenavListComponent } from '../dashboard-component/dashboard-sidenav-list/dashboard-sidenav-list.component';
import { DirectSidenavListComponent } from '../direct-access-component/direct-sidenav-list/direct-sidenav-list.component';
import { MdaSidenavListComponent } from '../mda-component/mda-sidenav-list/mda-sidenav-list.component';
import { TaxpayerSidenavListComponent } from '../tax-payer-layout/taxpayer-sidenav-list/taxpayer-sidenav-list.component';
import { PayeeSidenavListComponent } from '../payee-layout/payee-sidenav-list/payee-sidenav-list.component';
import { AdminConsoleDialogComponent } from '../admin-console-component/admin-console-dialog/admin-console-dialog.component';

@NgModule({
  declarations: [
    // components here  // components which do not have route and chart
    HeaderComponent,
    AppPublicSidenavListComponent,
    FooterComponent,
    VehicleRegDetailsComponent,
    VehicleRegPlateComponent,
    VehicleRegAssessmentComponent,
    SideNavListComponent,
    BottomSidenavMenuComponent,
    AdminSidenavListComponent,
    DashboardSidenavListComponent,
    DirectSidenavListComponent,
    MdaSidenavListComponent,
    TaxpayerSidenavListComponent,
    PayeeSidenavListComponent,
    // dialog
    DialogComponent,
    PayeeDialogComponent,
    MdaDialogComponent,
    DirectDialogComponent,
    VehicleDialogComponent,
    AdminConsoleDialogComponent,
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
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ],
  exports: [
    // components
    HeaderComponent,
    AppPublicSidenavListComponent,
    VehicleRegDetailsComponent,
    VehicleRegPlateComponent,
    VehicleRegAssessmentComponent,
    FooterComponent,
    SideNavListComponent,
    BottomSidenavMenuComponent,
    AdminSidenavListComponent,
    DashboardSidenavListComponent,
    DirectSidenavListComponent,
    MdaSidenavListComponent,
    TaxpayerSidenavListComponent,
    PayeeSidenavListComponent,
    // module
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
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ],
})
export class PublicSharedModuleModule {}
