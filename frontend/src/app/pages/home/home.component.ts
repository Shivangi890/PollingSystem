import { Component } from '@angular/core';
import { PollCardComponent } from "../../components/poll-card/poll-card.component";
import { PollCardConfig } from '../../interfaces/ui-config/poll-card-config.interface';
import { PollingService } from '../../services/pollingService';
import { ToastrService } from 'ngx-toastr';
import { CreatePoll, CreatePollOptions, CreatePollVoters, Polls } from '../../interfaces/models/create-poll.interface';
import { AuthService } from '../../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { UserData } from '../../polling.model';

@Component({
  selector: 'app-home',
  imports: [PollCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  cards: PollCardConfig[] = [];
  currentUser!: UserData;

  constructor(private pollService: PollingService, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser() ?? '';
    this.pollService.getPolls(false)
    .subscribe((polls: Polls[]) => {
      const cards = polls.map((item: Polls) => {
        const isOwner = this.currentUser?.userId == item.ownerId;
        item.options.map(opt => {
          opt.count = opt.votes.length;
          opt.id = opt.id.toString();
        })
        item.voters = item.options.flatMap(opt => 
          opt.votes.map(vote => ({
            voterId: vote.voterId,
            voterName: vote.voterName,
            optionId: opt.id
          }))
        )
        const voterIndex = item.voters?.findIndex(voter => voter.voterId == this.currentUser.userId);
        const hasVoted = isOwner ? false : (voterIndex >= 0);
        console.log(item);
        return {
          dataCreated: item.createdDate,
          id: item.pollId,
          title: item.title,
          options: item.options,
          isOwner: isOwner,
          hasVoted: hasVoted,
          totalVotes: item.voters.length
        } as unknown as PollCardConfig
      });
      this.pollService.setPolls(cards);
    });
    this.pollService.polls$.subscribe(cards => {
      this.cards = cards;
      console.log(this.cards);
    });
  }

  handleVote(event: {voter: CreatePollVoters, pollId: string}) {
    this.pollService.saveVotes(event).pipe(catchError(() => {
      this.toastr.error("Failed to submit your vote! Please try again");
      return of(1);
    }
    ))
    .subscribe((response) => {
      if(response) return;
      const currentCards = this.pollService.getCurrentPolls();
      const updatedCards = currentCards.map(card => {
        if(card.id === event.pollId) {
          const option = card.options.find(opt => opt.id === event.voter.optionId);
          if(option) {
            option.votes.push({
              voterId: event.voter.voterId,
              voterName: event.voter.voterName
            });
            option.count = option.votes.length;
          }
          card.hasVoted = card.isOwner ? false : card.options.some(option => 
            option.votes?.some(vote => vote.voterId === this.currentUser.userId)
          );
          card.totalVotes = card.options.reduce((total, opt) => total + (opt.votes?.length || 0), 0);
        }
        return card;
      });
      this.pollService.setPolls(updatedCards);
      this.toastr.success("Your vote has been successfully updated");
    });
  }
}
