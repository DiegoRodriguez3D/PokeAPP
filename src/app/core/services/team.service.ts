// team.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'https://localhost:7220/api/Teams';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl);
  }

  createTeam(teamData: { teamName: string; pokemonIds: number[] }): Observable<Team> {
    return this.http.post<Team>(this.baseUrl, teamData);
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
