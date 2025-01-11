# Blog Website

A feature-rich blog website built with modern technologies to provide an engaging and interactive platform for users to create, manage, and share blog posts. The project leverages cutting-edge tools and libraries to ensure scalability, maintainability, and a seamless user experience.

## **Features**

- **User Authentication**:
  - Users can create an account and log in securely.
  - Authentication services are implemented using [Appwrite](https://appwrite.io/).
  
- **Post Creation and Management**:
  - Users can create detailed blog posts visible to all users.
  - Posts can be edited or deleted by the respective authors.

- **Rich Text Editing**:
  - The blog editor includes advanced customization features.
  - Users can format text with different fonts, colors, and styles.
  - Built using [TinyMCE](https://www.tiny.cloud/), an open-source WYSIWYG editor.

- **State Management**:
  - Efficient state management achieved using [React Redux](https://react-redux.js.org/).

- **Form Handling**:
  - Forms for user input are built with [React Hook Form](https://react-hook-form.com/), ensuring seamless validation and submission.

## **Demo**

Check out the live demo as well provided in the repo itself.

## **Installation**

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/username/blog-website.git
   ```

2. Navigate to the project directory:
   ```bash
   cd blog-website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   REACT_APP_APPWRITE_PROJECT_ID=your_project_id
   REACT_APP_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
   ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```


## **Technologies Used**

- **Frontend:**
  - React.js
  - React Redux
  - React Hook Form
  
- **Rich Text Editor:**
  - TinyMCE

- **Authentication:**
  - Appwrite

- **State Management:**
  - Redux Toolkit

- **Styling:**
  - CSS Modules
  
## **Usage**

1. **Sign Up/Login**:
   - Users must sign up or log in to access the platform.

2. **Create a Post**:
   - Click on "Create Post" to draft a new blog entry.
   - Use the text editor to format and customize your content.

3. **Edit/Delete a Post**:
   - Navigate to your posts and select "Edit" to modify an existing post or "Delete" to remove it.

4. **View Posts**:
   - Browse all published posts on the homepage.

## **Contributing**

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Added new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

### **Acknowledgments**

- [Appwrite Documentation](https://appwrite.io/docs)
- [React Redux Official Docs](https://react-redux.js.org/)
- [TinyMCE Documentation](https://www.tiny.cloud/docs/)

---

Feel free to reach out for any questions or feedback!


