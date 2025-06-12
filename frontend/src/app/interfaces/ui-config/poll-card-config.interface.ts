export interface PollCardConfig {
    id: string;
    title: string;
    isOwner: boolean;
    hasVoted: boolean;
    dateCreated: Date;
    options: PollCardOption[];
    totalVotes: number;
}

export class PollCardOption {
    name!: string;
    count!: number;
    id!: string;
    votes!: PollCardVotes[];
}

export class PollCardVotes {
    voterId!: string;
    voterName!: string;
}