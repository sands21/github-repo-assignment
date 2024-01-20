const usernameInput = document.getElementById('username');
const fetchButton = document.getElementById('fetch-button');
const repositoriesContainer = document.getElementById('repositories');

fetchButton.addEventListener('click', () => {
    const username = usernameInput.value;

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repositories => {
            repositoriesContainer.innerHTML = ''; 
            repositories.forEach(repository => {
                const repoElement = document.createElement('div');
                repoElement.innerHTML = `
                    <h2><a href="${repository.html_url}" target="_blank">${repository.name}</a></h2>
                    <p>${repository.description}</p>
                `;
                repositoriesContainer.appendChild(repoElement);
            });
        })
        .catch(error => {
            console.error(error);
            alert('Error fetching repositories. Please check the username and try again.');
        });
});
