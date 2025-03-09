import axios from "axios"
import dotenv from "dotenv"
import { GITHUB_API, GITHUB_USERNAME } from "../config/constant.js";
import { headers } from "../config/constant.js";
dotenv.config({})

const fetchAllRepositories = async () => {
    let page = 1;
    let repositories = [];
    let hasMore = true;

    while (hasMore) {
        const { data } = await axios.get(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos`, {
            headers,
            params: { per_page: 100, page },
        });

        repositories = [...repositories, ...data];

        if (data.length < 100) {
            hasMore = false;
        } else {
            page++;
        }
    }
    return repositories;
};

export const fetchProfileDetails = async (req, res) => {
    try {
        const { data } = await axios.get(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { headers });
        const { login, followers, following, public_repos, html_url } = data;

        const repositoriesData = await fetchAllRepositories();
        const repositories = repositoriesData.map(repo => ({
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
        }));

        res.json({ login, followers, following, public_repos, profile_url: html_url, repositories });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
}

export const fetchRepoDetails = async (req, res) => {
    const { repo } = req.params;
    try {
        const { data } = await axios.get(`${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo}`, { headers });
        res.json({
            name: data.name,
            description: data.description,
            url: data.html_url,
            stars: data.stargazers_count,
            forks: data.forks_count,
            open_issues: data.open_issues_count,
        });
    } catch (error) {
        res.status(404).json({ error: "Repository not found" });
    }
}

export const postgitIssue = async (req, res) => {
    const { repo } = req.params;
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: "Title and body are required" });
    }

    try {
        const { data } = await axios.post(`${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo}/issues`, { title, body }, { headers });
        console.log(data);
        res.json({ issue_url: data.html_url });
    } catch (error) {
        res.status(500).json({ error: "Failed to create issue" });
    }
}

export const welcomeMessage = async (req, res) => {
    try {
        return res.status(200).json({
            message: "This is for only Testing you can Test this api to fetch github profile Data, repo Data, and create and issue as well",
            status: "ok (200)"
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to load" });
    }
}