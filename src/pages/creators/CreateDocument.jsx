import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import DocumentForm from "../../components/DocumentForm";
import { useNavigate } from "react-router";

export default function CreateDocument() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("categories", JSON.stringify(data.categories));
      formData.append("file", data.file);
      formData.append("price", data.price);
      // Replace with your actual REST endpoint
      await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });
      window.alert("Document created successfully!");
      navigate("/creators/dashboard");
    } catch (err) {
      window.alert("Failed to create document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center md:ml-64 p-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-white mb-8">
            Create New Document
          </h1>
          <DocumentForm onSubmit={handleCreate} loading={loading} />
        </div>
      </main>
    </div>
  );
}
