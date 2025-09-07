#  AI Conversation Logs

This document captures the conversations between the **developer** and the **AI assistant** while building the **Event Management System**.  
It reflects brainstorming, problem-solving, and implementation steps that shaped the project.

---

## Log 1 – Project Kickoff
**Dev:** I want to build an Event Management System where admins create events and students can register.  
**AI:** Great idea! Use the **T3 Stack** (Next.js, tRPC, Prisma, NextAuth, TailwindCSS) for a solid foundation.  
**Dev:** Sounds good. Let’s add analytics too.  
**AI:**  We’ll track total events, student registrations, attendance, and feedback.

---

##  Log 2 – Feature Planning
**Dev:** What should admins be able to do?  
**AI:**  
- Create/manage events  
- Track registered students  
- Mark attendance  
- View analytics dashboard  

**Dev:** And students?  
**AI:**  
- Register for events  
- Mark attendance (when allowed)  
- Submit feedback  

---

##  Log 3 – Tech Stack Discussion
**Dev:** Which tools should we use?  
**AI:**  
- **Next.js (App Router)** → UI + API routes  
- **tRPC** → Type-safe API layer  
- **Prisma ORM** → Database queries  
- **NextAuth** → Authentication/authorization  
- **Tailwind + shadcn/ui** → Styling & components  
- **PostgreSQL** → Database backend  

**Dev:** Nice. I want role-based access too.  
**AI:**  NextAuth can handle role-based session logic.

---

## 📝 Log 4 – Database & API Design
**Dev:** Let’s sketch out the schema.  
**AI:** Suggested Prisma models:  
- `User` (role: ADMIN/STUDENT)  
- `Event` (name, description, date, type)  
- `Registration` (student ↔ event)  
- `Attendance` (status, timestamp)  
- `Feedback` (rating, comments)  

**Dev:** And API endpoints?  
**AI:**  
- `POST /events/create`  
- `GET /events/list`  
- `GET /events/:id`  
- `POST /students/register`  

---

##  Log 5 – Dashboard & Analytics
**Dev:** I want insights for admins.  
**AI:**  Build a dashboard with:  
- Total events hosted  
- Total student registrations  
- Attendance percentages  
- Feedback summaries  

---

## Log 6 – Deployment Notes
**Dev:** How do I get it running?  
**AI:**  
1. Clone repo → `git clone ...`  
2. Install deps → `npm install`  
3. Setup `.env` with DB + NextAuth secrets  
4. Run Prisma migrations → `npx prisma migrate dev`  
5. Start dev server → `npm run dev`  

---

##  Outcome
Through these conversations, the Event Management System was designed with:  
- A clear **feature split** between admins & students  
- A solid **T3 tech stack**  
- **Analytics** for event insights  
- **Role-based auth** for secure access  

---
