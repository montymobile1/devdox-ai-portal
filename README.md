# DevDox.ai - 24/7 Dev Power in Your Pocket

![DevDox.ai](https://github.com/montymobile1/devdox-ai-portal/blob/f92d27d2f4f23229f8f83f2db3dd378c26a8cd03/public/logo.png)

DevDox.ai is an AI-powered development assistant that helps developers automate code reviews, documentation, and feature development. It seamlessly integrates with your existing workflow and provides intelligent suggestions based on your codebase.

## Features

- 🤖 **Smart Code Reviews** - Automated code analysis and suggestions based on best practices
- 💻 **Feature Development** - AI-assisted feature implementation with context-aware code generation
- 🔄 **Code Refactoring** - Intelligent code restructuring while maintaining functionality
- 📝 **Documentation Generation** - Automatic creation and maintenance of documentation
- 🧠 **AI Code Analysis** - Deep understanding of your codebase for contextual suggestions
- ✅ **Quality Assurance** - Continuous code quality monitoring and improvement recommendations

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Clerk for authentication
- Lucide React for icons

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/montymobile1/devdox-ai-portal.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Project Structure

```
devdox-ai/
├── public/
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthButtons.tsx       # Authentication-related components
│   │   ├── background/
│   │   │   ├── NeuralNetwork.tsx     # Neural network animation
│   │   │   └── FloatingIcons.tsx     # Floating icons animation
│   │   ├── layout/
│   │   │   ├── Navigation.tsx        # Main navigation component
│   │   │   └── Footer.tsx           # Footer component
│   │   └── sections/
│   │       ├── Hero.tsx             # Hero section
│   │       ├── Features.tsx         # Features section
│   │       ├── HowItWorks.tsx       # How it works section
│   │       └── CallToAction.tsx     # Call to action section
│   ├── hooks/
│   │   └── useIntersectionObserver.ts # Custom hook for section visibility
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles and animations
├── .env                             # Environment variables
├── package.json                     # Project dependencies
└── README.md                        # Project documentation
```

## Component Architecture

The application follows a modular component architecture:

- **Background Components**: Handle visual effects and animations
- **Auth Components**: Manage authentication flows and user state
- **Layout Components**: Define the overall structure and navigation
- **Section Components**: Implement individual page sections
- **Hooks**: Custom React hooks for shared functionality

## Authentication

Authentication is handled through Clerk, providing:
- Email/password authentication
- User session management
- Protected routes and components
- Dashboard access control

## Styling

The project uses Tailwind CSS with:
- Responsive design patterns
- Custom animations
- Consistent color scheme
- Dark mode optimization

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

For support, please email support@devdox.ai or open an issue in the repository.