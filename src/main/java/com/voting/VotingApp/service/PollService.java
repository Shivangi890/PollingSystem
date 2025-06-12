package com.voting.VotingApp.service;

import com.voting.VotingApp.dto.PollDTO;
import com.voting.VotingApp.model.Voters;

import java.util.List;

public interface PollService {

    void addPolls(PollDTO pollData);

    List<PollDTO> getAllPolls();

    List<PollDTO> getPollsByUserId(String id);

    void saveVotes(String pollId, Voters votes);

    void deletePollById(String id);
}
