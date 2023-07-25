import { createContext, useEffect, useReducer } from "react";
import { ProjectAuth } from "../firebase/config";

// Create a new context for authentication
export const AuthContext = createContext();

// Reducer function for authentication state management
export const authReducer = (state, action) => {
  switch (action.type) {
    // Add cases for different actions if needed
    // For example, handling login, logout, or updating user information
    case "LOGIN":
      console.log("Logged in successfully")
      return { ...state, user: action.payload }

    //when the user is logged out the user state is null again
    case "LOGOUT":
      // ...state --> current state property
      console.log("logout successfully")
      return { ...state, user: null }

      case "AUTH_IS_READY":
        return { ...state, user: action.payload,authIsReady:true }

    default:
      return state;
  }
};

// AuthContextProvider component to provide the authentication state to its children
export const AuthContextProvider = ({ children }) => {
  /* Inside the AuthContextProvider, the useReducer hook is used to initialize the state using the authReducer function. The initial state is an object with a user property set to null.*/

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false // we want to know weather we are login in before rendering the content 

  });
  // initally user is set null 
  useEffect(() => {
    const unsub = ProjectAuth.onAuthStateChanged((user) => {
      dispatch({
        type: 'AUTH_IS_READY', payload: user

      }) })
      // go to notebook for better understanding
      unsub()
    }, [])
    console.log("AuthContext state:", state)

    return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
    }


/*
The code imports createContext and useReducer from the react package. These are used to create a context and manage state with a reducer function.

The AuthContext is created using the createContext() function. This context will be used to share the authentication state and dispatch function with other components in the application.

The authReducer function is defined. This is the reducer function responsible for managing the authentication state. Currently, it is a simple switch statement with a default case that returns the current state.

The AuthContextProvider component is created. This component wraps its children with the AuthContext.Provider, making the authentication state and the dispatch function available to its descendants.

Inside the AuthContextProvider, the useReducer hook is used to initialize the state using the authReducer function. The initial state is an object with a user property set to null.

The AuthContext.Provider component is rendered, providing the combined state (...state) and the dispatch function as the value. This allows any components nested within AuthContextProvider to access and use the authentication state and dispatch actions.

The children components are rendered within the AuthContext.Provider component. These components can access the authentication state and dispatch actions by using the useContext hook with AuthContext.

In summary, this code sets up a context (AuthContext) and a reducer function (authReducer) to manage the authentication state. The AuthContextProvider component uses the reducer and the useReducer hook to initialize the state and provide the state and dispatch function to its descendant components. This allows components within the AuthContextProvider to access and update the authentication state in a predictable and centralized manner.






*/

/* 
 
                    HOW DOES REDUCER WORKS? 

A reducer is a function that takes in the current state and an action, and returns the new state. It follows a predictable pattern to manage state changes in an application.

In the context of React, a reducer is often used in combination with the `useReducer` hook to manage complex state logic. Here's an overview of how a reducer works:

1. State Initialization: You start by initializing the state with an initial value. In the code you provided, the initial state is `{ user: null }`.

2. Action Dispatch: Actions are dispatched to trigger state updates. An action is an object that describes the type of update you want to perform. For example, it could be `{ type: 'LOGIN', payload: { user: 'John' } }`. The `type` property is a string that identifies the action type, and `payload` is optional data associated with the action.

3. Reducer Function: The reducer function receives the current state and the action as arguments. It examines the action type and performs the necessary updates on the state. The reducer function should always return a new state object, without mutating the original state.

4. State Update: When the reducer function returns a new state, React will trigger a re-render of the components that depend on that state. This allows the updated state to propagate down the component tree.

5. Switch Statement: Typically, a switch statement is used inside the reducer function to handle different action types. Each case in the switch statement corresponds to a different type of action and defines how the state should be updated for that action. You can add as many cases as needed based on the requirements of your application.

6. Default Case: It's important to include a default case in the switch statement to handle any unknown or unhandled action types. The default case simply returns the current state without making any changes.

By following this pattern, a reducer provides a predictable and centralized way to manage state updates in an application. It helps maintain a clear separation of concerns and makes it easier to reason about state changes.
*/

