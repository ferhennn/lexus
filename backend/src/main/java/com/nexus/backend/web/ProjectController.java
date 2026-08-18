package com.nexus.backend.web;

import com.nexus.backend.domain.project.Project;
import com.nexus.backend.repository.ProjectRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public List<Project> list() {
        return projectRepository.findAll();
    }

    @PostMapping
    public Project create(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> get(@PathVariable UUID id) {
        return projectRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
