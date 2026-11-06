export default function StarRating({ rate }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index} className={index < Math.round(rate) ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    );
  });
  return <div className="flex">{stars}</div>;
}