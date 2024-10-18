# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Personal Note-taking DApp 

A brief description of your project.

## Table of Contents
- [React + Vite](#react--vite)
- [Personal Note-taking DApp](#personal-note-taking-dapp)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Set up your notes encryption/decryption key:](#set-up-your-notes-encryptiondecryption-key)
  - [Project Structure](#project-structure)
  - [In the future](#in-the-future)

## Installation

Provide step-by-step instructions to install and set up the project.

```bash
# Example commands
npm install
npm start
```

## Usage

### Set up your notes encryption/decryption key: 
```bash
node src/utils/create_symmetric_key.js
```
Write down this key. It will be used to view and secure your notes. \
Once lost, the existed notes won't be able to view again.

## Project Structure

wefewf

## In the future

1. store keys using Metamask Snaps
2. show transaction page, block explorer
3. tags, labels for notes
