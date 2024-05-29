// components/ProductModal.js

export default function ProductModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 overflow-y-auto max-h-full">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain mb-4 rounded-lg"
        />
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{product.title}</h2>
        <p className="text-xl text-gray-700 font-medium mb-4">${product.price}</p>
        <p className="text-gray-600">{product.description}</p>
      </div>
    </div>
  );
}
