import { Component, OnInit, DestroyRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../service/storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-other-child',
  imports: [FormsModule],
  templateUrl: './other-child.component.html',
  styleUrl: './other-child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherChildComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  formData = { nombre: '', edad: null };

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    // console.log(`OtherChildComponent montado.`);

    this.storageService.formState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        if (state['other-child']) {
          this.formData = state['other-child'];
        }
        // console.log(`OtherChildComponent => formData actual:`, this.formData);
      });
  }

  actualizarFormulario(): void {
    // console.log(`OtherChildComponent => actualizarFormulario:`, this.formData);
    this.storageService.updateFormSection('other-child', this.formData);
  }
}
