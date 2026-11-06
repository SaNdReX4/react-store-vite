import { useAppDispatch, useAppSelector } from "@/lib/hook"; 
import { addToCart, decreaseQuantity, deleteFromCart } from "@/lib/slices/cartSlice";
import CartItem from "@/components/CartItem/CartItem";
import { Link } from "react-router-dom";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartProducts);
  const { isLoggedIn } = useAppSelector((state) => state.user || {});

  const updateQty = (id, delta) => {
    const item = cartItems.find((p) => p.id === id);
    if (!item) return;
    if (delta > 0) {
      dispatch(addToCart(item));
    } else {
      dispatch(decreaseQuantity(item));
    }
  };

  const removeItem = (id) => {
    const confirmDelete = confirm("ნამდვილად გსურთ კალათიდან წაშლა?");
    if (confirmDelete) {
      dispatch(deleteFromCart(id));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  //  თუ მომხმარებელი არ არის დალოგინებული
  if (isLoggedIn === false) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-md w-full text-center space-y-8 p-12 rounded-[3rem] bg-white shadow-2xl">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">Access Denied</h2>
            <p className="text-gray-500 font-medium">Please log in to view your shopping cart and continue.</p>
          </div>
          <Link to="/login" className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 uppercase text-xs tracking-[0.2em]">
            Log In Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 pt-16 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* მარცხენა მხარე: პროდუქტების სია */}
        <div className="flex-2 space-y-10">
          <div>
            <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
              Your <span className="text-blue-600">Cart</span>
            </h1>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full"></div>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-[2.5rem] p-24 text-center group">
              <p className="text-gray-400 text-xl font-light mb-8 italic">Your Cart is currently empty...</p>
              <Link to="/" className="inline-block bg-white text-black px-12 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">
                  <tr>
                    <th className="px-4">Product Details</th>
                    <th className="px-4 text-center">Qty</th>
                    <th className="px-4 text-right">Price</th>
                    <th className="px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      updateQty={updateQty} 
                      removeItem={removeItem} 
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* მარჯვენა მხარე: Summary პანელი */}
        {cartItems.length > 0 && (
          <div className="flex-1">
            <div className="bg-white p-10 rounded-[3rem] sticky top-32 shadow-2xl border border-gray-100">
              <h2 className="text-2xl font-black text-black mb-8 uppercase tracking-tighter italic">Summary</h2>
              
              <div className="space-y-6 border-b border-gray-100 pb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="text-black">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Estimated Shipping</span>
                  <span className="text-green-600 font-black uppercase text-[10px] tracking-widest">Free</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Tax</span>
                  <span className="text-black">$0.00</span>
                </div>
              </div>

              <div className="flex justify-between py-8">
                <span className="text-xl font-black text-black uppercase italic">Total</span>
                <span className="text-3xl font-black text-blue-600 tracking-tighter">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 active:scale-95">
                Proceed to Checkout
              </button>
              
              <p className="text-center text-gray-400 text-[10px] mt-6 font-medium uppercase tracking-widest">
                Secure SSL Encryption
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}