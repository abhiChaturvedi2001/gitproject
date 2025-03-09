# GitHub Activity API

This project provides an API to fetch GitHub profile details, repository information, and create issues in a repository. It is designed to be deployed on Vercel and can be integrated into your portfolio website.

## Features
- Fetch GitHub profile details (followers, following, repositories, etc.).
- Get information about a specific repository.
- Create an issue in a repository via API.

## Deployment
This API is deployed on **Vercel**.

## API Endpoints

### **1. Get GitHub Profile Information**
**Endpoint:** `GET /profile`

**Description:** Fetches details about the authenticated user's GitHub account.

### **1. Get GitHub Repository only Information**
**Endpoint:** `GET /:repo` we need to pass repo name

**Description:** Fetches details about the authenticated user's Repository Information.

### **1. Get GitHub Profile Information**
**Endpoint:** `GET /:repo/issues` we need to give repo name for creating the issue 

**Description:** Creating the Issues in the repository.

