package com.devops.javabackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    private String avatar;
    private String role;
    private LocalDate joinDate;
    
    private Integer coursesCompleted;
    private Integer articlesRead;
    private Integer projectsFinished;
    private Integer learningStreak;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDate getJoinDate() { return joinDate; }
    public void setJoinDate(LocalDate joinDate) { this.joinDate = joinDate; }

    public Integer getCoursesCompleted() { return coursesCompleted; }
    public void setCoursesCompleted(Integer coursesCompleted) { this.coursesCompleted = coursesCompleted; }

    public Integer getArticlesRead() { return articlesRead; }
    public void setArticlesRead(Integer articlesRead) { this.articlesRead = articlesRead; }

    public Integer getProjectsFinished() { return projectsFinished; }
    public void setProjectsFinished(Integer projectsFinished) { this.projectsFinished = projectsFinished; }

    public Integer getLearningStreak() { return learningStreak; }
    public void setLearningStreak(Integer learningStreak) { this.learningStreak = learningStreak; }
}
