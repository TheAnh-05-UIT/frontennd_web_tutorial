package com.devops.javabackend.controller;

import com.devops.javabackend.model.Roadmap;
import com.devops.javabackend.service.RoadmapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roadmaps")
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @GetMapping
    public ResponseEntity<List<Roadmap>> getAllRoadmaps() {
        return ResponseEntity.ok(roadmapService.getAllRoadmaps());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roadmap> getRoadmapById(@PathVariable Long id) {
        return roadmapService.getRoadmapById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Roadmap> createRoadmap(@RequestBody Roadmap roadmap) {
        // Ensure bidirectional relationship is set before saving
        if (roadmap.getSteps() != null) {
            roadmap.getSteps().forEach(step -> step.setRoadmap(roadmap));
        }
        return ResponseEntity.ok(roadmapService.saveRoadmap(roadmap));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Roadmap> updateRoadmap(@PathVariable Long id, @RequestBody Roadmap roadmap) {
        return roadmapService.updateRoadmap(id, roadmap)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoadmap(@PathVariable Long id) {
        if (roadmapService.deleteRoadmap(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
