import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CandidatosService } from '../candidatos/candidato.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../services/core-service.service';
import { Candidatos } from '../candidatos/candidatos';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-candidato-add-edit',
  templateUrl: './candidato-add-edit.component.html',
  styleUrls: ['./candidato-add-edit.component.css']
})
export class CandidatoAddEditComponent implements OnInit{
  candidatoForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private fb: FormBuilder,
    private canService: CandidatosService,
    private _dialogRef: MatDialogRef<CandidatoAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.candidatoForm = this.fb.group({
      cedula: '',
      nombre: '',
      apellido: '',
      idPartido: '',
    });
  }

  ngOnInit(): void {
    this.candidatoForm.patchValue(this.data);
    console.log(this.candidatoForm)
  }

  onFormSubmit() {
    if (this.candidatoForm.valid) {
      if (this.data) {
        this.canService
          .update(this.candidatoForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Candidato Actualizado!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.canService.create(this.candidatoForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Candidato añadido satisfactoriamente');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            swal.fire({
              title: 'Candidato creado satisfactoriamente',
              timer: 2000
            })
            this.route.navigate(['/candidatos'])

          },
        });
      }
    }
  }
}
