import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CreatePoll, CreatePollVoters, Polls } from '../interfaces/models/create-poll.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { PollCardConfig } from '../interfaces/ui-config/poll-card-config.interface';

@Injectable({
  providedIn: 'root'
})
export class PollingService { 
    POLLS = 'polls';
    private pollsSubject: BehaviorSubject<PollCardConfig[]> = new BehaviorSubject<PollCardConfig[]>([]);
    public polls$ = this.pollsSubject.asObservable();
    createPolls: CreatePoll[] = [];
    
    constructor(private http: HttpClient, private authService: AuthService) {}

    addPolls(pollData: CreatePoll): Observable<any> {
        return this.http.post(`/api/v1/polls/addPoll`, pollData);
    }

    getPolls(isAdmin: boolean) {
        let id = "";
        if(isAdmin) {
            id = this.authService.getCurrentUser().userId;
        }
        return this.http.get<Polls[]>(`/api/v1/polls/getPolls`, { params: new HttpParams().set('userId', id) });
    }

    saveVotes(req: {voter: CreatePollVoters, pollId: string}) {
        return this.http.post(`/api/v1/polls/${req.pollId}/votes`, req.voter);
    }

    setPolls(polls: PollCardConfig[]) {
        return this.pollsSubject.next(polls);
    }

    getCurrentPolls() {
        return this.pollsSubject.getValue();
    }
    
    deletePoll(id: string) {
        return this.http.delete(`/api/v1/polls/${id}`, { responseType: 'text' });
    }
}