package com.voting.VotingApp.service;

import com.voting.VotingApp.dto.LoginDTO;
import com.voting.VotingApp.dto.UserDTO;
import com.voting.VotingApp.model.UserData;

public interface UserService {
    UserData addUser(UserDTO user);

    UserData loginUser(LoginDTO user);
}
