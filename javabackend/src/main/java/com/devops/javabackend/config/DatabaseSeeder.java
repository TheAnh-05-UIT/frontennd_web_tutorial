package com.devops.javabackend.config;

import com.devops.javabackend.model.User;
import com.devops.javabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Running DatabaseSeeder to fix invalid passwords...");
        List<User> users = userRepository.findAll();
        boolean updated = false;
        for (User user : users) {
            String pwd = user.getPassword();
            // If password is null, empty, or not a BCrypt hash (BCrypt hashes start with $2a$ or similar and are 60 chars long)
            if (pwd == null || pwd.isEmpty() || !pwd.startsWith("$2a$")) {
                System.out.println("Updating password for user: " + user.getEmail());
                user.setPassword(passwordEncoder.encode("admin"));
                userRepository.save(user);
                updated = true;
            }
        }
        if (updated) {
            System.out.println("Database passwords fixed successfully.");
        } else {
            System.out.println("All passwords are valid.");
        }
    }
}
