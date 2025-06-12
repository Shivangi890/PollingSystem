import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PollCardConfig } from '../../interfaces/ui-config/poll-card-config.interface';
import { CreatePollVoters } from '../../interfaces/models/create-poll.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../polling.model';

@Component({
  selector: 'app-poll-card',
  imports: [CommonModule],
  templateUrl: './poll-card.component.html',
  styleUrl: './poll-card.component.scss'
})
export class PollCardComponent {

  @Input() config!: PollCardConfig;
  @Input() isAdmin : boolean = false;
  @Output() vote: EventEmitter<{voter: CreatePollVoters, pollId: string}> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  selectedIndex = 0;
  currentUsr!: UserData;
  voterOption! : CreatePollVoters;
  constructor(private authService: AuthService) {
    this.currentUsr = this.authService.getCurrentUser();
  }

  percentage(count: number) {
    return this.config.totalVotes === 0 ? 0 : (count/this.config.totalVotes) * 100;
  }

  selectOption(id: string) {
    this.selectedIndex = +id;
    this.voterOption = {
      optionId: this.selectedIndex.toString(),
      voterId: this.currentUsr.userId,
      voterName: this.currentUsr.userName
    }
  }

  handleVote() {
    this.vote.emit({voter: this.voterOption, pollId: this.config.id});
  }

  handleDelete() {
    this.delete.emit();
  }
}
