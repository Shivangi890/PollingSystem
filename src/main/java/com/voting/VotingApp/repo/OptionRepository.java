package com.voting.VotingApp.repo;

import com.voting.VotingApp.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {

    @Query("SELECT o FROM Option o LEFT JOIN FETCH o.votes WHERE o.poll.id IN :pollIds")
    List<Option> findOptionsWithVotes(@Param("pollIds") List<Long> pollIds);
}
