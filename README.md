# 🚀 Ag3nt – The API & Content Monetization Marketplace

Ag3nt is a next-generation platform for creators and consumers to **monetize, discover, and interact with APIs and digital content**. With a sleek, modern UI, real-time chat agent, and seamless paywall integration, Ag3nt empowers developers and content creators to earn from their work, while enabling consumers to find, try, and purchase APIs and documents with ease.

![Ag3nt Hero](public/vite.svg) <!-- Replace with a real screenshot or logo if available -->

---

## ✨ Features

- **Animated Landing Page:** Eye-catching hero, CTAs, and feature highlights.
- **Role-based Experience:** Separate flows for API/content creators and consumers.
- **Modern Sidebar:** Context-aware navigation, user info, wallet balance, and quick actions.
- **Creator Dashboard:** Visual stats, API/file management, and revenue tracking.
- **API & Document Upload:** Interactive forms with dynamic fields, param inference, and schema preview.
- **Marketplace Explore:** Search, filter, and try APIs or documents with shimmer loading and no-data states.
- **Chat Agent:** AI-powered, animated chat with markdown/code rendering, tool suggestions, and direct API execution.
- **Paywall & Wallet:** ETH-based payments, top-up, and transparent cost display.
- **Beautiful UI:** Built with React, Tailwind CSS, shadcn/ui, and Headless UI for dialogs and effects.
- **Firebase Auth:** Secure authentication and user management.

---

## 🖥️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, Headless UI
- **Backend:** (API endpoints assumed, not included in this repo)
- **Auth & Data:** Firebase
- **Payments:** ETH wallet integration
- **Icons:** Lucide

---

## 🏁 Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start the development server:**

   ```sh
   npm run dev
   ```

3. **Open in your browser:**
   ```
   http://localhost:5173
   ```

---

## 🧑‍💻 Project Structure

```
src/
  components/         # Reusable UI components (Sidebar, Forms, Tables, Toast, etc.)
  contexts/           # Auth context and providers
  pages/              # Route-based pages (Landing, Dashboard, Explore, Chat, etc.)
  utils/              # API, Firebase, and helper utilities
  styles/             # Global and utility styles
public/               # Static assets
```

---

## 🛠️ Key Flows

- **Creators:**
  - Sign in → Dashboard → Add API/Document → Track stats & revenue
- **Consumers:**
  - Explore Marketplace → Search/Filter → Try/Buy APIs & Docs → Chat with Agent
- **Chat Agent:**
  - Ask questions, get tool suggestions, execute APIs, and see results inline

---

## 📸 Screenshots

<!-- Add screenshots here if available -->

- Landing Page
- Dashboard
- API Execution Dialog
- Chat Agent with Tool Suggestions

---

## 🤔 FAQ / Questions

- **How do I add a new API or document?**  
  Use the "Add API" or "Add Document" options in the creator sidebar.

- **How does payment work?**  
  All paid APIs and documents use ETH. Top up your wallet from the sidebar.

- **How does the chat agent suggest tools?**  
  When relevant, the agent will show tool cards with "Execute" options directly in the chat.

---

## 🙋 Feedback & Contributions

Have ideas, bugs, or want to contribute?  
Open an issue or pull request!

---

## 📄 License

MIT

---

**Questions for you:**

- Would you like to include deployment instructions (Vercel, Netlify, etc.)?
- Should we add API documentation or a section for backend setup?
- Any team credits or acknowledgments to include?
- Do you want to add badges (build, license, etc.) or a project logo?

Let me know your preferences and I’ll update the README accordingly!
