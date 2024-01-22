const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/repositories', async (req, res) => {
    const { username, page = 1, perPage = 10 } = req.query;

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
        const repositories = await response.json();

        res.json({
            repositories,
            currentPage: page,
            totalPages: Math.ceil(repositories.length / perPage)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch repositories' });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
