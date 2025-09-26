import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    KeyValuePipe
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input() model: any = {}; // Object instance, e.g., new User()
  @Input() excludeFields: string[] = []; // e.g., ['id']
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.buildForm(this.model);
  }

  buildForm(model: any): FormGroup {
    const formGroup: { [key: string]: any } = {};

    for (const key in model) {
      if (!model.hasOwnProperty(key) || this.excludeFields.includes(key)) continue;

      const value = model[key];
      const validators = this.getValidatorsForField(key, value);

      formGroup[key] = [value, validators];
    }

    return this.fb.group(formGroup);
  }

  getValidatorsForField(field: string, value: any) {
    const validators = [];

    if (field === 'email') {
      validators.push(Validators.required, Validators.email);
    }

    if (field.toLowerCase().includes('name')) {
      validators.push(Validators.required);
    }

    if (field === 'age') {
      validators.push(Validators.min(0), Validators.max(150));
    }

    return validators;
  }

  getInputType(field: string, value: any): string {
    if (typeof value === 'boolean') return 'checkbox';
    if (field === 'email') return 'email';
    if (typeof value === 'number') return 'number';
    return 'text';
  }

  submit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
