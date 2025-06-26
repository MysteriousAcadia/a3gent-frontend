import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ApiForm from "../../components/ApiForm";
import { useNavigate } from "react-router";
import { addTool } from "../../utils/axios";

function inferType(value) {
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object" && value !== null) return "object";
  return "string";
}

function buildResponseSchema(sampleJson) {
  let parsed;
  try {
    parsed =
      typeof sampleJson === "string" ? JSON.parse(sampleJson) : sampleJson;
  } catch {
    return { structure: {}, description: "" };
  }
  function traverse(obj) {
    if (typeof obj !== "object" || obj === null) return inferType(obj);
    if (Array.isArray(obj)) return "array";
    const out = {};
    for (const key in obj) {
      out[key] = traverse(obj[key]);
    }
    return out;
  }
  return {
    structure: traverse(parsed),
    description: "Response structure inferred from sample JSON.",
  };
}

export default function CreateAPI() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    setLoading(true);
    try {
      // Transform payload
      const payload = {
        name: data.title,
        description: data.description,
        category: data.category,
        apiConfig: {
          endpoint: data.url,
          method: "GET",
          timeout: Number(data.timeout) || 5000,
        },
        parameters: data.params.map(
          ({ name, type, required, description, defaultValue }) => ({
            name,
            type,
            required,
            description,
            ...(defaultValue ? { defaultValue } : {}),
          })
        ),
        responseSchema: buildResponseSchema(data.sampleJson),
        pricing: {
          costInWei: (Number(data.price) * 1e18).toString(),
        },
        metadata: {
          tags: data.categories,
          isPublic: true,
        },
      };
      await addTool(payload);
      window.alert("API created successfully!");
      navigate("/creators/dashboard");
    } catch (err) {
      window.alert("Failed to create API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center md:ml-64 p-8">
        <div className="w-full ">
          <h1 className="text-3xl font-bold text-white mb-8">Create New API</h1>
          <ApiForm onSubmit={handleCreate} loading={loading} />
        </div>
      </main>
    </div>
  );
}
