# DevDox AI Portal

## Overview

The DevDox AI Portal is the user-facing frontend component of the DevDox AI platform. It provides a sleek, intuitive web interface for users to manage their accounts, connect Git repositories, configure preferences, and monitor usage. This portal serves as the primary entry point for developers to interact with the DevDox AI ecosystem.

## Purpose and Functionality

The DevDox AI Portal is designed to:

- Provide a welcoming landing page for new users
- Enable user account creation and authentication (via Git OAuth)
- Allow users to manage their Git tokens and repository connections
- Configure code style preferences and project settings
- Monitor token usage and activity statistics
- Access administrative functions (for admin users)
- Serve as the central hub for all user interactions with the DevDox AI platform

## Technology Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: 
  - Tailwind CSS
  - Headless UI / Radix UI
- **State Management**: 
  - React Query (for API data)
  - Context API / Zustand (for application state)
- **Testing**: 
  - Vitest
  - React Testing Library
- **Additional Libraries**:
  - Axios (API requests)
  - React Router (routing)
  - react-hook-form (form handling)
  - zod (validation)
  - recharts (visualizations)

## Installation and Setup

### Prerequisites

- Node.js 18+ 
- npm 8+ or yarn 1.22+
- Git

### Development Setup

```bash
# Clone the repository
git clone https://github.com/montymobile1/devdox-ai-portal.git
cd devdox-ai-portal

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start the development server
npm run dev
# or
yarn dev
```

The development server will start at `http://localhost:5173` by default.

### Build for Production

```bash
# Create a production build
npm run build
# or
yarn build

# Preview the production build
npm run preview
# or
yarn preview
```

## Component Architecture

The portal uses a modular component architecture:

```
devdox-ai-portal/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Generic components (Button, Input, etc.)
│   │   ├── dashboard/   # Dashboard-specific components
│   │   └── layout/      # Layout components (Header, Sidebar, etc.)
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── api/             # API integration
│   ├── context/         # React Context providers
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── styles/          # Global styles
│   ├── App.tsx          # Application entry point
│   └── main.tsx         # Root rendering
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Key Features and Pages

1. **Landing Page**: 
   - Product information and marketing content
   - Call-to-action for sign-up/login

2. **Authentication**:
   - OAuth integration with GitHub/GitLab
   - Account creation and management

3. **Dashboard**:
   - Overview of connected repositories
   - Usage statistics and activity charts
   - Quick actions for common operations

4. **Repository Management**:
   - Connect/disconnect Git repositories
   - Configure per-repository settings
   - View repository analytics

5. **Preference Settings**:
   - Code style preferences
   - Documentation format configuration
   - Automation rules

6. **Administration** (admin users):
   - User management
   - System-wide settings
   - Usage reporting

## Interaction with Portal API

The portal communicates with the [DevDox AI Portal API](https://github.com/montymobile1/devdox-ai-portal-api) for all data operations. Key aspects of this interaction include:

- **Authentication**: OAuth token handling and session management
- **Repository Data**: Fetching and managing repository connections
- **User Preferences**: Storing and retrieving user configuration
- **Analytics**: Retrieving usage statistics and activity data
- **Admin Functions**: User and system management (for admin users)

API requests are centralized in the `src/api` directory, with hooks for data fetching in `src/hooks/api`.

## Configuration

The portal can be configured through environment variables:

- `VITE_API_URL`: URL of the DevDox AI Portal API
- `VITE_GITHUB_CLIENT_ID`: GitHub OAuth client ID
- `VITE_GITLAB_CLIENT_ID`: GitLab OAuth client ID
- `VITE_AUTH_CALLBACK_URL`: OAuth callback URL
- `VITE_ENABLE_ANALYTICS`: Enable/disable analytics (boolean)

Additional configuration options can be found in `src/config/index.ts`.

## Development Guidelines

### Code Style

This project follows a consistent code style enforced by ESLint and Prettier:

```bash
# Run linting
npm run lint
# or
yarn lint

# Format code
npm run format
# or
yarn format
```

## Deploying to Render

This application is configured to deploy on Render as a Web Service using Express.js.

### Prerequisites

- Render account
- GitHub repository with your code
- Vite build configured with `dist` output directory

### Deployment Steps

1. **Connect Your Repository**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Web Service Settings**
   - **Name**: Your app name
   - **Environment**: `Node`
   - **Region**: Choose your preferred region
   - **Branch**: `main` (or your default branch)

3. **Build & Deploy Configuration**
   ```
   Build Command: rm -rf node_modules yarn.lock && yarn install
   Start Command: yarn build && yarn start
   ```

4. **Environment Variables** (if needed)
   - Add any required environment variables
   - Example: `NODE_ENV=production`

### Server Configuration

The app uses an Express.js server (`server.cjs`) that:
- Serves static files from the `dist` directory
- Handles client-side routing for React Router

### Important Files

- `server.cjs` - Express server for production
- `package.json` - Contains build and start scripts
- `dist/` - Built application files (generated during build)



### Troubleshooting

**Common Issues:**

- **Build fails**: Ensure all dependencies are in `package.json`
- **404 on routes**: Server handles SPA routing automatically
- **Environment variables**: Add them in Render dashboard under "Environment"


### Component Development

- Use functional components with hooks
- Follow the container/presentational component pattern
- Keep components small and focused on a single responsibility
- Use TypeScript for all components and utilities

### Testing

```bash
# Run tests
npm run test
# or
yarn test

# Run tests with coverage
npm run test:coverage
# or
yarn test:coverage
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

[MIT License](LICENSE)

---

*Related Jira Issue: [DAP-5](https://montyholding.atlassian.net/browse/DAP-5)*
