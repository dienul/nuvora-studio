const projectForm = document.getElementById("projectForm");
const projectId = document.getElementById("projectId");
const projectName = document.getElementById("projectName");
const projectService = document.getElementById("projectService");
const projectStatus = document.getElementById("projectStatus");
const projectDescription = document.getElementById("projectDescription");
const projectTableBody = document.getElementById("projectTableBody");
const projectEmptyState = document.getElementById("projectEmptyState");
const projectModalElement = document.getElementById("projectModal");
const projectModalLabel = document.getElementById("projectModalLabel");
const logoutButton = document.getElementById("logoutButton");
const totalProjects = document.getElementById("totalProjects");
const completedProjects = document.getElementById("completedProjects");
const progressProjects = document.getElementById("progressProjects");
const projectModal = new bootstrap.Modal(projectModalElement);

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("nuvoraCurrentUser"));
    } catch {
        return null;
    }
}

function checkAuthentication() {
    if (getCurrentUser()) {
        return true;
    }

    window.location.href = "login.html";
    return false;
}

function getProjects() {
    try {
        const projects = JSON.parse(localStorage.getItem("nuvoraProjects"));
        return Array.isArray(projects) ? projects : [];
    } catch {
        return [];
    }
}

function saveProjects(projects) {
    localStorage.setItem("nuvoraProjects", JSON.stringify(projects));
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

function getStatusBadge(status) {
    if (status === "Completed") {
        return "text-bg-success";
    }

    if (status === "In Progress") {
        return "text-bg-warning";
    }

    return "text-bg-secondary";
}

function resetProjectForm() {
    projectForm.reset();
    projectId.value = "";
    projectStatus.value = "Planning";
    projectModalLabel.textContent = "Add Project";
}

function updateStatistics(projects) {
    totalProjects.textContent = projects.length;

    completedProjects.textContent = projects.filter(function (project) {
        return project.status === "Completed";
    }).length;

    progressProjects.textContent = projects.filter(function (project) {
        return project.status === "In Progress";
    }).length;
}

function renderProjects() {
    const projects = getProjects();
    projectTableBody.innerHTML = "";
    projectEmptyState.classList.toggle("d-none", projects.length > 0);

    projects.forEach(function (project) {
        const row = document.createElement("tr");
        const safeName = escapeHtml(project.name);

        row.innerHTML = `
            <th class="p-3" scope="row">
                <span class="fw-semibold">${safeName}</span>
            </th>
            <td class="p-3">${escapeHtml(project.service)}</td>
            <td class="p-3">
                <span class="badge ${getStatusBadge(project.status)}">
                    ${escapeHtml(project.status)}
                </span>
            </td>
            <td class="p-3">${escapeHtml(project.description)}</td>
            <td class="p-3 text-end">
                <div class="d-flex gap-2 justify-content-end">
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-dark"
                        aria-label="Edit project ${safeName}"
                        onclick="editProject(${project.id})"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-danger"
                        aria-label="Delete project ${safeName}"
                        onclick="deleteProject(${project.id})"
                    >
                        Delete
                    </button>
                </div>
            </td>
        `;

        projectTableBody.appendChild(row);
    });

    updateStatistics(projects);
}

projectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const projects = getProjects();
    const id = Number(projectId.value);
    const name = projectName.value.trim();
    const service = projectService.value;
    const status = projectStatus.value;
    const description = projectDescription.value.trim();

    if (!name || !service || !status || !description) {
        return;
    }

    if (id) {
        const projectIndex = projects.findIndex(function (project) {
            return project.id === id;
        });

        if (projectIndex !== -1) {
            projects[projectIndex] = {
                ...projects[projectIndex],
                name,
                service,
                status,
                description
            };
        }
    } else {
        projects.push({
            id: Date.now(),
            name,
            service,
            status,
            description,
            createdAt: new Date().toISOString()
        });
    }

    saveProjects(projects);
    renderProjects();
    resetProjectForm();
    projectModal.hide();
});

function editProject(id) {
    const project = getProjects().find(function (item) {
        return item.id === id;
    });

    if (!project) {
        return;
    }

    projectId.value = project.id;
    projectName.value = project.name;
    projectService.value = project.service;
    projectStatus.value = project.status;
    projectDescription.value = project.description;
    projectModalLabel.textContent = "Edit Project";
    projectModal.show();
}

function deleteProject(id) {
    const projects = getProjects();
    const project = projects.find(function (item) {
        return item.id === id;
    });

    if (!project || !confirm(`Delete project "${project.name}"?`)) {
        return;
    }

    const updatedProjects = projects.filter(function (item) {
        return item.id !== id;
    });

    saveProjects(updatedProjects);
    renderProjects();
}

document.querySelectorAll('[data-bs-target="#projectModal"]').forEach(function (button) {
    button.addEventListener("click", resetProjectForm);
});

projectModalElement.addEventListener("hidden.bs.modal", resetProjectForm);

logoutButton.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("nuvoraCurrentUser");
    window.location.href = "login.html";
});

if (checkAuthentication()) {
    renderProjects();
}
