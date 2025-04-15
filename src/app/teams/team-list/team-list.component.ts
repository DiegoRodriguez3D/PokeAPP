// team-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../core/services/team.service';
import { Team } from '../../core/models/team.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './team-list.component.html'
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getTeams().subscribe(data => {
      this.teams = data;
    });
  }

  deleteTeam(id: number) {
    this.teamService.deleteTeam(id).subscribe(() => {
      this.loadTeams();
    });
  }
}
