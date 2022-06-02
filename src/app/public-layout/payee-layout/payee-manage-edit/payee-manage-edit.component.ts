import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payee-manage-edit',
  templateUrl: './payee-manage-edit.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./payee-manage-edit.component.scss'],
})
export class PayeeManageEditComponent implements OnInit {
  // floatLabelControl = new FormControl('true');
  type: boolean = false;
  form!: FormGroup
  form2!: FormGroup
  form3!: FormGroup

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  createForm() {
    this.form = this.fb.group({
      floatLabelControl: [{ value: 'true', disabled: true }],
    })
    this.form2 = this.fb.group({
      floatLabelControl2: [{ value: 'true', disabled: true }],
    })
    this.form3 = this.fb.group({
      floatLabelControl3: [{ value: 'true', disabled: true }],
    })
  }

  formatMoney(n: any) {
    const tostring = n.toString();
    return (Math.round(tostring * 100) / 100).toLocaleString();
  }

  changeType(type: boolean) {
    this.type = type;
    if(type == true) {
      this.form.get('floatLabelControl')?.enable()
      this.form2.get('floatLabelControl2')?.enable()
      this.form3.get('floatLabelControl3')?.enable()
    }
    else {
      this.form.get('floatLabelControl')?.disable()
      this.form2.get('floatLabelControl2')?.disable()
      this.form3.get('floatLabelControl3')?.disable()
    }
  }

  ngOnInit(): void {}
}
