import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-child',
  imports: [FormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnInit {
  @Input() id: string = 'child';
  formData = { nombre: '', edad: null };

  private destroyRef = inject(DestroyRef);

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    // console.log(`ChildComponent (${this.id}) montado.`);

    this.storageService.formState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        // Verificamos si hay algo guardado para este ID
        if (state[this.id]) {
          this.formData = state[this.id];
        }
        // console.log(
        //   `ChildComponent (${this.id}) => formData actual:`,
        //   this.formData
        // );
      });
  }

  actualizarFormulario(): void {
    // console.log(
    //   `ChildComponent (${this.id}) => actualizarFormulario:`,
    //   this.formData
    // );
    this.storageService.updateFormSection(this.id, this.formData);
  }
}
