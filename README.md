# Samundri Food Hub

A React restaurant ordering website powered by Vite. The first customer-facing experience is live in the browser with menu filtering, a responsive layout, and a working bag interaction.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Add the Supabase project URL and anon key to `.env`.
4. Start the website with `npm run dev`.
5. Open the local URL shown by Vite.

## Supabase connection

The Supabase client is initialized in `src/lib/supabase.js`. The menu page reads available dishes from Supabase when configured and falls back to the demo menu when it is not. Reservations, event enquiries, table availability and orders use Supabase when configured and show clear saving, success, error, or demo-mode feedback.

Use the Supabase dashboard to create the project and obtain the public project URL and anon key. For a fresh project, run these files in order: `supabase/schema.sql`, `supabase/menu-catalog.sql`, `supabase/restaurant-menu-catalog.sql`, `supabase/restaurant-menu-expansion.sql`, `supabase/order-history-dashboard.sql`, and `supabase/restaurant-owner-dashboard.sql`. For an existing project, run `supabase/table-reservations.sql`, `supabase/event-bookings.sql`, `supabase/order-details.sql`, `supabase/secure-order-totals.sql`, `supabase/secure-reservation-bookings.sql`, `supabase/menu-catalog.sql`, `supabase/restaurant-menu-catalog.sql`, `supabase/restaurant-menu-expansion.sql`, `supabase/order-history-dashboard.sql`, and `supabase/restaurant-owner-dashboard.sql` in that order. If an event enquiry fails with a missing `customer_id` column error, run `supabase/event-bookings.sql` in the Supabase SQL Editor; it adds the column and reloads PostgREST's schema cache. If PostgREST reports that an RPC function is missing from its schema cache, run `NOTIFY pgrst, 'reload schema';` in the SQL Editor. The secure order function calculates prices from `menu_items`; it ignores totals sent by the browser. Reservation creation is serialized in the database so concurrent requests cannot confirm the same table/date. These dashboard migrations enable customer order history and restaurant-scoped owner access with row-level security. Do not put service-role keys in this React application.

If a reservation fails because the contact-number field or `create_reservation` function is missing, the existing Supabase project needs the reservation migration. Run `supabase/table-reservations.sql` and then `supabase/secure-reservation-bookings.sql` in the Supabase SQL Editor, and retry the booking after the schema reload completes.

For immediate customer email signup without a verification step, turn off **Confirm email** under Supabase Authentication / Sign In / Providers / Email. With that setting off, Supabase returns a session at signup and the app sends the customer straight to their dashboard. If confirmation is kept on, add `http://localhost:5173/**`, `http://127.0.0.1:5173/**`, and the production domain under Authentication / URL Configuration / Redirect URLs. Configure custom SMTP only if email confirmation is enabled and reliable delivery to Gmail is needed.

## Staff dashboard

The customer dashboard is available at `/#history`; signed-in customers see their saved order history and booking activity. Sign in before ordering or reserving to sync activity to the account across devices. Guest activity is kept in that browser only. Run `supabase/secure-reservation-bookings.sql` on existing projects to link reservations to customer accounts. For a restaurant owner, create an Auth user and insert their UUID plus assigned restaurant slug into `restaurant_owners` using the example at the bottom of `supabase/restaurant-owner-dashboard.sql`. Owners sign in at `/#owner` and can manage orders and reservation statuses only for assigned restaurants. Do not add public select, update, or delete policies for reservations.

## GitHub

Git must be installed and available in the terminal before this project can be pushed. Once available, initialize a repository, add the files, create the first commit, connect the GitHub repository as `origin`, and push the `main` branch.

Never commit `.env`. The repository ignores environment files while allowing `.env.example` to be shared.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the site whenever changes are pushed to `main`. In repository Settings / Pages, set the build and deployment source to **GitHub Actions**. Add repository Actions secrets named `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` so customer flows can connect to Supabase; use only the public anon/publishable key, never a service-role key. The project site URL is `https://ayshaysh5757-sudo.github.io/BiteX/` after the workflow completes successfully.

## Production launch checklist

- Add the production Supabase URL and anon key to the hosting provider's environment variables.
- Run every required SQL migration in order, including the secure order-total function.
- Replace demo contact details, restaurant phone numbers, and email addresses with verified business details.
- Connect a payment provider before enabling online card payments; the current checkout intentionally keeps that option disabled.
- Configure the deployed domain, HTTPS, favicon, and social sharing image in the hosting provider.
- Test menu loading, reservations, event enquiries, orders, WhatsApp links, and admin access on desktop and mobile.
