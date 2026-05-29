# 🚀 DevFlow | Full-Stack Project Management SaaS

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Auth.js](https://img.shields.io/badge/Auth.js-v5-764ABC?style=for-the-badge&logo=auth0)](https://authjs.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)


DevFlow is a modern collaborative project management SaaS inspired by tools like Linear and Jira. Built with Next.js 15, React 19, Prisma, and PostgreSQL, it features workspace-based collaboration, Kanban task management, notifications, comments, attachments, activity tracking, and a scalable multi-tenant architecture.


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

### 🤝 Collaboration & Workspaces

- **Workspace Architecture:** Multi-tenant SaaS structure with isolated workspaces.
- **Workspace Members:** Invite and collaborate with team members.
- **Scoped Collaboration:** Projects, tasks, and notifications are workspace-aware.
- **Activity Feed:** Real-time-style activity tracking for tasks and projects.
- **Comments System:** Collaborative task discussions.
- **Notifications:** In-app notifications for assignments, comments, and updates.
- **Attachments:** Upload and manage task files with UploadThing integration.
- **Mentions System (In Progress):** Planned @mentions with member notifications.

### 🌓 Theme & Layout

- **Dark Mode:** Native dark/light mode toggle with system preference detection.
- **Mobile Optimized:** Fully responsive sidebar and navigation drawer.

---

## 🛠 Tech Stack

| Layer              | Technologies                                           |
| :----------------- | :----------------------------------------------------- |
| **Frontend**       | Next.js 15, React 19, Tailwind CSS, shadcn/ui     |
| **Backend**        | Next.js Server Actions, Zod (Validation)          |
| **Database**       | PostgreSQL, Prisma ORM, UploadThing               |
| **Authentication** | Auth.js (v5), GitHub OAuth                        |
| **Libraries**      | dnd-kit, Framer Motion, Lucide Icons, next-themes |

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
*   **User:** Authentication and profile management.
*   **Workspace:** Collaborative organization container.
*   **WorkspaceMember:** Workspace membership and roles.
*   **Project:** Workspace-level project management.
*   **Task:** Kanban workflow tasks with statuses and priorities.
*   **Comment:** Task discussions and collaboration.
*   **Activity:** Project and task activity tracking.
*   **Attachment:** File uploads and task resources.
*   **Notification:** In-app notification system.
  
---

## 🏢 Multi-Tenant SaaS Architecture

DevFlow is built using a workspace-based architecture similar to Linear and Jira.

### Architecture Overview

Workspace
→ Members
→ Projects
→ Tasks
→ Comments
→ Activity
→ Notifications

This enables:

* Workspace-scoped collaboration
* Role-based scalability
* Team isolation
* Real-time collaboration readiness
* Scalable SaaS foundations

---

## 🏗 Architecture Highlights

*   **App Router Architecture:** Leverages route groups, server components, and dynamic routes.
*   **Collaborative SaaS Architecture:** Workspace-based multi-tenant system with scoped projects, members, notifications, and activity tracking.
*   **Modern UX Patterns:** Focus on perceived performance through skeletons and optimistic updates.

---

## 🔮 Future Improvements

- [ ] Realtime collaboration with Socket.io / Pusher
- [ ] Rich text editor for comments
- [ ] Workspace roles & permissions
- [ ] Global search & command palette
- [ ] Calendar & timeline views
- [ ] Advanced analytics dashboard
- [ ] Mention system with autocomplete
- [ ] Realtime notifications

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

Built by **Ketan ❤**

*   **GitHub**: [github.com/ketangodhani](https://github.com//ketangodhani)
*   **LinkedIn**: [linkedin.com/in/ketan-godhani](https://linkedin.com/in/ketan-godhani)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE)# DevFlow
