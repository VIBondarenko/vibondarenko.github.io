// Project Modal System
class ProjectManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupNavbarScroll();
    }

    // Function to load project details
    async loadProject(projectName, projectFile) {
        const modalTitle = document.getElementById('projectModalLabel');
        const modalBody = document.getElementById('projectModalBody');
        
        // Set modal title
        modalTitle.textContent = projectName;
        
        // Show loading spinner
        modalBody.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading project details...</p>
            </div>
        `;
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('projectModal'));
        modal.show();
        
        try {
            // Fetch project content
            const response = await fetch(projectFile);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            
            // Update modal body with content
            modalBody.innerHTML = content;
            
        } catch (error) {
            console.error('Error loading project:', error);
            modalBody.innerHTML = `
                <div class="text-center py-4">
                    <div class="alert alert-danger" role="alert">
                        <i class="fas fa-exclamation-triangle mb-2"></i>
                        <h5>Error Loading Project</h5>
                        <p>Sorry, we couldn't load the project details. Please try again later.</p>
                    </div>
                </div>
            `;
        }
    }

    // Setup smooth scrolling for navigation links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Setup navbar background on scroll
    setupNavbarScroll() {
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.projectManager = new ProjectManager();
});

// Global function for onclick handlers
function loadProject(projectName, projectFile) {
    if (window.projectManager) {
        window.projectManager.loadProject(projectName, projectFile);
    }
}

// Global function for screenshot modal
function openScreenshot(imageSrc, imageTitle) {
    const modal = document.getElementById('screenshotModal');
    const modalTitle = document.getElementById('screenshotModalLabel');
    const modalImage = document.getElementById('screenshotImage');
    
    modalTitle.textContent = imageTitle;
    modalImage.src = imageSrc;
    modalImage.alt = imageTitle;
    
    const screenshotModal = new bootstrap.Modal(modal);
    screenshotModal.show();
}

// Handle keyboard navigation for screenshot galleries
function handleScreenshotKeydown(event, imagePath, title) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openScreenshot(imagePath, title);
    }
}