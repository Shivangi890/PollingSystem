package com.voting.VotingApp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class OptionDTO {
    private int optionId;
    private String name;
    private List<VotersDTO> votes;

    public int getId() {
        return optionId;
    }

    public void setId(int id) {
        this.optionId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<VotersDTO> getVotes() {
        return votes;
    }

    public void setVotes(List<VotersDTO> votes) {
        this.votes = votes;
    }

    public OptionDTO(int id, String name, List<VotersDTO> votes) {
        this.optionId = id;
        this.name = name;
        this.votes = votes;
    }
}
