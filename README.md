# VibeSpace – Real-Time Team Communication Platform

## 1. Project Title
VibeSpace – Real-Time Team Communication Platform

## 2. Problem Statement
Efficient team communication and collaboration are often fragmented across multiple platforms, making it hard to track conversations and share resources seamlessly. VibeSpace provides a centralized, real-time messaging platform with organized channels, private messaging.

## 3. System Architecture
### High-Level Flow:
Frontend → Backend (API/WebSocket) → Database

### Stack:
- **Frontend:** Next.js
- **Backend:** Node.js + Express.js + WebSocket (for real-time messaging)
- **Database:** MongoDB (for messages, users, channels)
- **Authentication:** JWT-based login/signup

### Hosting:
- **Frontend:** Vercel / Netlify
- **Backend:** Render / Railway
- **Database:** MongoDB Atlas

## 5. Key Features
| Category | Features |
|---------|----------|
| **Authentication & Authorization** | User registration, login, logout, role-based access (admin/user) |
| **Messaging** | Real-time messaging in channels, direct messaging |
| **Channels & Groups** | Create, join, and manage chat channels or groups |
| **Media Sharing** | Share images in chats |
| **Notifications** | Real-time notifications for mentions, messages, and updates |
| **Search, Sort & Filter** | Search users, messages, and channels; sort messages by time or sender; filter chats by unread, pinned, or starred |
| **Frontend Routing** | Pages: Home, Login, Dashboard, Channel, Direct Messages, Profile |

## 6. Tech Stack
| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js, TailwindCSS |
| **Backend** | Node.js, Express.js, WebSocket |
| **Database** | MongoDB |
| **Authentication** | JWT / OAuth |
| **AI (Optional)** | OpenAI (for moderation or chat suggestions) |
| **Hosting** | Vercel, Netlify, Render, Railway |

## 7. API Overview
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/auth/signup` | POST | Register new user | Public |
| `/api/auth/login` | POST | Authenticate user | Public |
| `/api/users/me` | GET | Get logged-in user profile | Authenticated |
| `/api/channels` | GET | Get all channels | Authenticated |
| `/api/channels/search?query=` | GET | Search channels by name | Authenticated |
| `/api/channels/:id` | POST | Post message in a channel | Authenticated |
| `/api/channels/:id` | DELETE | Delete a channel | Admin only |
| `/api/messages/:id` | PUT | Update a message | Authenticated |
| `/api/messages/:id` | DELETE | Delete a message | Authenticated / Admin |
| `/api/messages/search?query=` | GET | Search messages by keyword | Authenticated |
| `/api/messages/filter?type=` | GET | Filter messages (unread/pinned/starred) | Authenticated |
| `/api/users/search?query=` | GET | Search users by name or email | Authenticated |
| `/api/users/sort?by=` | GET | Sort users by status or name | Admin |
