# Overview
This project is a simple Todo Management application built using React. The application allows users to add, edit, delete, and search todos. Each todo item can have a description and a completion status. Users can also toggle the visibility of completed todos and view detailed information for each todo item.

# System Design
The application follows a component-based design with the main logic residing in the App component. The following key features are implemented:

- State Management: React's useState hook is used to manage the application's state.
- Data Fetching: Axios is used to fetch and manage data from a backend server.
- Unique Identifiers: UUIDs are used to uniquely identify each todo item.
- Conditional Rendering: The application conditionally renders todos based on their completion status and search term.
- Controlled Components: Inputs are controlled components to handle user input and form submission.

# Implementation Details
The App component handles the core functionality of the application:

1. State Variables:

- todo: Stores the current todo input.
- description: Stores the current description input.
- todos: Stores the list of todos fetched from the backend.
- showFinished: Controls whether to show completed todos.
- searchTerm: Stores the current search term for filtering todos.
- expandedTodoId: Stores the ID of the currently expanded todo for displaying detailed information.
  
2. useEffect Hook:
  
- Fetches todos from the backend server when the component mounts.

3. Event Handlers:

- handleEdit: Handles editing a todo.
- handleDelete: Handles deleting a todo.
- handleChange: Handles changes to the todo input.
- handleDescriptionChange: Handles changes to the description input.
- handleAdd: Handles adding a new todo.
- handleCheckbox: Handles marking a todo as completed.
- toggleFinished: Toggles the visibility of completed todos.
- handleSearch: Handles changes to the search input.
- toggleExpand: Toggles the expansion of a todo item for detailed view.

4.Conditional Rendering:

- Filters todos based on the search term.
- Conditionally renders todos based on their completion status and the search term.

# Setup and Running the Application
To set up and run the application locally, follow these steps:

1. Clone the repository:
   
     ```sh
     git clone https://github.com/Gaurav31052/ToDo-Application.git
     cd ToDo-Application
      ```
2. Install dependencies:
   
      ```sh
     npm install
      ```
3. Set up the backend server:
   
   - Open PowerShell and run command
       ```sh
       Get-ExecutionPolicy
       ```
   - If it is in "RemoteSigned" feel free to proceed. Otherwise, run the command
       ```sh
       Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
       ```
4. Run backend in Localhost:3000
   
     ```sh
      json-server --watch db.json
     ```
5. Run the application:
    
     ```sh
     npm run dev
     ```
6. Make sure the backend and application run parallel

# Notes
- Ensure your backend server is properly configured and running before starting the React application.
- Modify the backend server URL in the axios calls if your server is running on a different URL or port.




