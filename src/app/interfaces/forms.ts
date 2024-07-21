export interface DosageFormValues {
  age: number;
  dose: number;
  weight: number;
  quantity: number;
  doseUnit: 'mg' | 'ml';
  quantityUnit: 'mg' | 'ml';
  doseMed: number;
}