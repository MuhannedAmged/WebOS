# WebOS

WebOS is a web-based operating system simulation built using [Next.js](https://nextjs.org). It provides a desktop-like experience in the browser, complete with applications, a taskbar, and a start menu. The project is designed to mimic the look and feel of a traditional operating system, offering a unique and interactive user experience.

## Features

- **Taskbar and Start Menu**: A fully functional taskbar and start menu for launching and managing applications.
- **Applications**: Includes built-in apps such as a browser, notepad, settings, terminal, and file explorer.
- **Right-Click Context Menu**: Provides a context menu for additional options, enhancing the desktop experience.
- **Dynamic Window Management**: Supports minimizing, maximizing, and z-index management for open applications.
- **Customizable Themes**: Allows users to switch between different themes for a personalized experience.
- **Internet Status Indicator**: Displays the current internet connection status.

## Getting Started

To get started with WebOS, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MuhannedAmged/WebOS.git
   cd WebOS
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

The project is organized as follows:

- `src/app`: Contains the main application files, including pages, layouts, and global styles.
- `src/components`: Reusable UI components and theme providers.
- `src/context`: Context providers for managing application state.
- `src/store`: State management files for various features like apps, menus, and settings.
- `src/lib`: Utility functions used across the application.
- `public`: Static assets such as images and icons.

## Technologies Used

- [Next.js](https://nextjs.org): A React framework for building server-rendered applications.
- [Tailwind CSS](https://tailwindcss.com): A utility-first CSS framework for styling.
- JavaScript: The primary programming language for the project.

## Contributing

Contributions are welcome! If you'd like to contribute to WebOS, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
