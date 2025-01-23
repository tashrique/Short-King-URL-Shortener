# Short-King URL Shortener

**Short-King** is a simple and efficient URL shortener service that lets you convert long, cumbersome URLs into short, user-friendly ones. Designed with scalability and performance in mind, it also supports additional features like custom short URLs, analytics, and expiration dates.

## Live Link: [https://short-king-url-shortener.vercel.app/](https://short-king-url-shortener.vercel.app/)
---

## **Features**
### **Initial Features**
- Shorten any long URL into a compact, shareable link.
- Simple, no-nonsense functionality.

### **Optional Features (Planned Enhancements)**
- **Custom Short URLs**: Create personalized, memorable links.
- **Analytics**: Track click counts and usage data for each short URL.
- **User Authentication**: Restrict access and allow user-specific short URL management.
- **Expiration Dates**: Set expiry times for short URLs to keep links temporary.

---

## **Tech Stack**
1. **Frontend**: Next.js
2. **Backend**: Node.js + Express
3. **Database**: MongoDB
4. **Hosting**:
   - Frontend: Vercel
   - Backend: Render
5. **Containerization**: Docker
6. **API Testing**: Postman

---

## **Database Schema**
| Field         | Type       | Description                                   |
|---------------|------------|-----------------------------------------------|
| `id`          | String     | Unique identifier for the record.             |
| `short_url`   | String     | The shortened URL.                            |
| `original_url`| String     | The original long URL.                        |
| **Optional**  |            |                                               |
| `created_at`  | Date       | Timestamp when the URL was created.           |
| `click_count` | Number     | Tracks how many times the short URL is used.  |

---

## **URL Shortening Logic**
- **Hashing**: Uses an MD5 hash of the original URL and takes a segment of it as the short code.
- **Collision Handling**: Checks for hash collisions in the database and regenerates the hash if a collision is detected.

---

## **API Endpoints**
### **1. POST `/shorten`**
- Accepts a long URL as input and returns a short URL.
- **Features**:
  - Validates the input URL.
  - Generates a unique short code.
  - Stores the short code and original URL in the database.

### **2. GET `/:short_code`**
- Redirects the user to the original URL corresponding to the short code.
- **Features**:
  - Searches for the `short_code` in the database.
  - If found:
    - Redirects to the original URL.
    - Increments the `click_count`.
  - If not found:
    - Returns a `404 Not Found` error.

---

## **Requirements**
### **For Development**
- Node.js (v16 or later)
- Docker (for containerization)
- MongoDB (local or Atlas for development)

### **For Deployment**
- Vercel (Frontend)
- Render (Backend)