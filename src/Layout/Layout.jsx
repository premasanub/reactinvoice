import { Link } from "react-router";
export default function Layout({ children }) {
  return (
    <div classname="flex h-screen bg-gray-100">
  <aside classname="w-64 bg-white shadow-md p-5">
    <h2 classname="text-2xl font-bold mb-6">Invoice PRO</h2>
    <nav>
      <Link to="/" classname="block py-2 text-gray-700 hover:text-black">
        Edit Invoice
      </Link>
      <Link to="/company" classname="block py-2 text-gray-700 hover:text-black">
        company
      </Link>
      
    </nav>
  </aside>
  <main classname="flex-1 p-8 overflow-auto">{children}</main>
</div>

  );
}
