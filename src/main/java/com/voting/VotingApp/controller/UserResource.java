package com.voting.VotingApp.controller;

import com.voting.VotingApp.dto.LoginDTO;
import com.voting.VotingApp.dto.UserDTO;
import com.voting.VotingApp.model.UserData;
import com.voting.VotingApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserResource {

    @Autowired
    private UserService userService;

    @PostMapping(path="/save")
    public UserData saveUser(@RequestBody UserDTO user){
        UserData userData = userService.addUser(user);
        return userData;
    }

    @PostMapping(path = "/userLogin")
    public UserData loginUser(@RequestBody LoginDTO user) {
        return userService.loginUser(user);
    }
}
