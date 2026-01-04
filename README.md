# HackSRM 7.0

## About HackSRM 7.0
HackSRM 7.0 is a student-led hackathon hosted at SRM University, AP, bringing together developers, designers, and innovators to build real-world solutions across multiple tracks. The repo powers the public website (Next.js) and the content backend (Sanity) for schedule, workshops, and announcements.

## Table of Contents
- [Repo Structure](#repo-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Develop](#develop)
- [Environment Variables](#environment-variables)
- [Sanity Content](#sanity-content)
- [Useful Commands](#useful-commands)
- [Notes](#notes)
- [Organizers](#organizers)
- [Leadership](#leadership)
- [License](#license)
- [Authors](#authors)

## Repo Structure
> uses turborepo framework for monorepo management
```
apps/
	web/          # Next.js site
	studio/       # Sanity Studio
packages/
	ui/           # shared UI components
	eslint-config/ typescript-config/
```

## Tech Stack
- Next.js (App Router), React
- pnpm, Turborepo
- Sanity.io (content, schedule)
- Tailwind-like utility classes + custom CSS

## Prerequisites
- Node 18+ and pnpm
- Windows bash (`bash.exe`) or any POSIX shell

## Install
```bash
pnpm install
```

## Develop
Run the web app:
```bash
pnpm --filter apps/web dev
```
Run the Sanity Studio:
```bash
pnpm --filter apps/studio dev
```
Or run both via turbo:
```bash
pnpm turbo run dev --parallel
```

## Environment Variables
Web (`apps/web/lib/sanity.ts`) reads:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` (defaults to `vrujefqh` from Studio config)
- `NEXT_PUBLIC_SANITY_DATASET` (defaults to `production`)

Set them in `apps/web/.env.local` if you need overrides:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=vrujefqh
NEXT_PUBLIC_SANITY_DATASET=production
```

## Sanity Content
Studio defines `schedule` documents:
- Fields: `title`, `type` (major/workshop/fun/break), `startTime`, `endTime`, `location`, `description`

Web uses these events in mobile (`Phone98.tsx`) and desktop (`Desktop98.tsx`) views. Ensure the dataset has published `schedule` docs to render the agenda.

## Useful Commands
- Lint: `pnpm turbo run lint`
- Build: `pnpm turbo run build`
- Format: `pnpm turbo run format` (if configured)

## Notes
- Avoid committing secrets in `.npmrc` or `.env*` files.
- If installs work without a custom `.npmrc`, you can omit it.
- For Studio schema changes: edit `apps/studio/schemaTypes/*` and re-run `dev`.

## Organizer(s)
**Organized by**: Student Council, SRM University, Andhra Pradesh (SRM AP)

## Leadership
- **Head:** Nithish Sriram | [LinkedIn](https://www.linkedin.com/in/nithish-sriram/)
- **Co-Head:** K Bhargavi | [LinkedIn](https://www.linkedin.com/in/jayabhargavi-k-b06418346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app)

## Author
- Website Lead: Dave | [Portfolio](https://iamdave.vercel.app/)

## License
This project is licensed under the GNU GPLv3 License. You are free to use, copy, modify, merge, publish, and distribute the software with appropriate attribution and without warranty.

Please check [License]() file for more details.

