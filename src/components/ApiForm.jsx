import React, { useState } from "react";

const CATEGORY_OPTIONS = [
  "AI",
  "Weather",
  "Finance",
  "Health",
  "Productivity",
  "Data",
  "Crypto",
  "ML",
  "Utility",
];

export default function ApiForm({ onSubmit, loading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [documentation, setDocumentation] = useState("");
  const [price, setPrice] = useState("");

  const handleCategoryChange = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      categories,
      documentation,
      price,
    });
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
          A short, descriptive name for your API.
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
          Explain what your API does and its main features.
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
          API Documentation
        </label>
        <textarea
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          value={documentation}
          onChange={(e) => setDocumentation(e.target.value)}
          rows={5}
          required
        />
        <div className="text-xs text-zinc-400 mt-1">
          Describe endpoints, parameters, authentication, and usage examples.
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
          Set the price to unlock this API (in ETH).
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
