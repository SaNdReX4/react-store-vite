import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { logout } from "@/lib/slices/userSlice";
import { clearCart } from "@/lib/slices/cartSlice"; //  კალათის გასუფთავების ექშენი
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const dispatch = useAppDispatch();
  const router = useNavigate();
  
  const { isLoggedIn } = useAppSelector((state) => state.user || {});

  useEffect(() => {
    // თუ სტატუსი ჯერ კიდევ null-ია (იტვირთება), დაველოდოთ
    if (isLoggedIn === null) return;

    if (isLoggedIn === false) {
      router("/login");
      return;
    }

    fetch("https://fakestoreapi.com/users/3")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [isLoggedIn, router]);

  const handleLogout = () => {
    dispatch(logout());    // Redux-ის (User) და LocalStorage-ის გასუფთავება
    dispatch(clearCart()); //  კალათის (Cart) გასუფთავება
    
    // ასევე წავშალოთ redirect ნიშანი, რომ შემდეგი შესვლა იყოს "სუფთა"
    sessionStorage.removeItem("initialRedirect");
    
    router("/login");
  };

  if (isLoggedIn === null || !user) return <div className="p-20 text-center">იტვირთება...</div>;

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border">
        <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-blue-600">
          {user.name?.firstname[0].toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-center capitalize">
          {user.name?.firstname} {user.name?.lastname}
        </h2>
        <div className="mt-6 space-y-3 text-gray-600">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>City:</strong> {user.address?.city}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all uppercase text-xs tracking-widest"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}