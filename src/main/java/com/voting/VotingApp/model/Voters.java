package com.voting.VotingApp.model;

public class Voters {
    private String voterId;
    private String voterName;
    private String optionId;

    public String getVoterId() {
        return voterId;
    }

    public void setVoterId(String voterId) {
        this.voterId = voterId;
    }

    public String getVoterUserName() {
        return voterName;
    }

    public void setVoterUserName(String voterUserName) {
        this.voterName = voterUserName;
    }

    public String getOptionId() {
        return optionId;
    }

    public void setOptionId(String optionId) {
        this.optionId = optionId;
    }

    public Voters(String voterId, String voterUserName, String optionId) {
        this.voterId = voterId;
        this.voterName = voterUserName;
        this.optionId = optionId;
    }
}
