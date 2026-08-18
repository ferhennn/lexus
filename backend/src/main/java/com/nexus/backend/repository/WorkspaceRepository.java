package com.nexus.backend.repository;

import com.nexus.backend.domain.workspace.Workspace;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, UUID> {
    List<Workspace> findByOrganizationId(UUID organizationId);
}
