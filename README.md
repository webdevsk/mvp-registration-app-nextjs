# Form Validation and Multi-Step Form Project

A demo project showcasing a multi-step form with robust features including responsive design, dark mode support, form validation with Zod, efficient form management with React Hook Form, form state persistence in Local Storage, data submission using React Query, and a Next.js API route for backend interactions.

## Features

- **React Hook Form:** For efficient and extensible form state management.
- **Form Validation:** Utilizes [Zod](https://github.com/colinhacks/zod) for schema-based validation.
- **LocalStorage Persistence:** Persist form data using [usehooks-ts](https://usehooks-ts.com/).
- **React Query:** Manage API calls with built-in pending and error states.
- **Next.js API Route:** A simple route handler that logs submitted form data to the console.
- **Responsive Design:** Optimized for various screen sizes.
- **Dark Mode:** Modern UI with dark theme support.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or [PNPM](https://pnpm.io/) or NPM
- [Node.js](https://nodejs.org/) (required if using PNPM or NPM)
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/webdevsk/mvp-registration-app-nextjs.git
cd mvp-registration-app-nextjs
```

Install dependencies using Bun:

```bash
bun i
```

Or using PNPM:

```bash
pnpm i
```

Or using NPM:

```bash
npm i
```

### Running the Application

Start the development server using Bun:

```bash
bun dev
```

Or using PNPM:

```bash
pnpm run dev
```

Or using NPM:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building the Application

To build the project for production using Bun:

```bash
bun run build
```

Or using PNPM:

```bash
pnpm run build
```

### API Route

The Next.js API route at `/api/submit` handles form submissions by simply logging the submitted data to the console. You can extend this endpoint as needed.

## Project Structure

```
├── components/
│   └── multi-step-form.tsx       // Multi-step form component with React Query and form handling
├── pages/
│   └── api/
│       └── submit.ts             // Next.js API route for form submission
├── lib/
│   └── form-schema.ts            // Zod schema for form validation
├── public/                       // Static assets
├── README.md                     // This file
└── package.json                  // Project configuration
```

## License

This project is licensed under the MIT License.
