# Short-King-URL-Shortener


## Requirements - 
### Initial
- Input long url, make it short (No BS url shortener)

### Optional
- Custom short urls
- Analytics on URLS
- User Authentication on URLS
- Add expiration dates


## Tech Stack
1. Nextjs for frontend
2. Node + Express for backend
3. MongoDB for Database
4. Vercel (frontend hosting), Render - Backend
5. Docker  - containerization
6. Postman - Testing APIs


## Database Schema
- id (unique id)
- short_url
- original_url
Optional
- created_at
- click_count


## URL Shortening Logic
- Hash Original URL and use part of the hash (MD5)  
- Before storing short code, check for collision, if collision, choose seperate set of hash code


## API Endpoints
1. POST ```/shorten``` - Accepts long URL and shortens
- Validate input URL
- Generate short code
- Store short code to database
- Return the short code

2. GET ```/:short_code``` - Redirect user to the original shortcode
- Find short_code in database
- If found, Redirect to corresponding original url, click_count++
- If not, return 404
