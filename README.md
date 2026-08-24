# Attendly

> Track and plan your semester attendance.

Attendly is a modern, lightweight attendance calculator built with **Next.js 15**. It helps students calculate their current attendance percentage, determine safe skips, plan attendance recovery, and visualize semester attendance targets.

## Features

### 📊 Attendance Percentage

Calculate your current attendance percentage based on the number of classes attended versus the total number of classes.

The calculator also provides visual health indicators to help you understand your current attendance status.

### 🎒 Bunk Planner

Find out how many classes you can safely miss while maintaining your required attendance target.

Set your target percentage and instantly see your maximum number of safe skips.

### 📈 Recovery Planner

Determine how many consecutive classes you need to attend to reach your desired attendance percentage.

This is useful when your current attendance falls below your target.

### 🎯 Milestone Gauges

Track important attendance milestones using responsive SVG circular gauges.

Supported targets include:

* 70%
* 75%
* 80%
* 85%
* 90%
* 95%

### 📐 Formulas Guide

A dedicated formulas reference is available at:

`/formulas`

The page explains the mathematical formulas used by Attendly for attendance calculations, safe skips, and recovery planning.

## Tech Stack

Attendly is built using a modern React and Next.js stack:

* **Next.js 15** — App Router
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion** — animations and motion effects
* **Lucide React** — icons
* **Vitest** — unit testing

## Installation

### 1. Clone the project

```bash
git clone <your-repository-url>
cd attendly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

### 4. Run tests

```bash
npm test
```

### 5. Build for production

```bash
npm run build
```

### 6. Start the production server

```bash
npm start
```

## Calculations

Attendly uses mathematically precise formulas to calculate attendance and plan future classes.

### Attendance Percentage

The current attendance percentage is calculated as:

$$
\text{Attendance \%} = \left(\frac{\text{Attended}}{\text{Total}}\right) \times 100
$$

Where:

* **Attended** = Number of classes attended
* **Total** = Total number of classes conducted

### Safe Skips

The maximum number of classes that can be missed while maintaining the selected target is calculated as:

$$
\text{Safe Skips} = \left\lfloor \frac{100 \times \text{Attended}}{\text{Target}} - \text{Total} \right\rfloor
$$

Where:

* **Attended** = Number of classes attended
* **Total** = Total number of classes conducted
* **Target** = Required attendance percentage

### Required Recovery

The minimum number of consecutive classes that must be attended to reach the selected target is:

$$
\text{Required Classes} = \left\lceil \frac{\text{Target} \times \text{Total} - 100 \times \text{Attended}}{100 - \text{Target}} \right\rceil
$$

Where:

* **Attended** = Number of classes attended
* **Total** = Total number of classes conducted
* **Target** = Desired attendance percentage

## Project Structure

A typical Attendly project is organized around the Next.js App Router:

```text
attendly/
├── app/
│   ├── formulas/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── AttendanceCalculator.tsx
│   ├── AttendanceChart.tsx
│   ├── AttendanceRing.tsx
│   ├── CalculatorTabs.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── QuickTargets.tsx
│   ├── ResultCard.tsx
│   └── ThemeToggle.tsx
│
├── lib/
│   └── calculations.ts
│
├── tests/
│   └── calculations.test.ts
│
├── public/
│   ├── robots.txt
│   └── sitemap.xml
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Development

During development, run:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

The `/formulas` route contains the complete reference for the mathematical calculations used by the application.

## Production

Create an optimized production build with:

```bash
npm run build
```

After the build completes, start the production server with:

```bash
npm start
```

## Testing

Run the unit test suite with:

```bash
npm test
```

Tests should cover the core attendance calculations, including percentage calculation, safe skips, and required recovery classes.

## License

© 2026 Attendly. All rights reserved.
