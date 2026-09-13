# AgriPulse AI 🌿

> **"Know Your Farm. Predict the Risk. Grow Smarter."**

## 📖 Project Overview
AgriPulse AI is a comprehensive, mobile-first, AI-powered decision-support system built specifically for modern farmers. Instead of presenting raw, disconnected data, AgriPulse unifies crop health, weather intelligence, irrigation needs, disease risk, and market dynamics into a single personalized view. 

It answers the most critical question for every farmer: **"What should I do TODAY, and WHY?"**

## 💡 Unique Value Proposition
While most agricultural apps focus on a single vertical (like just disease detection or just weather), AgriPulse AI serves as a holistic **AI-powered, mobile-first decision-support system**. It is designed with a low-connectivity, highly-accessible (Tamil/English bilingual) UX that distills complex agronomical data into simple, actionable daily tasks.

## 🌟 Key Features

### 🧠 AI Farm Advisor ("What Should I Do Today?")
A generative AI daily action plan that analyzes real-time weather forecasts, current crop growth stages, localized disease risks, and market trends to give farmers a simple, bulleted list of actions for the day.

### 🍃 Crop Health
Farmers can upload leaf images to get instant, multimodal AI analysis of potential diseases, confidence scores, severity levels, and immediate organic/chemical treatment recommendations.

### 📈 Market Intelligence & "Best Market" Calculator
Tracks historical and predicted crop prices using interactive charts. It includes a unique net-return calculator that evaluates nearby markets based on live prices minus estimated transportation costs, recommending the most profitable destination.

### 🎤 AgriVoice (Bilingual Assistant)
A bilingual voice-assistant interface allowing farmers to ask natural language questions (e.g., "Tomorrow rain varuma?") and receive AI-driven spoken and written advice.

### 🎛️ Hackathon Demo Mode
A built-in presentation tool that allows you to instantly simulate real-world agricultural events (e.g., Heavy Rain, Heat Wave, Disease Outbreak) and watch the AI dynamically adjust its recommendations.

## 🛠️ Technical Stack

**Frontend:**
- **React.js & Vite:** Fast, modern, and mobile-first UI framework.
- **TypeScript:** For type-safe code.
- **Tailwind CSS & Framer Motion:** For beautiful, responsive styling and fluid animations.
- **Recharts:** For dynamic market price visualization.

**Backend & Database:**
- **Node.js & Express.js:** Robust server architecture.
- **MongoDB:** NoSQL database for flexible storage of user profiles, farm data, and activity logs.
- **Google Gemini API:** Powers the multimodal image analysis, daily action plans, and voice query processing.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or MongoDB Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd agripulse-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   APP_URL="http://localhost:3000"
   MONGODB_URI="mongodb+srv://..."
   ```

4. **Run the Development Server:**
   This project uses a full-stack configuration. The `dev` script starts the Express server which also runs the Vite frontend middleware.
   ```bash
   npm run dev
   ```
   
   The application will be available at: `http://localhost:3000`

### Building for Production
To build the optimized client SPA and compile the backend into a standalone file:
```bash
npm run build
npm start
```
