package com.devops.javabackend.service;

import com.devops.javabackend.model.Tutorial;
import com.devops.javabackend.repository.TutorialRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TutorialService {

    private final TutorialRepository tutorialRepository;

    public TutorialService(TutorialRepository tutorialRepository) {
        this.tutorialRepository = tutorialRepository;
    }

    public List<Tutorial> getAllTutorials() {
        return tutorialRepository.findAll();
    }

    public List<Tutorial> getTutorialsByCategory(String category) {
        return tutorialRepository.findByCategory(category);
    }

    public Optional<Tutorial> getTutorialById(Long id) {
        return tutorialRepository.findById(id);
    }

    public Tutorial saveTutorial(Tutorial tutorial) {
        return tutorialRepository.save(tutorial);
    }

    public Optional<Tutorial> updateTutorial(Long id, Tutorial updatedTutorial) {
        return tutorialRepository.findById(id).map(existing -> {
            existing.setTitle(updatedTutorial.getTitle());
            existing.setDescription(updatedTutorial.getDescription());
            existing.setCategory(updatedTutorial.getCategory());
            existing.setCoverImage(updatedTutorial.getCoverImage());
            existing.setReadTime(updatedTutorial.getReadTime());
            existing.setViews(updatedTutorial.getViews());
            existing.setPublishDate(updatedTutorial.getPublishDate());
            existing.setContent(updatedTutorial.getContent());
            // Author is usually managed differently, but we can set it here too if needed
            existing.setAuthor(updatedTutorial.getAuthor());
            return tutorialRepository.save(existing);
        });
    }

    public boolean deleteTutorial(Long id) {
        if (tutorialRepository.existsById(id)) {
            tutorialRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
