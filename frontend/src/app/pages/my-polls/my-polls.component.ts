import { Component } from '@angular/core';
import { PollCardComponent } from '../../components/poll-card/poll-card.component';
import { PollCardConfig } from '../../interfaces/ui-config/poll-card-config.interface';
import { PollingService } from '../../services/pollingService';
import { UserData } from '../../polling.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Polls } from '../../interfaces/models/create-poll.interface';
import { EmptyCardComponent } from '../../components/empty-card/empty-card.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-my-polls',
  imports: [PollCardComponent, EmptyCardComponent],
  templateUrl: './my-polls.component.html',
  styleUrl: './my-polls.component.scss'
})
export class MyPollsComponent {
  cards: PollCardConfig[] = [];
  currentUser!: UserData;
  
  constructor(private pollService: PollingService, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
      this.currentUser = this.authService.getCurrentUser() ?? '';
      this.pollService.getPolls(true).subscribe((polls: Polls[]) => {
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

    handleDelete(id: string) {
      this.pollService.deletePoll(id).pipe(
        catchError((err) => {
          this.toastr.error("Issue occurred while Deleting the Poll, Please try again");
          return of(1);
        })
      ).subscribe((res) => {
        if(res === 1) return;
        const polls = this.pollService.getCurrentPolls();
        const updatedPolls = polls.filter(poll => poll.id != id);
        this.pollService.setPolls(updatedPolls);
        this.toastr.success("You have successfully deleted the Poll");
      });
    }

}
