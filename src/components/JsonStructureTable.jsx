import React from "react";

export default function JsonStructureTable({ json }) {
  if (!json) return null;
  let parsed;
  try {
    parsed = typeof json === "string" ? JSON.parse(json) : json;
  } catch {
    return <div className="text-xs text-red-400">Invalid JSON</div>;
  }
  const rows = [];
  function traverse(obj, path = "", depth = 0) {
    if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        const value = obj[key];
        const type = Array.isArray(value)
          ? "Array"
          : typeof value === "object"
          ? "Object"
          : typeof value;
        rows.push({
          name: path ? `${path}.${key}` : key,
          type,
          example: Array.isArray(value)
            ? JSON.stringify(value[0] ?? "")
            : typeof value === "object"
            ? "{...}"
            : value,
          depth,
        });
        if (typeof value === "object" && value !== null) {
          traverse(value, path ? `${path}.${key}` : key, depth + 1);
        }
      }
    }
  }
  traverse(parsed);
  return (
    <table className="w-full text-left text-zinc-200 text-xs border border-zinc-700 rounded-lg overflow-hidden">
      <thead className="bg-zinc-800">
        <tr>
          <th className="py-2 px-3">Field</th>
          <th className="py-2 px-3">Type</th>
          <th className="py-2 px-3">Example</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-zinc-700">
            <td className="py-1 px-3 font-mono">
              <span style={{ paddingLeft: `${row.depth * 16}px` }}>{row.name}</span>
            </td>
            <td className="py-1 px-3">{row.type}</td>
            <td className="py-1 px-3 font-mono truncate max-w-[200px]">{String(row.example)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
