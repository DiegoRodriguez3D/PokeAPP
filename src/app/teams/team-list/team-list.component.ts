// team-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { TeamService } from '../../core/services/team.service';
import { Team } from '../../core/models/team.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [
    CommonModule, 
    DragDropModule, 
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink,
  ],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];

  constructor(private teamService: TeamService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getTeams().subscribe(data => {
      this.teams = data;
    });
  }

  drop(event: CdkDragDrop<Team[]>) {
    moveItemInArray(this.teams, event.previousIndex, event.currentIndex);
  }

  confirmDelete(teamId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Deseas eliminar este equipo?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteTeam(teamId);
      }
    });
  }

  deleteTeam(id: number) {
    this.teamService.deleteTeam(id).subscribe(() => {
      this.loadTeams();
    });
  }
}
