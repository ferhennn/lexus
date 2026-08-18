package com.nexus.backend.repository;

import com.nexus.backend.domain.sprint.Sprint;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint, UUID> {
    List<Sprint> findByProjectId(UUID projectId);
}
