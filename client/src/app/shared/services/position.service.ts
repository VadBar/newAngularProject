import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Position} from "../interfaces";
@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(private http: HttpClient) {}
  getAll(id: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${id}`);
  }
  create(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position);
  }
  update(name: string, cost: number, id: string): Observable<Position> {
    let obj = {
      name,
      cost
    };
    return this.http.patch<Position>(`/api/position/${id}`, obj);
  }
  remove(id: string): Observable<Message> {
    return this.http.delete<Message> (`/api/position/${id}`);
  }
}
