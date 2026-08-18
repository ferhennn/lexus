package com.nexus.backend.web;

import com.nexus.backend.domain.sprint.Sprint;
import com.nexus.backend.repository.SprintRepository;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sprints")
public class SprintController {

    private final SprintRepository sprintRepository;

    public SprintController(SprintRepository sprintRepository) {
        this.sprintRepository = sprintRepository;
    }

    @GetMapping
    public List<Sprint> list() {
        return sprintRepository.findAll();
    }

    @PostMapping
    public Sprint create(@RequestBody Sprint sprint) {
        return sprintRepository.save(sprint);
    }
}
