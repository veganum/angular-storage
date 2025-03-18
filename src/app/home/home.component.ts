import { Component, OnInit, DestroyRef, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StorageService } from './service/storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChildComponent } from './shared/child/child.component';
import { OtherChildComponent } from './shared/other-child/other-child.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ChildComponent, OtherChildComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef); // Inyectamos ChangeDetectorRef

  formState: any = {};

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    // console.log('HomeComponent montado.');

    this.storageService.formState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        // Forzamos nueva referencia para que OnPush detecte el cambio
        this.formState = { ...state };
        console.log('HomeComponent => formState actualizado:', this.formState);
        this.cdr.markForCheck(); // Forzamos la detección de cambios
        this.cdr.detectChanges();
      });
  }
}
