import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// dialog

// module
import { HomeRoutingModule } from './home-routing.module';
// import { PublicSharedModuleModule } from '../../public-shared-module/public-shared-module.module';
import { MatButtonModule } from '@angular/material/button';
// import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// component
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    // component
    HomeComponent,

  ],
  entryComponents: [
    // dialog component here
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // module
    // PublicSharedModuleModule,
    MatButtonModule,
    // MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
    // MatIconModule,
    // MatCardModule
    
  ],
  exports: [
    // component
    HomeComponent,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    // module
    // PublicSharedModuleModule,
    MatButtonModule,
    // MatListModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatCardModule
  ]
})
export class HomeModule { }
