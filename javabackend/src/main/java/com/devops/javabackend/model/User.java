package com.devops.javabackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import java.util.List;

@Entity
@Table(name = "users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    private String password;
    private String avatar;
    private String role;
    private LocalDate joinDate;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserRoadmapProgress> roadmapProgress;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserProjectProgress> projectProgress;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserTutorialHistory> tutorialHistory;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDate getJoinDate() { return joinDate; }
    public void setJoinDate(LocalDate joinDate) { this.joinDate = joinDate; }

    public List<UserRoadmapProgress> getRoadmapProgress() { return roadmapProgress; }
    public void setRoadmapProgress(List<UserRoadmapProgress> roadmapProgress) { this.roadmapProgress = roadmapProgress; }

    public List<UserProjectProgress> getProjectProgress() { return projectProgress; }
    public void setProjectProgress(List<UserProjectProgress> projectProgress) { this.projectProgress = projectProgress; }

    public List<UserTutorialHistory> getTutorialHistory() { return tutorialHistory; }
    public void setTutorialHistory(List<UserTutorialHistory> tutorialHistory) { this.tutorialHistory = tutorialHistory; }
}
