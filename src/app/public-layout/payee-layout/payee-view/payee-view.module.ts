import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayeeViewRoutingModule } from './payee-view-routing.module';
import { PayeeViewComponent } from './payee-view.component';
// module
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PayeeViewComponent],
  imports: [CommonModule, PayeeViewRoutingModule, MatIconModule],
})
export class PayeeViewModule {}
