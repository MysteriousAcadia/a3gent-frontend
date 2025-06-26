import React, { useState } from "react";
import JsonStructureTable from "./JsonStructureTable";

const CATEGORY_OPTIONS = [
  {
    name: "AI",
    tags: ["machine learning", "nlp", "vision", "chatbot", "automation"],
  },
  {
    name: "Weather",
    tags: ["forecast", "temperature", "humidity", "climate", "alerts"],
  },
  {
    name: "Finance",
    tags: ["stocks", "crypto", "forex", "investment", "banking"],
  },
  {
    name: "Health",
    tags: ["fitness", "nutrition", "wellness", "medical", "tracking"],
  },
  {
    name: "Productivity",
    tags: ["calendar", "tasks", "notes", "reminders", "workflow"],
  },
  {
    name: "Data",
    tags: ["analytics", "big data", "visualization", "storage", "processing"],
  },
  {
    name: "Crypto",
    tags: ["blockchain", "wallet", "token", "defi", "nft"],
  },
  {
    name: "ML",
    tags: ["model", "training", "inference", "dataset", "pipeline"],
  },
  {
    name: "Utility",
    tags: ["conversion", "tools", "api", "integration", "misc"],
  },
];

export default function ApiForm({ onSubmit, loading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]); // tags
  const [category, setCategory] = useState(""); // single select
  const [tags, setTags] = useState([]);
  const [url, setUrl] = useState("");
  const [params, setParams] = useState([]);
  const [sampleJson, setSampleJson] = useState("");
  const [price, setPrice] = useState("");
  const [timeout, setTimeout] = useState(5000);

  const handleCategoryChange = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Extract params from URL
  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    // Find all {param} in the URL
    const matches = Array.from(value.matchAll(/\{(.*?)\}/g));
    const paramNames = matches.map((m) => m[1]);
    setParams((prev) => {
      // Keep existing param info if name matches, else add new
      return paramNames.map(
        (name) =>
          prev.find((p) => p.name === name) || {
            name,
            type: "string",
            required: true,
            description: "",
            defaultValue: "",
          }
      );
    });
  };

  const handleParamChange = (i, field, value) => {
    setParams((prev) =>
      prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p))
    );
  };

  const handleTagChange = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      categories: tags,
      category,
      url,
      params,
      sampleJson,
      price,
      timeout,
    });
  };

  const selectedCategory = CATEGORY_OPTIONS.find((c) => c.name === category);
  const availableTags = selectedCategory ? selectedCategory.tags : [];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full bg-zinc-900/80 p-8 rounded-2xl shadow-2xl"
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
          Category
        </label>
        <select
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setTags([]); // reset tags on category change
          }}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <div className="text-xs text-zinc-400 mt-1">
          Choose the main category for your API.
        </div>
      </div>
      {category && (
        <div>
          <label className="block text-zinc-200 font-semibold mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {availableTags.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                  tags.includes(tag)
                    ? "bg-fuchsia-600 text-white border-fuchsia-600"
                    : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
                }`}
                onClick={() => handleTagChange(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="text-xs text-zinc-400 mt-1">
            Select one or more relevant tags.
          </div>
        </div>
      )}
      <div>
        <label className="block text-zinc-200 font-semibold mb-1">
          API URL
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-mono"
          value={url}
          onChange={handleUrlChange}
          placeholder="e.g. https://api.example.com/user/{userId}/posts/{postId}"
          required
        />
        <div className="text-xs text-zinc-400 mt-1">
          Use curly braces for parameters, e.g. /user/{"{userId}"}
        </div>
      </div>
      {params.length > 0 && (
        <div>
          <label className="block text-zinc-200 font-semibold mb-1">
            Parameters
          </label>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-zinc-200 text-xs border border-zinc-700 rounded-lg overflow-hidden">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Required</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3">Default</th>
                </tr>
              </thead>
              <tbody>
                {params.map((param, i) => (
                  <tr key={param.name} className="border-b border-zinc-700">
                    <td className="py-1 px-3 font-mono">{param.name}</td>
                    <td className="py-1 px-3">
                      <select
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs"
                        value={param.type}
                        onChange={(e) =>
                          handleParamChange(i, "type", e.target.value)
                        }
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                      </select>
                    </td>
                    <td className="py-1 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={param.required}
                        onChange={(e) =>
                          handleParamChange(i, "required", e.target.checked)
                        }
                      />
                    </td>
                    <td className="py-1 px-3">
                      <input
                        type="text"
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs w-full"
                        value={param.description}
                        onChange={(e) =>
                          handleParamChange(i, "description", e.target.value)
                        }
                      />
                    </td>
                    <td className="py-1 px-3">
                      <input
                        type={param.type === "number" ? "number" : "text"}
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-xs w-full"
                        value={param.defaultValue}
                        onChange={(e) =>
                          handleParamChange(i, "defaultValue", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-zinc-200 font-semibold mb-1">
            Sample JSON Output
          </label>
          <textarea
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-mono"
            value={sampleJson}
            onChange={(e) => setSampleJson(e.target.value)}
            rows={6}
            placeholder="Paste a sample JSON response here"
            required
          />
          <div className="text-xs text-zinc-400 mt-1">
            Paste a sample JSON output to visualize the response structure.
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-zinc-200 font-semibold mb-1">
            Response Structure
          </label>
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 min-h-[180px] max-h-60 overflow-auto">
            <JsonStructureTable json={sampleJson} />
          </div>
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
