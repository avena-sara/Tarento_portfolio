package com.portfolio.demo.service;

import com.portfolio.demo.model.Project;
import com.portfolio.demo.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project project) {
    return projectRepository.findById(id)
        .map(existingProject -> {
            // Only update fields that are provided
            if (project.getProjectName() != null) {
                existingProject.setProjectName(project.getProjectName());
            }
            if (project.getDescription() != null) {
                existingProject.setDescription(project.getDescription());
            }
            return projectRepository.save(existingProject);
        })
        .orElseThrow(() -> new NoSuchElementException("Project not found with id: " + id));
        }

    

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
