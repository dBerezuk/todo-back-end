# Todo App: Getting Started Guide

---

## Introduction

This guide will help you set up and run your Todo App efficiently. Follow the steps below to get started.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/)) installed on your machine.

## Setup Instructions

### Step 1: Install Dependencies

To install the necessary dependencies, run one of the following commands in your terminal:

Using npm:

```sh
npm i
```

Using Yarn:

```sh
yarn
```

### Step 2: env file setup

Create an .env file, and in this form, add the data there, where it is empty, enter your data:

APP_PORT=3002
APP_CLIENT_URL=
APP_DEV=false
APP_KEY=
APP_DB_USERNAME=
APP_DB_PASSWORD=
APP_DB_NAME=

Using mongoDB database.

### Step 3: Start the Development Server

To start the development server, run one of the following commands:

Using npm:

```sh
npm run dev
```

Using Yarn:

```sh
yarn dev
```

### Step 4: Open the Application

Once the server is running, open your browser and navigate to: [http://localhost:3002](http://localhost:3002)
