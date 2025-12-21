# Unix Time Converter

A modern, user-friendly tool to convert Unix timestamps to human-readable dates and vice versa. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Real-time Conversion**: Instantly convert timestamps as you type.
- **Multiple Units**: Supports Seconds (s), Milliseconds (ms), Microseconds (μs), and Nanoseconds (ns).
- **Timezone Support**: Convert dates to and from any timezone.
- **Current Time**: Shows the current Unix timestamp in real-time.
- **Shareable Links**: State is stored in URL parameters for easy sharing.
- **Auto-detection**: Smart detection of timestamp units.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/garaemon/unix-time-converter.git
   cd unix-time-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## URL Parameters

You can initialize the converter with specific values using URL parameters:

- `time`: The Unix timestamp to convert.
- `unit`: The unit of the timestamp. Supported values: `s` (seconds), `ms` (milliseconds), `us` (microseconds), `ns` (nanoseconds).
- `tz`: The target timezone (e.g., `UTC`, `America/New_York`, `Asia/Tokyo`).

### Examples

- Open with a specific timestamp in seconds:
  `http://localhost:5173/?time=1700000000&unit=s`

- Open with a specific timestamp in milliseconds and a target timezone:
  `http://localhost:5173/?time=1700000000000&unit=ms&tz=Asia/Tokyo`

- Open with just a target timezone (uses current time):
  `http://localhost:5173/?tz=UTC`

## Built With

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [date-fns](https://date-fns.org/)
