export interface CreatePoll {
    pollId: string;
    title: string;
    options: CreatePollOptions[];
    isActive: boolean;
    ownerId: string;
    createdDate: Date;
    voters: CreatePollVoters[];
}
export interface Polls {
    pollId: string;
    title: string;
    options: OptionWithVotes[];
    isActive: boolean;
    ownerId: string;
    createdDate: Date;
    voters: CreatePollVoters[];
}

export interface CreatePollOptions {
    id: string;
    name: string;
    count: number;
}

export interface OptionWithVotes  extends CreatePollOptions{
    votes: CreatePollVoters[];
}

export interface CreatePollVoters {
    voterId: string;
    voterName: string;
    optionId: string;
}
