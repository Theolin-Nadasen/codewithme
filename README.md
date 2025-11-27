# CodeWithMe

A modern, interactive coding platform where users can learn programming, practice with challenges, share projects, and stay updated with tech news.

## Features

### 🎯 Coding Challenges
- **Interactive Challenges**: Solve coding problems with hidden test cases
- **Multiple Difficulty Levels**: Easy, Medium, and Hard challenges
- **Multi-Language Support**: Python, JavaScript, TypeScript, C, and more
- **Rank System**: Earn rank points by completing challenges (+1 Easy, +2 Medium, +3 Hard)
- **Pro Challenges**: Exclusive challenges for Pro members
- **Celebration Effects**: Confetti and congratulations modal on completion
- **One-Time Rewards**: Each challenge can only be completed once for points

### 💻 Code Playground
- **Live Code Editor**: Monaco editor with syntax highlighting
- **Multi-Language Support**: Run code in various programming languages
- **Real-Time Execution**: Execute code using Piston API
- **Sample Code Library**: Pre-built examples to learn from
- **Standard Input Support**: Test code with custom inputs

### 📚 Learning Resources
- **YouTube Playlists**: Curated learning content organized by category
- **Interactive Tutorials**: Step-by-step guides for new users
- **Code Examples**: Browse and run sample code

### 🚀 Projects Showcase
- **Share Your Work**: Display your GitHub projects
- **Community Gallery**: Browse projects from other developers
- **Role-Based Limits**: Different project limits for free and pro users

### 📰 Tech News
- **Latest Updates**: Stay informed with tech news and announcements
- **Article Management**: Admin-created content with markdown support

### 👤 User Profiles
- **Authentication**: Google OAuth integration
- **Rank Tracking**: View your coding rank and progress
- **Pro Status**: Premium features for pro members
- **Project Management**: Add and manage your GitHub projects

### 🤖 AI Assistant
- **Chat Interface**: Get coding help from AI
- **Daily Limits**: Free users get limited daily AI uses
- **Pro Benefits**: Unlimited AI assistance for pro members

## Tech Stack

- **Next.js 15.4.1** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **PostgreSQL** - Database
- **Drizzle ORM** - Type-safe database queries
- **NextAuth.js** - Authentication
- **Monaco Editor** - Code editor
- **Piston API** - Code execution
- **LangChain & OpenAI** - AI integration

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   ├── challenges/        # Challenges pages
│   ├── learn/             # Code playground
│   ├── news/              # News pages
│   ├── projects/          # Projects showcase
│   └── users/             # User profiles
├── components/            # React components
├── lib/                   # Utilities and configs
└── scripts/              # Utility scripts
```

---

Built with ❤️ using Next.js and TypeScript