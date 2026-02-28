# AI1 Studio - Premium AI Creativity Suite

This is a high-performance AI SaaS prototype built with Next.js 15, Genkit, and Shadcn UI. It features a separate Admin Command Center and a creative User Studio.

## 🚀 Key Features

### User Experience
- **AI Chat Studio:** ChatGPT-like interface for conversational AI (Gemini 2.5 Flash).
- **Image Generator:** Multi-style text-to-image studio with fallback logic.
- **Credit System:** Built-in usage tracking and pricing tiers.
- **History & Templates:** Revisit past generations and use pre-configured prompts.

### Admin Command Center (`/admin/dashboard`)
- **Analytics:** Real-time revenue, user growth, and AI usage charts connected to Firestore.
- **User Management:** Control accounts, block users, and adjust credits.
- **System Settings:** Master switches for AI models and safety filters.
- **Security Audit:** Live event logs and IP monitoring.

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **AI Engine:** Google Genkit
- **Database/Auth:** Firebase (Firestore & Firebase Auth)
- **Styling:** Tailwind CSS + Shadcn UI
- **Icons:** Lucide React
- **Charts:** Recharts

## 💻 Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file and add your Google AI and Firebase API Keys:
   ```env
   GOOGLE_GENAI_API_KEY=your_google_ai_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) in your browser.

## 📤 How to Upload to GitHub

To upload this source code to your own GitHub repository, run these commands in your terminal:

1. **Initialize Git:**
   ```bash
   git init
   ```

2. **Add Files:**
   ```bash
   git add .
   ```

3. **Commit Changes:**
   ```bash
   git commit -m "Initial commit: AI SaaS with Admin Panel and Firebase"
   ```

4. **Connect to GitHub:**
   Go to GitHub, create a new repository, then copy the URL and run:
   ```bash
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```

## 📁 Key Routes
- **Landing Page:** `/`
- **Login:** `/auth/login`
- **Signup:** `/auth/signup`
- **User Dashboard:** `/dashboard`
- **Admin Panel:** `/admin/dashboard` (Private)