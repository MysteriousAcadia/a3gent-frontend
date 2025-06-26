import React, { useState, useRef } from "react";

const CATEGORY_OPTIONS = [
  "AI",
  "Guide",
  "Finance",
  "Health",
  "Productivity",
  "Data",
  "Crypto",
  "ML",
  "Utility",
];

export default function DocumentForm({ onSubmit, loading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const handleCategoryChange = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file.");
    onSubmit({ title, description, categories, file, price });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-2xl bg-zinc-900/80 p-8 rounded-2xl shadow-2xl"
    >
      <div>
        <label className="block text-zinc-200 font-semibold mb-1">Title</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="text-xs text-zinc-400 mt-1">
          A short, descriptive name for your document.
        </div>
      </div>
      <div>
        <label className="block text-zinc-200 font-semibold mb-1">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />
        <div className="text-xs text-zinc-400 mt-1">
          Explain what your document contains and its main value.
        </div>
      </div>
      <div>
        <label className="block text-zinc-200 font-semibold mb-1">
          Categories/Tags
        </label>
        <div className="flex flex-wrap gap-2 mt-1">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                categories.includes(cat)
                  ? "bg-fuchsia-600 text-white border-fuchsia-600"
                  : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
              }`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-xs text-zinc-400 mt-1">
          Select one or more relevant categories.
        </div>
      </div>
      <div>
        <label className="block text-zinc-200 font-semibold mb-1">
          Upload File
        </label>
        <div
          className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors duration-200 cursor-pointer ${
            dragActive
              ? "border-fuchsia-500 bg-zinc-800/60"
              : "border-zinc-700 bg-zinc-800"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            required={!file}
          />
          {file ? (
            <span className="text-zinc-200">{file.name}</span>
          ) : (
            <span className="text-zinc-400 text-sm">
              Drag & drop your document here, or click to select a file
            </span>
          )}
        </div>
        <div className="text-xs text-zinc-400 mt-1">
          Upload your document (PDF, ZIP, etc.).
        </div>
      </div>
      <div>
        <label className="block text-zinc-200 font-semibold mb-1">
          Price (ETH)
        </label>
        <input
          type="number"
          step="0.0001"
          min="0"
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <div className="text-xs text-zinc-400 mt-1">
          Set the price to unlock this document (in ETH).
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg text-lg disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
