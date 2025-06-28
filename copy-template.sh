#!/bin/bash

# Create necessary directories
mkdir -p src/app/dashboard
mkdir -p src/components/dashboard
mkdir -p src/context
mkdir -p src/hooks
mkdir -p src/icons
mkdir -p src/layout

# Copy app files
cp -r free-nextjs-admin-dashboard-main/src/app/\(admin\)/* src/app/dashboard/
cp -r free-nextjs-admin-dashboard-main/src/app/\(full-width-pages\)/* src/app/
cp free-nextjs-admin-dashboard-main/src/app/globals.css src/app/
cp free-nextjs-admin-dashboard-main/src/app/layout.tsx src/app/
cp free-nextjs-admin-dashboard-main/src/app/not-found.tsx src/app/

# Copy components
cp -r free-nextjs-admin-dashboard-main/src/components/* src/components/

# Copy context
cp -r free-nextjs-admin-dashboard-main/src/context/* src/context/

# Copy hooks
cp -r free-nextjs-admin-dashboard-main/src/hooks/* src/hooks/

# Copy icons
cp -r free-nextjs-admin-dashboard-main/src/icons/* src/icons/

# Copy layout
cp -r free-nextjs-admin-dashboard-main/src/layout/* src/layout/

# Copy type definitions
cp free-nextjs-admin-dashboard-main/src/svg.d.ts src/ 