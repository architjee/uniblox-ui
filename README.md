# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Installing

`npm ci`

## All API methods start with resolve and end with api

### To create a new job

Call post at /file-upload to get presinged_urls, use presigned urls to upload files, call post at /job to create job and get job object

### To get list of jobs

Call get at /jobs to get list of jobs

### To get job status

Call post at /job with cmd status and job_id to get job status.
