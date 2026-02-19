# HackSRM 7.0 - Official Website & Content Platform

![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![License](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)

The official web platform and content management backend for **HackSRM 7.0**, a premier student-led hackathon hosted at SRM University, AP. This repository utilizes a modern monorepo architecture to seamlessly deliver the public-facing retro-themed web application alongside its headless CMS.

## Table of Contents
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Content Management (Sanity)](#content-management-sanity)
- [Core Team](#core-team)
- [License](#license)

## Architecture & Tech Stack

This project is structured as a monorepo using **Turborepo** to manage dependencies and scripts across our frontend and CMS applications efficiently. 

* **Frontend Application:** Next.js (App Router), React, Tailwind-style utility CSS.
* **Content Backend:** Sanity.io (Headless CMS for schedules, workshops, and dynamic announcements).
* **Package Management:** pnpm.

## Repository Structure

The workspace is divided into autonomous apps and shared internal packages:

```text
hacksrm-7/
├── apps/
│   ├── web/               # Next.js public-facing application
│   └── studio/            # Sanity Studio CMS dashboard
├── packages/
│   ├── ui/                # Shared React UI components
│   ├── eslint-config/     # Shared linting rules
│   └── typescript-config/ # Base tsconfig.json
└── package.json           # Workspace root
```

## Getting Started
> for developers, contributors, and hobbists
### Prerequisites
Ensure your local development environment meets the following requirements:

    Node.js (v18.0.0 or higher), pnpm (v8+ recommended)


### Installation
Clone the codebase and install the workspace dependencies:

```bash
git clone -b main https://github.com/HackSRM-SRMUAP/HackSRM-7.0
pnpm install
```
### Environment Variables
The web application requires specific keys to communicate with the Sanity backend. Create a .env.local file in apps/web/:

```bash
# apps/web/.env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=vrujefqh
NEXT_PUBLIC_SANITY_DATASET=production
```

> Security Note: Never commit .env files to version control. Ensure they remain listed in your .gitignore.


### Development Workflow
Turborepo allows us to run tasks across multiple workspaces simultaneously or individually.

Run the entire stack (Web + Studio) in parallel:

```Bash
pnpm turbo run dev --parallel
```
Or, Run applications individually:
```Bash
# Start only the Next.js website
pnpm --filter apps/web dev
```
```
# Start only the Sanity CMS Studio
pnpm --filter apps/studio dev
```

### Utility Commands:
Maintain code quality before committing your changes:

`pnpm turbo run lint` - Lints all workspaces.

`pnpm turbo run format` - Formats code via Prettier.

`pnpm turbo run build` - Tests the production build process locally.

### Content Management (Sanity)
The project relies on Sanity for dynamic content rendering, specifically for the event agenda.

`Schema Modifications:` To update the content structure, edit the schemas located in apps/studio/schemaTypes/. Re-run the development server to see changes in the Studio UI.

`Core Documents:` The schedule document type drives the agenda views in both mobile (Phone98.tsx) and desktop (Desktop98.tsx) UI components. It requires the following fields to be populated and published: 

    title, type, startTime, endTime, location, and description.

## Core Team
- J Dave Meshak, `Website Developer` | [Portfolio](https://iamdave.vercel.app/)
- Nithish Sriram, `Head`
- K Bhargavi, `Co-Head`

## License
This repository is licensed under the **GNU GPLv3** License.
You are free to use, copy, modify, merge, publish, and distribute the software with appropriate attribution and without warranty. 

See the LICENSE file in the root directory for full details.