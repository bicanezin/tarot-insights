# Firebase Studio Next.js Project

## Overview
This project is a full-stack web application built using [Next.js](https://nextjs.org/) and [Firebase Studio](https://firebase.google.com/products/studio), a cloud-based development environment for rapid prototyping and deployment of AI-infused applications. The project leverages [next-intl](https://next-intl-docs.vercel.app/) for internationalization (i18n), supporting multiple languages (e.g., English and Portuguese) with locale-based routing.

The application is hosted on Firebase Studio at:  
[https://9000-firebase-studio-1748394713472.cluster-qhrn7lb3szcfcud6uanedbkjnm.cloudworkstations.dev/](https://9000-firebase-studio-1748394713472.cluster-qhrn7lb3szcfcud6uanedbkjnm.cloudworkstations.dev/)

## Features
- **Internationalization (i18n)**: Supports multiple languages (e.g., `en`, `pt`) with locale-prefixed URLs (e.g., `/en`, `/pt`).
- **Next.js App Router**: Uses the Next.js App Router for server-side rendering and dynamic routing.
- **Firebase Integration**: Built and deployed via Firebase Studio, with potential integration of Firebase services (e.g., Firestore, Storage, Authentication).
- **AI-Powered Development**: Utilizes Firebase Studio’s AI tools (powered by Gemini) for code generation and debugging assistance.

## Project Structure
```
src/
├── app/
│   └── [locale]/
│       └── page.tsx       # Homepage for each locale
├── config/
│   └── i18n-config.ts     # Centralized i18n configuration
├── messages/
│   ├── en.json            # English translations
│   └── pt.json            # Portuguese translations
├── middleware.ts          # Next.js middleware for i18n routing
├── navigation.ts          # Navigation utilities for next-intl
├── i18n.ts               # Server-side locale validation and translation loading
└── public/                # Static assets
```

## Installation
1. **Clone the Repository**:
   - Since this is a Firebase Studio project, access it via the Firebase Studio workspace or clone the exported code if available.
   - Alternatively, create a new Firebase Studio project and replicate the structure.

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Key dependencies include:
   - `next`
   - `next-intl`
   - `firebase` (if Firebase services are used)

3. **Set Up Environment**:
   - Ensure Firebase Studio’s environment is configured (e.g., via `dev.nix` if customized).
   - If using Firebase services, initialize the Firebase SDK by adding your Firebase config to the project.

## Running the Project
1. **Development Mode**:
   ```bash
   npm run dev
   ```
   This starts the Next.js development server, typically accessible at `http://localhost:3000`.

2. **Accessing the App**:
   - Visit `/` to be redirected to the default locale (e.g., `/en`).
   - Supported locales: `en` (English), `pt` (Portuguese).

3. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

## Internationalization Setup
The project uses `next-intl` for i18n with the following configuration (defined in `src/config/i18n-config.ts`):

```typescript
export const i18nConfig = {
  locales: ['en', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
  },
};
```

- **Middleware**: The `src/middleware.ts` file handles locale routing, redirecting requests like `/` to `/en/` (default locale).
- **Translations**: Stored in `src/messages/[locale].json` (e.g., `en.json`, `pt.json`).
- **Navigation**: Uses `createSharedPathnamesNavigation` from `next-intl` for locale-aware links and redirects.

## Troubleshooting
### 404 Error on Root Path (`/`)
If you encounter a 404 error when visiting the root path (`/`), it’s likely due to the middleware not redirecting to a localized path. To resolve:
1. **Verify Middleware**:
   - Ensure `src/middleware.ts` is configured with `localeDetection: false` and a matcher like `/((?!api|_next|_vercel|.*\\..*).*)`.
   - Example:
     ```typescript
     import { createMiddleware } from 'next-intl/middleware';
     import { i18nConfig } from './config/i18n-config';

     export default createMiddleware({
       locales: i18nConfig.locales,
       defaultLocale: i18nConfig.defaultLocale,
       localePrefix: i18nConfig.localePrefix,
       pathnames: i18nConfig.pathnames,
       localeDetection: false,
     });

     export const config = {
       matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
     };
     ```
2. **Check File Structure**:
   - Ensure `src/app/[locale]/page.tsx` exists to handle localized routes.
3. **Firebase Studio Issues**:
   - If the workspace isn’t loading, try:
     - Running `Hard Restart` or `Rebuild Environment` from the command palette (Cmd+Shift+P or Ctrl+Shift+P).[](https://firebase.google.com/docs/studio/troubleshooting)
     - Checking logs for Next.js dev server errors.[](https://www.reddit.com/r/Firebase/comments/1kpnx7w/my_firebase_studio_app_not_loading/)
     - Ensuring third-party cookies are enabled, as Firebase Studio uses iframes for previews.[](https://firebase.google.com/docs/studio/troubleshooting)
4. **Clear Cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

### Other Common Issues
- **Workspace Not Responding**: Reset the VM in Firebase Studio or check the Firebase Status Dashboard for outages.[](https://status.firebase.google.com/)
- **Large Project Size**: If the app is slow or fails to load, consider optimizing the project size or creating a new workspace and importing the code.[](https://www.reddit.com/r/Firebase/comments/1kpnx7w/my_firebase_studio_app_not_loading/)
- **Firebase Services**: If using Firestore or Storage, ensure the Firebase SDK is initialized correctly and check the Firebase console for configuration issues.[](https://firebase.google.com/docs/firestore/quickstart)

## Deployment
1. **Firebase Hosting**:
   - Deploy the app using the Firebase CLI:
     ```bash
     firebase deploy
     ```
   - Ensure Firebase Hosting is enabled in the Firebase console.[](https://cloud.google.com/build/docs/deploying-builds/deploy-firebase)
2. **Cloud Build**:
   - For automated deployments, configure Cloud Build with Firebase.[](https://cloud.google.com/build/docs/deploying-builds/deploy-firebase)

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository (if exported from Firebase Studio).
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Firebase Studio Documentation](https://firebase.google.com/products/studio)[](https://firebase.google.com/docs/studio)
- [Firebase Studio Community](https://community.firebasestudio.dev/)[](https://community.firebasestudio.dev/)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)[](https://firebase.google.com/docs/cli)

## License
This project is licensed under the MIT License.