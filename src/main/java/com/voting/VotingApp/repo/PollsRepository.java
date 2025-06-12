package com.voting.VotingApp.repo;

import com.voting.VotingApp.dto.PollDTO;
import com.voting.VotingApp.entity.Option;
import com.voting.VotingApp.entity.Polls;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface PollsRepository extends JpaRepository<Polls, Integer> {

    List<Polls> findByOwnerId(String ownerId);

    @Query("SELECT p FROM Polls p LEFT JOIN FETCH p.options WHERE p.active = true")
    List<Polls> findAllPollsWithOptions();

    @Query("SELECT p FROM Polls p LEFT JOIN FETCH p.options WHERE p.ownerId = :ownerId AND p.active = true")
    List<Polls> findPollsWithOptionsByOwnerId(@Param("ownerId") String ownerId);
}
