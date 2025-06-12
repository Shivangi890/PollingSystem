package com.voting.VotingApp.repo;

import com.voting.VotingApp.entity.Voters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface VotersRepository extends JpaRepository<Voters, Long> {

}
