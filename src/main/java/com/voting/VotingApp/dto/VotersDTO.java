package com.voting.VotingApp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.voting.VotingApp.entity.Voters;

public class VotersDTO {

    private String voterId;

    @JsonProperty("voterName")
    private String voterUserName;

    public VotersDTO(Voters voters) {
        this.voterId = voters.getUserId();
        this.voterUserName = voters.getUserName();
    }

    public String getVoterId() {
        return voterId;
    }

    public void setVoterId(String voterId) {
        this.voterId = voterId;
    }

    public String getVoterUserName() {
        return voterUserName;
    }

    public void setVoterUserName(String voterUserName) {
        this.voterUserName = voterUserName;
    }
}
