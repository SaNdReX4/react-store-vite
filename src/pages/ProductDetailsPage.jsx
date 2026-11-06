import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook"; 
import { addToCart } from "@/lib/slices/cartSlice";
import StarRating from "@/components/StarRating";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [showToast, setShowToast] = useState(false); //  სტეიტი შეტყობინებისთვის, შემოვიტანე რო იმუშაოს თორე აქამდე არ მუშაობდა 
  const dispatch = useAppDispatch();
  const router = useNavigate();

  const { isLoggedIn } = useAppSelector((state) => state.user || {});

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAction = () => {
    if (isLoggedIn) {
      dispatch(addToCart(product));
      
      // აქ alert-ის ნაცვლად არის Toast-ს
      setShowToast(true);
      
      // 2 წამში თავისით გაქრება
      setTimeout(() => {
        setShowToast(false);
      }, 2000);

    } else {
      router("/login");
    }
  };

  if (!product) return <div className="p-20 text-center text-white">იტვირთება...</div>;

  return (
    <div className="pt-12.5 pb-8 px-6 relative"> {/* დავამატე relative */}
      
      {/* Toast შეტყობინება, რომელიც თავისით ქრება */}
      {showToast && (
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          ✅ პროდუქტი დაემატა კალათაში!
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-12 items-start mb-10">
        
        <div className="w-full md:w-5/12 flex justify-center items-center border border-gray-100 rounded-xl p-8 bg-white">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-100 object-contain hover:scale-105 transition-transform duration-300" 
          />
        </div>

        <div className="w-full md:w-7/12 flex flex-col">
          <p className="text-blue-500 font-bold uppercase text-[10px] tracking-[0.15em] mb-2">{product.category}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">{product.title}</h1>

          <div className="flex items-center gap-3 mb-6">
            <StarRating rate={product.rating?.rate} />
            <span className="text-gray-400 text-xs font-medium">({product.rating?.count} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-6">${product.price}</p>

          <div className="mb-8">
            <h3 className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-widest italic">Description</h3>
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-gray-200 mb-8">
              <p className="text-gray-600 leading-relaxed text-sm md:text-base italic">{product.description}</p>
            </div>

            <button
              onClick={handleAction}
              className="w-full md:w-max bg-black text-white px-12 py-4 rounded-full font-bold hover:bg-gray-800 transition-all uppercase text-xs tracking-widest"
            >
              {isLoggedIn ? "Add to Cart" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}