package com.devops.javabackend.service;

import com.devops.javabackend.model.Project;
import com.devops.javabackend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getProjectsByDifficulty(String difficulty) {
        return projectRepository.findByDifficulty(difficulty);
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public Optional<Project> updateProject(Long id, Project updatedProject) {
        return projectRepository.findById(id).map(existing -> {
            existing.setTitle(updatedProject.getTitle());
            existing.setDescription(updatedProject.getDescription());
            existing.setThumbnail(updatedProject.getThumbnail());
            existing.setTechStack(updatedProject.getTechStack());
            existing.setDifficulty(updatedProject.getDifficulty());
            existing.setGithubUrl(updatedProject.getGithubUrl());
            existing.setDemoUrl(updatedProject.getDemoUrl());
            existing.setStatus(updatedProject.getStatus());
            return projectRepository.save(existing);
        });
    }

    public boolean deleteProject(Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
