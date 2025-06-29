export default function Head() {
  return (
    <>
      <title>
        Play Next.js - SaaS Starter Kit and Boilerplate for Next.js
      </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="This SaaS Boilerplate and Starter Kit for Next.js is designed specifically for SaaS startups. It's a free resource complete with all the necessary integrations, pages, and components you require to build and launch a comprehensive SaaS website with robust features." />
      <link rel="icon" href="/images/favicon.ico" />
      {/* Load the Outfit font from Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap"
      />
      {/* Set the CSS variable for Tailwind to use */}
      <style>
        {`:root { --font-outfit: 'Outfit', sans-serif; }`}
      </style>
    </>
  );
}
