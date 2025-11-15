# E-Commerce Next.js Application

A modern, full-featured e-commerce web application built with Next.js 15, TypeScript, and Tailwind CSS. This project provides a complete online shopping experience with user authentication, product management, shopping cart functionality, and order processing.

## 🚀 Features

### 🛍️ Core E-commerce Features

- **Product Catalog**: Browse and search through products with detailed information
- **Category Management**: Organized product categories with slider navigation
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Management**: Complete order processing and order history
- **Related Products**: Product recommendations based on current selection

### 🔐 Authentication & Security

- **User Authentication**: Secure login/register system using NextAuth.js
- **Password Management**: Forget password, reset code, and password reset functionality
- **Protected Routes**: Middleware protection for authenticated pages
- **JWT Token Management**: Secure token handling and validation

### 💳 Payment & Checkout

- **Multiple Payment Options**: Cash and online payment methods
- **Secure Checkout**: Protected checkout process with form validation

### 🎨 UI/UX Features

- **Responsive Design**: Fully responsive across all device sizes
- **Modern UI Components**: Built with Radix UI and shadcn/ui
- **Interactive Carousels**: Product and category sliders using Swiper.js
- **Loading States**: Skeleton loading and proper loading indicators
- **Form Validation**: Comprehensive form validation using Zod schemas
- **Toast Notifications**: User feedback with Sonner toast notifications

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Context API
- **Form Handling**: React Hook Form + Zod validation
- **Carousel**: Swiper.js + Embla Carousel
- **Icons**: Lucide React + Font Awesome

### Backend & Authentication

- **Authentication**: NextAuth.js
- **API Routes**: Next.js API routes
- **JWT**: JSON Web Token handling

### Development Tools

- **Build Tool**: Turbopack (Next.js 15)
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript
- **PostCSS**: For CSS processing

## 📁 Project Structure

```
src/
├── api/                    # API utility functions
│   ├── products.ts         # Product-related API calls
│   ├── cart.ts            # Cart management APIs
│   └── auth.ts            # Authentication APIs
├── app/                   # Next.js App Router
│   ├── (pages)/           # Route groups
│   │   ├── (auth)/        # Authentication pages
│   │   ├── products/      # Product pages
│   │   ├── cart/          # Shopping cart
│   │   └── checkout/      # Checkout process
│   ├── _components/       # Shared components
│   └── api/               # API routes
├── components/ui/         # Reusable UI components
├── context/               # React Context providers
├── lib/                   # Utility libraries
├── schema/                # Zod validation schemas
├── types/                 # TypeScript type definitions
└── utilities/             # Helper functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Hussein-123/E-commerce.git
   cd E-commerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   # Add other required environment variables
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS v4 with custom configurations. Modify `tailwind.config.js` for customization.

### ESLint

ESLint is configured with Next.js recommended rules. See `eslint.config.mjs` for configuration.

### TypeScript

TypeScript configuration is in `tsconfig.json` with strict mode enabled.

## 🎯 Key Components

### Authentication System

- Login/Register pages with form validation
- Password reset workflow
- Protected routes with middleware
- Session management with NextAuth.js

### Shopping Experience

- Product listing with pagination
- Category-based filtering
- Shopping cart with persistent state
- Checkout process with payment options
- Order tracking and history

### UI Components

- Responsive navigation bar
- Product cards with hover effects
- Interactive carousels and sliders
- Form components with validation
- Loading states and error handling

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to GitHub
2. Import your project to Vercel
3. Configure environment variables
4. Deploy with one click

### Other Platforms

This Next.js application can be deployed on any platform that supports Node.js applications:

- Railway
- Netlify
- AWS
- Digital Ocean
- Heroku

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [NextAuth.js Documentation](https://next-auth.js.org/) - Authentication for Next.js
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Radix UI Documentation](https://www.radix-ui.com/) - Low-level UI primitives
- [React Hook Form Documentation](https://react-hook-form.com/) - Forms with easy validation

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Hussein-123** - [GitHub Profile](https://github.com/Hussein-123)

---

⭐ Star this repository if you find it helpful!
