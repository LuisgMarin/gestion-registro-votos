import { Component, OnInit, ViewChild } from '@angular/core';
import { Candidatos } from './candidatos';
import { CandidatosService } from './candidato.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CandidatoAddEditComponent } from '../candidato-add-edit/candidato-add-edit.component';
import { CoreService } from '../services/core-service.service';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css'],
})
export class CandidatosComponent implements OnInit {
  candidatos: Candidatos[];
  isAuthenticated: boolean = false; // Inicializa como falso

  constructor(
    private candidatosService: CandidatosService,
    private _dialog: MatDialog,
    private _canService: CandidatosService,
    private _coreService: CoreService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'nombrePartido',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getCandidatosList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CandidatoAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCandidatosList();
        }
      },
    });
  }

  getCandidatosList() {
    this.candidatosService.getCandidatos().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res)
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCandidato(id: number) {
    this._canService.deleteCandidato(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Candidato Eliminado!', 'Hecho');
        this.getCandidatosList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CandidatoAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCandidatosList();
        }
      },
    });
  }

}
