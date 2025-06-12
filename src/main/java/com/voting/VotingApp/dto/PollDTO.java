package com.voting.VotingApp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PollDTO {

    private String pollId;
    private String title;
    private List<OptionDTO> options;

    @JsonProperty("isActive")
    private boolean active;

    private String ownerId;
    private String createdDate;
//    private List<> voters;


    public String getPollId() {
        return pollId;
    }

    public void setPollId(String pollId) {
        this.pollId = pollId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<OptionDTO> getOptions() {
        return options;
    }

    public void setOptions(List<OptionDTO> options) {
        this.options = options;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public PollDTO(String pollId, String title, List<OptionDTO> options, boolean active, String ownerId, String createdDate) {
        this.pollId = pollId;
        this.title = title;
        this.options = options;
        this.active = active;
        this.ownerId = ownerId;
        this.createdDate = createdDate;
    }
}
