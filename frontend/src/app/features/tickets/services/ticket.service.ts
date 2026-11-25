import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { QueryParams } from '../../../core/constants/query-params';
import { CreateTicketRequest } from '../../../core/models/create-ticket-request.model';
import { TicketStatus } from '../../../core/models/ticket-status.enum';
import { Ticket } from '../../../core/models/ticket.model';
import { UpdateTicketRequest } from '../../../core/models/update-ticket-request.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly ticketsUrl = `${environment.apiBaseUrl}/tickets`;

  getAll(status: TicketStatus | null): Observable<Ticket[]> {
    const params = status ? new HttpParams().set(QueryParams.status, status) : undefined;
    return this.http.get<Ticket[]>(this.ticketsUrl, { params });
  }

  getById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.ticketsUrl}/${id}`);
  }

  create(request: CreateTicketRequest): Observable<Ticket> {
    return this.http.post<Ticket>(this.ticketsUrl, request);
  }

  update(id: number, request: UpdateTicketRequest): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.ticketsUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ticketsUrl}/${id}`);
  }
}
