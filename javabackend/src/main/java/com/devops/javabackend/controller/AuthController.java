package com.devops.javabackend.controller;

import com.devops.javabackend.dto.LoginRequest;
import com.devops.javabackend.dto.RegisterRequest;
import com.devops.javabackend.model.User;
import com.devops.javabackend.repository.UserRepository;
import com.devops.javabackend.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String DEFAULT_AVATAR = "/default-avatar.png";

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            User user = userRepository.findByEmail(request.getEmail()).orElse(null);
            String role = (user != null && user.getRole() != null) ? user.getRole().toUpperCase() : "USER";
            String token = jwtUtil.generateToken(request.getEmail(), role);

            return ResponseEntity.ok(Map.of("token", token));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Email already exists"));
        }

        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole("USER");
        newUser.setJoinDate(LocalDate.now());
        newUser.setAvatar(DEFAULT_AVATAR);
        newUser.setCoursesCompleted(0);
        newUser.setArticlesRead(0);
        newUser.setProjectsFinished(0);
        newUser.setLearningStreak(0);

        userRepository.save(newUser);

        String token = jwtUtil.generateToken(request.getEmail(), "USER");

        return ResponseEntity.ok(Map.of("token", token, "message", "Registration successful"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "role", user.getRole(),
                        "avatar", user.getAvatar() != null ? user.getAvatar() : DEFAULT_AVATAR,
                        "joinDate", user.getJoinDate(),
                        "learningStreak", user.getLearningStreak(),
                        "coursesCompleted", user.getCoursesCompleted(),
                        "projectsFinished", user.getProjectsFinished(),
                        "articlesRead", user.getArticlesRead()
                )))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
