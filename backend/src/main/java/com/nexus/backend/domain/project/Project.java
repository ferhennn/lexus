package com.nexus.backend.domain.project;

import com.nexus.backend.domain.BaseEntity;
import com.nexus.backend.domain.workspace.Workspace;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
public class Project extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Lob
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status = ProjectStatus.PLANNING;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectHealth health = ProjectHealth.ON_TRACK;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public ProjectHealth getHealth() {
        return health;
    }

    public void setHealth(ProjectHealth health) {
        this.health = health;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }
}
