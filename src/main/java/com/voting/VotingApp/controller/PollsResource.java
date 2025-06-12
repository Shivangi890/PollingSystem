package com.voting.VotingApp.controller;

import com.voting.VotingApp.dto.PollDTO;
import com.voting.VotingApp.model.Voters;
import com.voting.VotingApp.service.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/polls")
public class PollsResource {

    @Autowired
    private PollService pollService;

    @PostMapping(path = "/addPoll")
    public void addPolls(@RequestBody PollDTO pollData) {
        pollService.addPolls(pollData);
    }

    @GetMapping(path = "/getPolls")
    public ResponseEntity<List<PollDTO>> getPolls(@RequestParam(name = "userId", required = false) String ownerId) {
        List<PollDTO> polls;
        if(ownerId.isEmpty()) {
            polls = pollService.getAllPolls();
        }
        else polls = pollService.getPollsByUserId(ownerId);
        return ResponseEntity.ok(polls);
    }

    @PostMapping(path = "/{pollId}/votes")
    public void saveVotes(@PathVariable String pollId, @RequestBody Voters voters) {
        pollService.saveVotes(pollId, voters);
    }

    @DeleteMapping(path = "/{pollId}")
    public ResponseEntity<String> deletePoll(@PathVariable String pollId) {
        pollService.deletePollById(pollId);
        return ResponseEntity.ok("Poll deactivated successfully");
    }
}
