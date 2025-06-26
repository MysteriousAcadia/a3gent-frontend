import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../../components/Sidebar";
import { User, PlusCircle, FilePlus, LayoutDashboard } from "lucide-react";

const mockApiStats = {
  calls: 1234,
  revenue: 2.34, // ETH or USD, placeholder
};

const mockApis = [
  { name: "Weather API", price: "0.01 ETH", calls: 500, created: "2025-06-01" },
  {
    name: "Crypto Prices",
    price: "0.02 ETH",
    calls: 734,
    created: "2025-06-10",
  },
];

const mockFiles = [
  {
    name: "Premium Guide.pdf",
    price: "0.005 ETH",
    downloads: 120,
    created: "2025-06-05",
  },
  {
    name: "AI Prompt Pack.zip",
    price: "0.008 ETH",
    downloads: 80,
    created: "2025-06-12",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  // Placeholder for account address
  const account = "0x1234...abcd";

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
      <Sidebar />
      <main className="flex-1 flex flex-col md:flex-row gap-8 p-12 md:ml-64 w-full">
        {/* API Stats Section */}
        <section className="flex-1 bg-zinc-900/80 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center min-w-[300px] mb-8 md:mb-0">
          <div className="text-4xl font-bold text-white mb-2">
            {mockApiStats.calls}
          </div>
          <div className="text-zinc-400 mb-4">API Calls</div>
          <div className="text-2xl font-bold text-fuchsia-400 mb-1">
            {mockApiStats.revenue} ETH
          </div>
          <div className="text-zinc-400">Total Revenue</div>
        </section>
        {/* APIs Table */}
        <section className="flex-1 bg-zinc-900/80 rounded-3xl shadow-2xl p-8 min-w-[350px] overflow-x-auto">
          <h3 className="text-xl font-bold text-white mb-4">Your APIs</h3>
          <table className="w-full text-left text-zinc-200">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Calls</th>
                <th className="py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {mockApis.map((api, i) => (
                <tr
                  key={i}
                  className="border-b border-zinc-800 hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="py-2">{api.name}</td>
                  <td className="py-2">{api.price}</td>
                  <td className="py-2">{api.calls}</td>
                  <td className="py-2">{api.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Files Table */}
        <section className="flex-1 bg-zinc-900/80 rounded-3xl shadow-2xl p-8 min-w-[350px] overflow-x-auto">
          <h3 className="text-xl font-bold text-white mb-4">Your Files</h3>
          <table className="w-full text-left text-zinc-200">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Downloads</th>
                <th className="py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {mockFiles.map((file, i) => (
                <tr
                  key={i}
                  className="border-b border-zinc-800 hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="py-2">{file.name}</td>
                  <td className="py-2">{file.price}</td>
                  <td className="py-2">{file.downloads}</td>
                  <td className="py-2">{file.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
