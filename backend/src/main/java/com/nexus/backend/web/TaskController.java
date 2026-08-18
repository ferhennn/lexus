package com.nexus.backend.web;

import com.nexus.backend.domain.task.Task;
import com.nexus.backend.repository.TaskRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> list(@RequestParam(required = false) UUID projectId,
                            @RequestParam(required = false) UUID sprintId) {
        if (projectId != null) {
            return taskRepository.findByProjectId(projectId);
        }
        if (sprintId != null) {
            return taskRepository.findBySprintId(sprintId);
        }
        return taskRepository.findAll();
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> get(@PathVariable UUID id) {
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable UUID id, @RequestBody Task patch) {
        return taskRepository.findById(id).map(existing -> {
            if (patch.getStatus() != null) existing.setStatus(patch.getStatus());
            if (patch.getPriority() != null) existing.setPriority(patch.getPriority());
            if (patch.getStoryPoints() != null) existing.setStoryPoints(patch.getStoryPoints());
            if (patch.getSprint() != null) existing.setSprint(patch.getSprint());
            if (patch.getAssignee() != null) existing.setAssignee(patch.getAssignee());
            return ResponseEntity.ok(taskRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }
}
