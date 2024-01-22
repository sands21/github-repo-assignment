const usernameInput = document.getElementById('username');
const fetchButton = document.getElementById('fetch-button');
const repositoriesContainer = document.getElementById('repositories');
const perPageSelect = document.getElementById('per-page-select');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
let repositoriesPerPage = 10; // Default per-page value

fetchButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const perPage = perPageSelect.value || repositoriesPerPage;

    fetch(`/repositories?username=${username}&page=${currentPage}&perPage=${perPage}`)
        .then(response => response.json())
        .then(data => {
            repositoriesContainer.innerHTML = '';
            displayRepositories(data.repositories);
            updatePaginationControls(data.currentPage, data.totalPages);
        })
        .catch(error => {
            console.error(error);
            alert('Error fetching repositories. Please check the username and try again.');
        });
});

function displayRepositories(repositories) {
    repositories.forEach(repository => {
        const repoElement = document.createElement('div');
        repoElement.innerHTML = `
            <h2><a href="${repository.html_url}" target="_blank">${repository.name}</a></h2>
            <p>${repository.description}</p>
        `;
        repositoriesContainer.appendChild(repoElement);
    });
}

function updatePaginationControls(currentPage, totalPages, totalRepos) {
    // Clear previous pagination elements
    paginationContainer.innerHTML = '';
  
    // Show total repositories and pages information
    const infoElement = document.createElement('span');
    infoElement.textContent = `Showing ${currentPage * repositoriesPerPage} of ${totalRepos} repositories (${currentPage} of ${totalPages} pages)`;
    paginationContainer.appendChild(infoElement);
  
    // Show "Previous" button if not on the first page
    if (currentPage > 1) {
      const previousButton = document.createElement('button');
      previousButton.textContent = 'Previous';
      previousButton.addEventListener('click', () => {
        currentPage--;
        fetchRepositories();
      });
      paginationContainer.appendChild(previousButton);
    }
  
    // Show page numbers around the current page
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    for (let page = startPage; page <= endPage; page++) {
      const pageNumberButton = document.createElement('button');
      pageNumberButton.textContent = page;
      pageNumberButton.classList.add(page === currentPage ? 'active' : ''); // Highlight current page
      pageNumberButton.addEventListener('click', () => {
        currentPage = page;
        fetchRepositories();
      });
      paginationContainer.appendChild(pageNumberButton);
    }
  
    // Show "Next" button if not on the last page
    if (currentPage < totalPages) {
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.addEventListener('click', () => {
        currentPage++;
        fetchRepositories();
      });
      paginationContainer.appendChild(nextButton);
    }
  }
  