export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 px-10 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-6 text-sm text-gray-600 font-medium">
          <span className="hover:underline cursor-pointer">Conditions of Use</span>
          <span className="hover:underline cursor-pointer">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
        </div>
        <p className="text-sm text-gray-500">
          © 1996-2021, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
}