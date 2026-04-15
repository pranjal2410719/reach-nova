# ReachNova

ReachNova is a modern civic-tech platform designed to aggregate government schemes, NGO initiatives, and CSR campaigns. It helps citizens discover relevant opportunities, register easily, and track their participation through an accessible and trustworthy UI.

## Features

- **Civic Action Dashboard**: Track completed and pending volunteer hours, application statuses, and active initiatives.
- **Campaign Discovery**: Browse and filter opportunities by category (Gov, NGO, CSR), location, and status.
- **Dynamic Campaign Details**: View in-depth information about requirements, eligibility criteria, and deadlines.
- **Trustworthy Aesthetic**: Material-inspired UI using Next.js, shadcn/ui, and a bespoke civic color palette.

## Technology Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

First, ensure you have dependencies installed:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Key application routes (`/`, `/campaigns`, `/dashboard`, `/login`, etc.) and the root layout.
- `/components/ui`: UI foundation components managed by shadcn.
- `/components/layout`: Core navigation (Navbar, Footer).
- `/components/campaigns`: Domain-specific components (CampaignCard, FilterSidebar, SearchInput).

## Future Implementations

- Supabase Authentication integration for Login/Signup flows.
- Backend API endpoints and database logic for dynamically fetching and registering campaigns.
