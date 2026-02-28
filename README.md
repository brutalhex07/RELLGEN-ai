# AI1 Studio - Premium AI Creativity Suite

This is a high-performance AI SaaS prototype built with Next.js 15, Genkit, and Shadcn UI. It features a separate Admin Command Center and a creative User Studio.

## 🚀 Key Features

### User Experience
- **AI Chat Studio:** ChatGPT-like interface for conversational AI (Gemini 2.5 Flash).
- **Image Generator:** Multi-style text-to-image studio with fallback logic.
- **Credit System:** Built-in usage tracking and pricing tiers.
- **History & Templates:** Revisit past generations and use pre-configured prompts.

### Admin Command Center (`/admin/dashboard`)
- **Analytics:** Real-time revenue, user growth, and AI usage charts.
- **User Management:** Control accounts, block users, and adjust credits.
- **System Settings:** Master switches for AI models and safety filters.
- **Security Audit:** Live event logs and IP monitoring.

## 🛠️ Tech Stack
- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Engine:** [Google Genkit](https://firebase.google.com/docs/genkit)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)

## 💻 Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file and add your Google AI API Key:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) in your browser.

## 📁 Project Structure
- `/src/ai`: Genkit flows and model configurations.
- `/src/app/admin`: Dedicated administrative environment.
- `/src/app/dashboard`: Core user creativity suite.
- `/src/app/auth`: Login and Signup pages.
- `/src/components`: Reusable UI and layout components.

## 🛡️ Admin Access
The Admin Panel is separated from the user dashboard. Access it via:
`http://localhost:9002/admin/dashboard`
