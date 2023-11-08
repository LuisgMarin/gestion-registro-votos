import { Injectable } from '@angular/core';
import { Candidatos } from './candidatos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CandidatosService {
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getCandidatos(): Observable<any> {
    return this.http.get('http://localhost:8081/consutar-candidatos');
  }

  create(data: any) : Observable<any> {
    return this.http.post(`http://localhost:8084/crear-candidato`, data, {headers: this.httpHeaders})
  }

  update(data: any): Observable<any>{
    return this.http.put(`http://localhost:8083/editar-candidato`, data, {headers: this.httpHeaders})
  }
  deleteCandidato(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8085/eliminar-candidato/${id}`);
  }
}
