import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hook"; 
import { updateUser } from "@/lib/slices/userSlice";

// ეს კომპონენტი იზრუნებს ტოკენის შემოწმებაზე
function AppInitializer({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //  ვამოწმებთ ტოკენს ორივე საცავში
    const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");

    if (token) {
      //  თუ ტოკენი არსებობს, Redux-ს ვაწვდით ინფორმაციას
      dispatch(updateUser({ 
        username: "Kevin Ryan", 
        isLoggedIn: true 
      }));
    } else {
      //  თუ ტოკენი არ არის, ვაფიქსირებთ რომ ნამდვილად არაა შესული
      dispatch(updateUser({ 
        username: "", 
        isLoggedIn: false 
      }));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AppInitializer>
        {children}
      </AppInitializer>
    </Provider>
  );
}