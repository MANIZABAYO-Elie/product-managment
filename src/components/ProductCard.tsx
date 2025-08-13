// import { Link } from "react-router";
// import type { Product } from "../types/products";
// import Button from "./Button";

// export default function ProductCard({ p, onEdit, onDelete }: { p: Product; onEdit: (p: Product) => void; onDelete: (p: Product) => void }) {
//   return (
//     <div className="rounded-2xl  bg-gray-50 p-4 shadow-sm">
//       {p.thumbnail ? (
//         <img src={p.thumbnail} alt={p.title} className="mb-3 h-40 w-full rounded-lg object-cover" />
//       ) : (
//         <div className="mb-3 h-40 w-full rounded-lg bg-[#f4f4f4]" />
//       )}
//       <div className="bg-white">

//         <div className=" mb-2 text-sm text-gray-500">{p.category}</div>
//         <h3 className=" mb-1 line-clamp-1 text-base font-semibold">{p.title}</h3>
//         <div className="  mb-3 text-lg font-bold">${p.price}</div>
//         <div className="  flex items-center gap-2">
//           <Link to={`/products/${p.id}`} className="text-blue-600 underline">View</Link>
//           <Button variant="secondary" onClick={() => onEdit(p)}>Edit</Button>
//           <Button variant="danger" onClick={() => onDelete(p)}>Delete</Button>
//         </div>
//       </div>

//     </div>
//   );
// }


import { Link } from "react-router";
import type { Product } from "../types/products";
import Button from "./Button";

export default function ProductCard({
  p,
  onEdit,
  onDelete,
}: {
  p: Product;
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}) {
  return (
    <div
      className="rounded-2xl bg-gray-50 p-4 shadow-sm hover:shadow-lg 
                 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
      {p.thumbnail ? (
        <img
          src={p.thumbnail}
          alt={p.title}
          className="mb-3 h-40 w-full rounded-lg object-cover 
                     transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div className="mb-3 h-40 w-full rounded-lg bg-gray-100" />
      )}

      <div className="bg-white rounded-xl p-3 shadow-inner">
        <div className="mb-2 inline-block px-3 py-1 text-xs font-medium 
                        rounded-full bg-blue-100 text-blue-700">
          {p.category}
        </div>

        <h3
          className="mb-1 line-clamp-1 text-base font-semibold text-gray-800 
                     hover:text-blue-600 transition-colors duration-200"
        >
          {p.title}
        </h3>

        <div className="mb-3 text-lg font-bold text-green-600">${p.price}</div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/products/${p.id}`}
            className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200"
          >
            View
          </Link>
          <Button
            variant="secondary"
            className="transition-transform duration-200 hover:scale-105"
            onClick={() => onEdit(p)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="transition-transform duration-200 hover:scale-105"
            onClick={() => onDelete(p)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
