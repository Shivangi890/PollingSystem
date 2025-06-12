package com.voting.VotingApp.service;

import com.voting.VotingApp.dto.OptionDTO;
import com.voting.VotingApp.dto.PollDTO;
import com.voting.VotingApp.dto.VotersDTO;
import com.voting.VotingApp.entity.Option;
import com.voting.VotingApp.entity.Polls;
import com.voting.VotingApp.entity.Voters;
import com.voting.VotingApp.model.Poll;
import com.voting.VotingApp.repo.OptionRepository;
import com.voting.VotingApp.repo.PollsRepository;
import com.voting.VotingApp.repo.VotersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PollServiceImpl implements PollService {

    @Autowired
    private PollsRepository pollsRepository;

    @Autowired
    private OptionRepository optionRepository;

    @Autowired
    private VotersRepository votersRepository;

    @Override
    public void addPolls(PollDTO pollData) {
        Polls polls = new Polls();
        polls.setQuestion(pollData.getTitle());
        polls.setActive(pollData.isActive());
        polls.setCreatedDate(pollData.getCreatedDate());
        polls.setOwnerId(pollData.getOwnerId());
        List<Option> options = pollData.getOptions().stream()
                        .map(optionDTO -> {
                            Option option = new Option();
                            option.setName(optionDTO.getName());
                            return option;
                        }).collect(Collectors.toList());
        polls.setOptions(options);
        pollsRepository.save(polls);
    }

    public List<PollDTO> getPollsByUserId(String ownerId) {
        List<Polls> polls = pollsRepository.findPollsWithOptionsByOwnerId(ownerId);
        this.setVotesWithOptions(polls);
        return polls.stream().map(this::convertToPollDto).collect((Collectors.toList()));
    }

    private List<Polls> setVotesWithOptions(List<Polls> polls) {
        List<Long> pollIds = polls.stream().map(Polls::getId).collect(Collectors.toList());
        List<Option> optionsWithVotes = optionRepository.findOptionsWithVotes(pollIds);
        Map<Long, List<Voters>> votesMap = optionsWithVotes.stream().collect(Collectors.toMap(Option::getId, Option::getVotes));
        for(Polls poll : polls) {
            for(Option option : poll.getOptions()) {
                option.setVotes(votesMap.getOrDefault(option.getId(), new ArrayList<>()));
            }
        }
        return polls;
    }

    public List<PollDTO> getAllPolls() {
        List<Polls> polls = pollsRepository.findAllPollsWithOptions();
        this.setVotesWithOptions(polls);
        return polls.stream().map(this::convertToPollDto).collect(Collectors.toList());
    }

    private PollDTO convertToPollDto(Polls polls) {
        List<OptionDTO> options = polls.getOptions().stream().map(option ->
                new OptionDTO(
                        Math.toIntExact(option.getId()), option.getName(), option.getVotes().stream().map(VotersDTO::new).toList()
        )).collect(Collectors.toList());
        return new PollDTO(Long.toString(polls.getId()), polls.getQuestion(), options, polls.isActive(), polls.getOwnerId(), polls.getCreatedDate());
    }

     public void saveVotes(String pollId, com.voting.VotingApp.model.Voters votes) {
        if(pollsRepository.existsById(Integer.parseInt(pollId))) {
            Voters voters = new Voters();
            voters.setUserId(votes.getVoterId());
            voters.setUserName(votes.getVoterUserName());
            Option option = new Option();
            option.setId(Long.parseLong(votes.getOptionId()));
            voters.setOption(option);
            votersRepository.save(voters);
//            return getAllPolls();
        }
        else {
            throw new RuntimeException("Cann't update votes for poll that doesn't exist");
        }
    }

    public void deletePollById(String id) {
        Polls poll = pollsRepository.findById(Integer.parseInt(id))
                .orElseThrow(() -> new RuntimeException("Poll not found"));
        poll.setActive(false);
        pollsRepository.save(poll);
    }
}
