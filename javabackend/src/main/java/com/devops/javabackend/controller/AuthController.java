package com.devops.javabackend.controller;

import com.devops.javabackend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private com.devops.javabackend.repository.UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        try {
            // Attempt authentication
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            // If successful, generate token
            com.devops.javabackend.model.User user = userRepository.findByEmail(email).orElse(null);
            String role = (user != null && user.getRole() != null) ? user.getRole().toUpperCase() : "USER";
            String token = jwtUtil.generateToken(email, role);

            return ResponseEntity.ok(Map.of("token", token));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }
    }
    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String email = request.get("email");
        String password = request.get("password");

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Email already exists"));
        }

        com.devops.javabackend.model.User newUser = new com.devops.javabackend.model.User();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setRole("USER");
        newUser.setJoinDate(java.time.LocalDate.now());
        newUser.setAvatar("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"); // default avatar
        newUser.setCoursesCompleted(0);
        newUser.setArticlesRead(0);
        newUser.setProjectsFinished(0);
        newUser.setLearningStreak(0);

        userRepository.save(newUser);

        // Generate token right away so they can log in
        String token = jwtUtil.generateToken(email, "USER");

        return ResponseEntity.ok(Map.of("token", token, "message", "Registration successful"));
    }
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(org.springframework.security.core.Authentication authentication) {
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
                        "avatar", user.getAvatar(),
                        "joinDate", user.getJoinDate(),
                        "learningStreak", user.getLearningStreak(),
                        "coursesCompleted", user.getCoursesCompleted(),
                        "projectsFinished", user.getProjectsFinished(),
                        "articlesRead", user.getArticlesRead()
                )))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
