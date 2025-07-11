# 🛒 E-Commerce Backend API (NestJS + Supabase)

A scalable and modular e-commerce backend built with [NestJS](https://nestjs.com/) and [Supabase](https://supabase.com/) that supports authentication, product management, comments, and more.

---

## Includes

- Supabase Authentication (Signup / Login)
- Product management with multiple images
- Comment system with user binding
- Route protection with custom AuthGuard
- Supabase used as the main database (PostgreSQL)
- Only authenticated users can create comments
- Clean RESTful API with validation and modular architecture
- Fully typed with TypeScript
- Ready for integration with frontend clients 

---

## Features

- Supabase Authentication (Email + Password)
- Product creation, listing, and image support
- JSON-based `additional_data` field for flexible product details
- Comment system (CRUD) for each product
- Authorization using `AuthGuard` (only logged-in users can create/edit/delete in comments)
- Organized directory structure with `modules/`, `shared/`, `common/`, and `database/`
- Postman-tested routes
- Written in TypeScript

## Project Structure

<pre>
src/
├── app.module.ts           # Root NestJS module
├── main.ts                 # App entry point
│
├── modules/                # Business/domain modules
│   ├── auth/               # Supabase auth logic
│   ├── product/            # Product + images
│   └── comment/            # Comment system
│
├── shared/                 # Singleton-style services
│   └── supabase/           # Supabase client/module/service
│   └── types/              # Custom TypeScript types
│
├── common/                 # Global guards, filters, decorators
│   ├── guards/
│   └── interceptors/
│   └── filters/
├── database/               # Includes create tables sql files
</pre>

## Getting Started
```bash
    npm install
```

- Copy .env.example file and rename it to .env
- Set environments variable values

```bash
    npm run start:dev
```