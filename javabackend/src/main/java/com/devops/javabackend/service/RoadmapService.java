package com.devops.javabackend.service;

import com.devops.javabackend.model.Roadmap;
import com.devops.javabackend.repository.RoadmapRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;

    public RoadmapService(RoadmapRepository roadmapRepository) {
        this.roadmapRepository = roadmapRepository;
    }

    public List<Roadmap> getAllRoadmaps() {
        return roadmapRepository.findAll();
    }

    public Optional<Roadmap> getRoadmapById(Long id) {
        return roadmapRepository.findById(id);
    }

    public Roadmap saveRoadmap(Roadmap roadmap) {
        return roadmapRepository.save(roadmap);
    }

    public Optional<Roadmap> updateRoadmap(Long id, Roadmap updatedRoadmap) {
        return roadmapRepository.findById(id).map(existing -> {
            existing.setTitle(updatedRoadmap.getTitle());
            existing.setDescription(updatedRoadmap.getDescription());
            existing.setIcon(updatedRoadmap.getIcon());
            existing.setColor(updatedRoadmap.getColor());
            
            // Note: For steps, typically you handle them separately or overwrite the collection
            if (updatedRoadmap.getSteps() != null) {
                // To properly update bi-directional one-to-many, set roadmap reference on steps
                updatedRoadmap.getSteps().forEach(step -> step.setRoadmap(existing));
                existing.getSteps().clear();
                existing.getSteps().addAll(updatedRoadmap.getSteps());
            }

            return roadmapRepository.save(existing);
        });
    }

    public boolean deleteRoadmap(Long id) {
        if (roadmapRepository.existsById(id)) {
            roadmapRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
