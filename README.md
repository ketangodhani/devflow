# 🚀 DevFlow | Full-Stack Project Management SaaS

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Auth.js](https://img.shields.io/badge/Auth.js-v5-764ABC?style=for-the-badge&logo=auth0)](https://authjs.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)


DevFlow is a modern, portfolio-grade project management platform designed for efficiency and scalability. Built with the latest **Next.js 15** and **React 19** features, it offers a seamless Kanban-style task management experience with secure authentication and robust database integration.

---

## 🌟 Overview

DevFlow is designed as a complete SaaS application that demonstrates modern frontend architecture, advanced authentication systems, complex database modeling, and high-performance UI patterns like Optimistic Updates and Server Actions.

### Key Highlights:

- **Modern SaaS UI:** Clean, responsive dashboard built with Tailwind CSS and shadcn/ui.
- **Advanced Task Management:** Drag-and-drop Kanban workflow using `dnd-kit`.
- **Full-Stack Power:** Powered by Prisma ORM and PostgreSQL for reliable data persistence.
- **Next-Gen React:** Leverages React 19 features and Next.js Server Actions.

---

## ✨ Features

### 🔐 Secure Authentication

- **Multi-Provider Support:** Credentials-based login and GitHub OAuth.
- **Session Management:** Built with Auth.js (NextAuth v5) for secure, modern sessions.
- **Middleware Protection:** Fully protected dashboard and API routes.

### 📊 Dashboard & Projects

- **Analytics Cards:** Real-time stats for projects and tasks.
- **Project Tracking:** Create and manage multiple projects with distinct task sets.
- **Dynamic Routing:** Efficient project-specific detail pages using App Router.

### 🛠 Kanban Workflow

- **Drag-and-Drop:** Intuitive task movement between columns (Todo, In Progress, Done).
- **Optimistic UI:** Instant visual feedback for task status changes before server confirmation.
- **Animated UI:** Smooth transitions and micro-interactions powered by Framer Motion.

### 🌓 Theme & Layout

- **Dark Mode:** Native dark/light mode toggle with system preference detection.
- **Mobile Optimized:** Fully responsive sidebar and navigation drawer.

---

## 🛠 Tech Stack

| Layer              | Technologies                                           |
| :----------------- | :----------------------------------------------------- |
| **Frontend**       | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| **Backend**        | Next.js Server Actions, Zod (Validation)      |
| **Database**       | PostgreSQL, Prisma ORM                        |
| **Authentication** | Auth.js (v5), GitHub OAuth                    |
| **Libraries**      | dnd-kit, Framer Motion, Lucide Icons          |

---

## 📂 Folder Structure

````text
src/
├── actions/        # Server Actions for handling database mutations
├── app/            # Next.js App Router (Auth groups, Dashboard, API)
├── components/     # UI components (Kanban board, charts, shared UI)
├── lib/            # Shared utilities (Prisma client, Auth config)
├── constants/      # Static configuration and menu items
└── prisma/         # Database schema, models, and migrations
````

---
## 📊 Database Schema

Core entities and relationships:
*   **User**: Handles authentication and profile data.
*   **Project**: Owned by a User; contains multiple tasks.
*   **Task**: Belongs to a Project; tracks status and transitions.

---

## 🏗 Architecture Highlights

*   **App Router Architecture**: Leverages route groups, server components, and dynamic routes.
*   **Scalable Component Design**: Reusable UI primitives and folder-based component organization.
*   **Modern UX Patterns**: Focus on perceived performance through skeletons and optimistic updates.

---

## 🔮 Future Improvements

*   [ ] Real-time collaboration
*   [ ] AI task summaries
*   [ ] Activity timeline
*   [ ] Notifications system
*   [ ] Team workspaces
*   [ ] File uploads

---
## ⚙️ Installation

1.  **Clone Repository**
    ```bash
    git clone https://github.com/ketangodhani/devflow.git
    cd devflow
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="your_database_url"
    AUTH_SECRET="your_auth_secret"

    GITHUB_CLIENT_ID="your_github_client_id"
    GITHUB_CLIENT_SECRET="your_github_client_secret"
    ```

4.  **Setup Database**
    ```bash
    npx prisma db push
    npx prisma generate
    ```

5.  **Start Development Server**
    ```bash
    npm run dev
    ```

---

## 👨‍💻 Author

Built by **Ketan**

*   **GitHub**: [github.com/ketangodhani](https://github.com//ketangodhani)
*   **LinkedIn**: [linkedin.com/in/ketan-godhani](https://linkedin.com/in/ketan-godhani)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE)# DevFlow

A modern full-stack project management platform built with **Next.js**, **Auth.js**, **Prisma**, **PostgreSQL**, and **Tailwind CSS**.

DevFlow is designed as a portfolio-grade SaaS application that demonstrates modern frontend architecture, authentication systems, database design, drag-and-drop interactions, server actions, and scalable application structure.

## 🚀 Overview

DevFlow includes a comprehensive suite of features designed for a seamless project management experience:

*   **Modern SaaS Dashboard UI**: Clean, intuitive, and responsive.
*   **Authentication with Auth.js**: Supporting both Credentials and GitHub OAuth.
*   **Protected Routes**: Secure middleware-based access control.
*   **Project & Task Management**: Full CRUD functionality and database persistence.
*   **Drag-and-Drop Kanban Board**: Interactive task movement with optimistic UI.
*   **Prisma + PostgreSQL**: Robust database management.
*   **Optimistic UI Updates**: Instant feedback for user actions.
*   **Dark Mode Support**: Fully integrated theme switching.

