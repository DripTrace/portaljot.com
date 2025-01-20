# 🏥 Loma Linda Psychiatric Medical Group (LLPMG) Web Application

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Build Process](#build-process)
- [Deployment](#deployment)
- [Known Issues and Future Improvements](#known-issues-and-future-improvements)

## 🌟 Project Overview

The Loma Linda Psychiatric Medical Group (LLPMG) web application is a comprehensive platform designed to provide mental health services information, patient resources, and administrative tools. This Next.js-based application combines modern web technologies with a user-friendly interface to serve both patients and healthcare providers.

### 🎯 Goals

- Provide easy access to mental health resources
- Streamline patient intake processes
- Offer a robust content management system for staff
- Ensure responsive design for all devices
- Maintain high performance and accessibility standards

## 🛠 Tech Stack

- **Frontend Framework**: Next.js 14.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux (with @reduxjs/toolkit)
- **Form Handling**: SurveyJS
- **Build Tool**: Custom TypeScript build script
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
llpmg-form-maker/
├── src/
│   ├── components/
│   │   └── LLPMG/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── Layout.tsx
│   │       └── ...
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── llpmg/
│   │   │   ├── landing.tsx
│   │   │   ├── locations.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── store/
│   │   ├── store.ts
│   │   └── slices/
│   │       └── uiSlice.ts
│   └── hooks/
│       └── useRedux.ts
├── public/
│   └── ...
├── build.ts
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🔑 Key Features

### 1. 🏠 Landing Page

- Hero section with welcoming message
- Quick links to key sections
- Testimonials carousel

### 2. 📍 Locations

- Interactive map with multiple LLPMG locations
- Contact information for each location

### 3. 👨‍⚕️ Providers & Staff

- Profiles of healthcare providers
- Staff directory

### 4. 🧠 Services Offered

- Comprehensive list of mental health services
- Detailed descriptions of treatment approaches

### 5. 📝 Patient Intake Form

- Interactive SurveyJS-powered form
- Dynamic question flow based on patient responses

### 6. 🌓 Dark Mode Toggle

- User-preference based theme switching

### 7. 📱 Responsive Design

- Mobile-first approach ensuring compatibility across devices

## 🔧 Build Process

The project uses a custom TypeScript build script (`build.ts`) to handle pre-build modifications and the build process. Key features of the build script include:

- 🔍 Searching and modifying SurveyJS files in `node_modules`
- 🛠 Running `pnpm install` to ensure all dependencies are up-to-date
- 🏗 Executing the Next.js build and export process
- 🧹 Cleaning up temporary files post-build

To run the build process:

```bash
ts-node build.ts
```

## 🚀 Deployment

The application is configured for deployment to GitHub Pages. The deployment process is automated using GitHub Actions, triggered on pushes to the main branch.

Key steps in the deployment workflow:

1. Checkout repository
2. Set up Node.js and pnpm
3. Run the custom build script
4. Deploy the generated static files to GitHub Pages

## 🐛 Known Issues and Future Improvements

### Issues

- ⚠️ SurveyJS file modifications may not always capture all necessary changes
- ⚠️ Dark mode doesn't persist across page reloads

### Future Improvements

- 🔮 Implement server-side rendering for improved SEO
- 🔐 Add user authentication for patient portals
- 📊 Integrate analytics for tracking user engagement
- 🌐 Implement internationalization for multiple languages
- 🧪 Increase test coverage with unit and integration tests

---

This README provides a comprehensive overview of the LLPMG web application project. As the project evolves, please update this document to reflect the current state and future directions of the application.
