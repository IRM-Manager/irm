import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// dialog

// module
import { PrivateHomeRoutingModule } from './private-home-routing.module';


// component
import { PrivateHomeComponent } from './private-home.component';


@NgModule({
  declarations: [
    // component
    PrivateHomeComponent,

  ],
  entryComponents: [
    // dialog component here
    
  ],
  imports: [
    CommonModule,
    PrivateHomeRoutingModule,
    // module
    
  ],
  exports: [
    // component
    PrivateHomeComponent,
    // module
  ]
})
export class PrivateHomeModule { }
