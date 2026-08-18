package com.nexus.backend.repository;

import com.nexus.backend.domain.project.Project;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
    List<Project> findByWorkspaceId(UUID workspaceId);
}
