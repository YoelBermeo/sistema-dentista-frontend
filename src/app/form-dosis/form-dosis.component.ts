import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DosageFormValues } from '../interfaces';

@Component({
  selector: 'app-form-dosis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-dosis.component.html',
  styleUrl: './form-dosis.component.css',
})

export class FormDosisComponent implements OnInit {
  dosageForm: FormGroup;
  units: Array<'mg' | 'ml'> = ['mg', 'ml'];
  finalResult: number | null = null;

  constructor(private fb: FormBuilder) {
    this.dosageForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(1), Validators.max(125)]],
      dose: ['', [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]], //El volumen en el que se administra la dosis total.
      doseUnit: ['mg'],
      quantityUnit: ['ml'], 
      doseMed: ['', [Validators.required, Validators.min(0)]]
    });
  }

  roundToNearest(value: number, nearest: number): number {
    return Math.round(value / nearest) * nearest;
  }

  ngOnInit() {
    this.loadFormValues();
    this.dosageForm.valueChanges.subscribe(() => {
      this.saveFormValues();
    });
  }

  onSubmit() {
    if (this.dosageForm.valid) {
      const formValues: DosageFormValues = this.dosageForm.value;
      const { age, dose, weight, quantity, doseUnit, quantityUnit, doseMed } = formValues;
      let volume = 3;

      if(age >= 18) {
        volume = 1.2;
      }

      let doseValue = dose;
      let quantityValue = quantity;

      if(doseUnit === "ml") {
        doseValue = dose * 1000;
      }

      if(quantityUnit === "mg") {
        quantityValue = quantity / 1000; //ml
      }
      
      let preResult = doseValue * weight * quantityValue;  //ejm 2000mg
      let result = Number(((preResult / doseMed) / volume).toFixed(2)); //2.66
      this.finalResult = this.roundToNearest(result, 0.5); //2.5
      // console.log(roundedToNearest);
      // Guardar los datos en LocalStorage
      this.deleteFormValues();
    } else {
      // Manejar el caso en que el formulario no es válido
      console.error('El formulario no es válido');
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.dosageForm.controls[controlName].hasError(errorName);
  }

  saveFormValues() {
    localStorage.setItem('dosageForm', JSON.stringify(this.dosageForm.value));
  }

  deleteFormValues() {
    localStorage.removeItem('dosageForm');
  }

  loadFormValues() {
    const savedFormValues = localStorage.getItem('dosageForm');
    if (savedFormValues) {
      this.dosageForm.setValue(JSON.parse(savedFormValues));
    }
  }
}
