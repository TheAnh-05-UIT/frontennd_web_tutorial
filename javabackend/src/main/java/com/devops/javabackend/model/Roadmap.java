package com.devops.javabackend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "roadmaps")
public class Roadmap extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String icon;
    private String color;

    @OneToMany(mappedBy = "roadmap", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RoadmapStep> steps;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public List<RoadmapStep> getSteps() { return steps; }
    public void setSteps(List<RoadmapStep> steps) { this.steps = steps; }

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
