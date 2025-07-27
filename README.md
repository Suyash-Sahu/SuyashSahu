# 3D Portfolio Website

A modern and interactive portfolio website built with React.js and Three.js. This project showcases my skills, projects, and experience in web development through a unique 3D interface.

---

## Features

- Modern UI/UX with a dark theme
- Interactive 3D elements using Three.js
- Fully responsive design
- Animated sections and components
- Contact form with EmailJS integration
- 3D models and animations
- Performance optimized

---

## Tech Stack

- React.js
- Three.js
- TailwindCSS
- Framer Motion
- EmailJS
- React Three Fiber
- React Three Drei

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/3d-portfolio.git
   ```

2. **Install dependencies:**

   ```bash
   cd portfolio
   npm install
   ```

3. **Set up EmailJS (Required for contact form functionality):**

   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create an email service (Gmail, Outlook, etc.)
   - Create an email template
   - Get your credentials from the EmailJS dashboard

4. **Create a `.env` file in the root directory and add your EmailJS credentials:**

   ```env
   # EmailJS Configuration
   # Get these values from your EmailJS dashboard
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

   **⚠️ Security Note:** Never commit your `.env` file to version control. It's already added to `.gitignore`.

5. **Start the development server:**

   ```bash
   npm start
   ```

6. **Build for production:**

   ```bash
   npm run build
   ```

---

## Environment Variables

This project uses the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_EMAILJS_SERVICE_ID` | Your EmailJS service ID | Yes |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | Your EmailJS template ID | Yes |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | Your EmailJS public key | Yes |

---

## Project Structure

- `/src/components` - React components
- `/src/assets` - Images, icons, and 3D models
- `/src/constants` - Configuration and data files
- `/src/styles` - Global styles and Tailwind configuration
- `/src/utils` - Utility functions and helpers
- `/public` - Static files and 3D models

---

## 3D Models

The project uses several 3D models:
- Computer model in the Hero section
- Earth model in the Contact section
- Technology balls in the Tech section

Models should be placed in the `/public` directory.

---

## Customization

1. Update personal information in `/src/constants/index.js`
2. Replace images and icons in `/src/assets`
3. Modify styles in `/src/styles.js` and `/src/index.css`
4. Update 3D models in `/public`
5. Update EmailJS configuration in your `.env` file

---

## Security Considerations

- ✅ Environment variables are used for sensitive data
- ✅ `.env` file is in `.gitignore`
- ✅ No hardcoded API keys in the codebase
- ✅ EmailJS credentials are properly secured

---

## Deployment

The project can be deployed to platforms like:
- Vercel
- Netlify
- GitHub Pages

**Important:** Make sure to set up your environment variables in your deployment platform's settings.

Follow the respective platform's deployment guides for detailed instructions.

---

## Credits

- 3D Models from [Sketchfab](https://sketchfab.com)
- Icons from various sources with appropriate licenses
- Inspiration from various portfolio websites

---

## License

This project is open source and available under the MIT License.