import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private formState = new BehaviorSubject<{ [key: string]: any }>({});
  formState$ = this.formState.asObservable(); // Para suscribirse desde otros componentes

  updateFormSection(sectionKey: string, data: any): void {
    const currentState = this.formState.getValue();
    this.formState.next({ ...currentState, [sectionKey]: data });
    // console.log('StorageService => updateFormSection:', sectionKey, data);
  }

  getFormState(): { [key: string]: any } {
    return this.formState.getValue();
  }

  resetForm(): void {
    this.formState.next({});
  }
}
