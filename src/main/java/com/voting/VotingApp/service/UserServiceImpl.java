package com.voting.VotingApp.service;

import com.voting.VotingApp.dto.LoginDTO;
import com.voting.VotingApp.dto.UserDTO;
import com.voting.VotingApp.entity.User;
import com.voting.VotingApp.model.UserData;
import com.voting.VotingApp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository usrRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserData addUser(UserDTO user) {
        User newUser = new User(user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                this.passwordEncoder.encode(user.getPassword()));
        usrRepo.save(newUser);
        UserData userData = new UserData();
        userData.setUserId(newUser.getUserId());
        userData.setUserName(newUser.getUserName());
        userData.setUserEmail(newUser.getEmail());
        return userData;
    }

    @Override
    public UserData loginUser(LoginDTO user) {
        User extUser = usrRepo.findByEmail(user.getEmail());
        if(extUser != null){
            Boolean isPwdRight = passwordEncoder.matches(user.getPassword(), extUser.getPassword());
            if(isPwdRight) {
                UserData usrData = new UserData();
                usrData.setUserEmail(extUser.getEmail());
                usrData.setUserName(extUser.getUserName());
                usrData.setUserId(extUser.getUserId());
                return usrData;
            }
            else {
                throw new RuntimeException("Email or password is incorrect");
            }
        }
        else {
            throw new RuntimeException("Email or Password is incorrect");
        }

    }
}
