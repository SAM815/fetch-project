# 🐶 Fetch Dog Finder

Fetch is a full-stack-friendly frontend application that helps users find and connect with adoptable dogs. It features personalized filters, a match-making system, interactive dog profiles, and even a map-based search—making the experience both functional and fun.

## 🚀 Overview

This project was built as a take-home assignment for the **Fetch internship/job application**. My goal was to create an engaging, accessible, and responsive experience for users searching for their ideal dog companion.

The app allows users to:
- Log in and save favorite dogs
- Filter dogs by breed and sort them alphabetically
- Match with a dog based on their favorites
- View detailed profiles for each dog
- Can view all of the dogs selected as favorites by clicking the favorite button in the profile.
- Enjoy playful touches like confetti when matches are found

## 🎨 Design Process

Before writing any code, I created a full UI/UX prototype using **Figma**. The design focused on:
- Accessibility and readability
- Consistent color schemes and branding

Once finalized, I translated the Figma mockups into actual components using **React** and **Tailwind CSS** to match the design closely.

## 🧰 Technologies Used

- **TypeScript** – For type safety and scalability
- **React** – UI library for building interactive components
- **Redux Toolkit** – State management for authentication and favorite dogs
- **Leaflet + React Leaflet** – Map integration with ZIP radius filtering
- **React Confetti** – For celebratory match alerts 🎉
- **Tailwind CSS** – For rapid and consistent styling
- **Vercel** – For deployment

## ✨ Features I’d Improve or Expand

For production-level work, I would:
- **Add error handling/loading states** for better UX
- **Enable search radius customization** (e.g. adjustable miles range)
- **Deploy in AWS**: Because I want to.
- **Write unit/integration tests** using Jest and React Testing Library

## 📦 How to Run

Clone the repo and run:

```bash
npm install
npm start
