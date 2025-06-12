package com.voting.VotingApp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="options")
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // if @ManyToOne(fetch = FethcType = Lazy) then when options are feched thene there would be no poll details inside option, by default fetch type is EAGER which mean poll is added with every option
    @ManyToOne
    @JoinColumn(name="poll_id", nullable = false)
    @JsonBackReference
    private Polls poll;

    @OneToMany(mappedBy = "option", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Voters> votes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Polls getPoll() {
        return poll;
    }

    public void setPoll(Polls poll) {
        this.poll = poll;
    }

    public List<Voters> getVotes() {
        return votes;
    }

    public void setVotes(List<Voters> votes) {
        this.votes = votes;
    }
}
