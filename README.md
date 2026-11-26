# Ayush Jadhav portfolio

Run `npm install` and `npm run dev` for the Vite frontend. Build with `npm run build`.

## AyushAI

On Vercel, set `OPENAI_API_KEY` as a server environment variable. The frontend uses the same-origin `/api/chat` by default. To run the frontend and API together locally, use Vercel's development server with the same server-side variable.

GitHub Pages serves the frontend only. To enable chat there, set the repository Actions variable `VITE_AYUSH_AI_ENDPOINT` to the absolute HTTPS URL of the deployed chat function. Set `AYUSH_AI_ALLOWED_ORIGIN` on that backend to the portfolio origin, for example `https://ayushjadhav.com`. This endpoint URL is public. Keep the API key on the backend.

The chat function bounds requests and applies an in-memory per-client limit. Configure a shared rate limit at the hosting layer if the function needs a limit across instances.
