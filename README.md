# Welcome to React Starter Kit!

The definitive React starter kit—the most complete and effective foundation for full-stack applications. Jumpstart production-ready development with built-in authentication, a modern tech stack (React Router, TanStack Query, Redux Toolkit), and a polished UI (Tailwind CSS & Shadcn UI). Skip the boilerplate and build faster.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Technical Stack

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
- [TanStack React Query](https://tanstack.com/query/latest) - Powerful data synchronization for React
- [Platzi Fake API](https://fakeapi.platzi.com/en) - A fake API for testing and development
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives for building high-quality design systems and web apps
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

## Key Features

- **Server-Side Rendering**: Fast initial page loads and improved SEO with React Router's SSR capabilities
- **Hot Module Replacement**: Instant updates during development for a smooth coding experience
- **State Management**: Robust global state handling with Redux Toolkit
- **Data Synchronization**: Efficient data fetching, caching, and mutations using TanStack React Query
- **Authentication Ready**: Built-in authentication utilities and API endpoints for user login and management
- **Data Loading and Mutations**: Using TanStack Query and mutations for efficient data operations
- **Accessible UI Components**: Pre-built, customizable components from Shadcn UI and Radix UI primitives
- **Responsive Styling**: Utility-first CSS with Tailwind CSS for rapid, mobile-first design
- **Fast Development Tooling**: Lightning-quick builds and development server with Vite
- **API Integration Ready**: Easy integration with APIs like Platzi Fake API for testing and prototyping

## Architecture

This application follows a modern full-stack architecture using React Router v7 for server-side rendering (SSR), client-side routing, and data loading. The app is built with:

- **Frontend**: React components with functional programming patterns, styled with Tailwind CSS and Shadcn UI components.
- **Routing**: Declarative routing handled by React Router.
- **State Management**: Global state with Redux Toolkit, local state with React hooks.
- **Data Fetching**: TanStack React Query for efficient data synchronization and caching.
- **Build Tool**: Vite for fast development and production builds.

## Environment Variables

This project uses environment variables for configuration. Create a `.env.local` file in the root directory (this file is gitignored by default).

Common variables:

- `VITE_API_BASE_URL`: Base URL for the API (e.g., `https://fakeapi.platzi.com/`)
- `VITE_APP_TITLE`: Title of the application (optional, defaults to "Starter JS")

Note: Variables prefixed with `VITE_` are exposed to the client-side code.

## Project Structure

```
.
├── app/
│   ├── api/          # API utilities and configurations
│   ├── components/   # Reusable UI components (UI/, etc.)
│   ├── config/       # Configuration files
│   ├── layouts/      # Layout components
│   ├── routes.js     # Route definitions
│   ├── root.jsx      # Root component
│   └── app.css       # Global styles
├── public/           # Static assets
│   └── favicon.ico
├── package.json      # Dependencies and scripts
├── vite.config.js    # Vite configuration
└── README.md         # This file
```

## Key Dependencies

- **React Ecosystem**: React, React DOM, React Router (v7 for full-stack SSR and routing)
- **State Management**: Redux Toolkit, React-Redux (for global state management)
- **Data Fetching**: TanStack React Query, TanStack React Query Devtools (for efficient data synchronization)
- **UI Libraries**: Radix UI, Lucide React (for accessible primitives and icons), Shadcn UI (via component implementations)
- **Styling**: Tailwind CSS, Tailwind Animate, Tailwind Merge, Clsx (for utility-first styling and conditional classes)
- **Build Tools**: Vite, @tailwindcss/vite (for fast development and builds)
- **Other**: Isbot (for bot detection in SSR)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:webspeaks/react-starter-kit.git
   cd react-starter-kit
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## Author Contact Info

Arvind Bhardwaj <arvind@webspeaks.in>

## License

This project is licensed under the MIT License.

---

Built with ❤️ using React Router.
