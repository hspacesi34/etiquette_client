import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf, KeyValuePipe } from '@angular/common';

interface FormField {
  key: string;
  value: any;
  type: string;
  validators: any[];
}

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
    NgIf
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input() model: any = {};
  @Input() excludeFields: string[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  formFields: FormField[] = []; // Array to maintain order

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildFormFields();
    this.form = this.buildForm();
  }

  private buildFormFields(): void {
    // Get all properties in order they are defined in the model
    const propertyNames = Object.getOwnPropertyNames(this.model);
    
    this.formFields = propertyNames
      .filter(key => !this.excludeFields.includes(key))
      .map(key => ({
        key,
        value: this.model[key],
        type: this.getInputType(key, this.model[key]),
        validators: this.getValidatorsForField(key, this.model[key])
      }));
  }

  private buildForm(): FormGroup {
    const formGroup: { [key: string]: any } = {};

    this.formFields.forEach(field => {
      formGroup[field.key] = [field.value, field.validators];
    });

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
