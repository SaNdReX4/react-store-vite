
export default function CartItem({ item, updateQty, removeItem }) {
  return (
    <tr className="border-b">
      <td className="py-6 flex items-center gap-4">
        <img src={item.image} className="w-20 h-20 object-contain" alt={item.title} />
        <div>
          <p className="font-medium text-sm max-w-50 truncate">{item.title}</p>
          <p className="text-gray-400 text-xs italic">In Stock</p>
        </div>
      </td>
      <td className="py-6 text-center">
        <div className="flex items-center justify-center gap-3 border rounded-lg w-fit mx-auto px-2 py-1 bg-gray-50">
          <button onClick={() => updateQty(item.id, -1)} className="text-black hover:text-blue-600 px-2">-</button>
          <span className="w-6 text-center text-black">{item.quantity}</span>
          <button onClick={() => updateQty(item.id, 1)} className="text-black hover:text-blue-600 px-2">+</button>
        </div>
      </td>
      <td className="py-6 text-right font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </td>
      <td className="py-6 text-right">
        <button 
          onClick={() => removeItem(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors text-xl px-4"
          title="წაშლა"
        >
          🗑
        </button>
      </td>
    </tr>
  );
}