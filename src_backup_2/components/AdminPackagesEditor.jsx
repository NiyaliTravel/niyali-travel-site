import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminPackagesEditor() {
  const [packages, setPackages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    fetchPackages();
  }, []);

  async function fetchPackages() {
    const { data } = await supabase.from("packages").select("*");
    setPackages(data);
  }

  async function updatePackage(pkg) {
    await supabase
      .from("packages")
      .update({
        title: pkg.title,
        description: pkg.description,
        image_url: pkg.image_url,
        status: pkg.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pkg.id);
    fetchPackages();
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Admin Package Editor</h2>
      {packages.map(pkg => (
        <div key={pkg.id} style={{ marginBottom: "1rem" }}>
          <input
            value={pkg.title}
            onChange={e => {
              const updated = { ...pkg, title: e.target.value };
              updatePackage(updated);
            }}
            placeholder="Title"
          />
          <input
            value={pkg.description}
            onChange={e => {
              const updated = { ...pkg, description: e.target.value };
              updatePackage(updated);
            }}
            placeholder="Description"
          />
          <input
            value={pkg.image_url}
            onChange={e => {
              const updated = { ...pkg, image_url: e.target.value };
              updatePackage(updated);
            }}
            placeholder="Image URL"
          />
          <select
            value={pkg.status}
            onChange={e => {
              const updated = { ...pkg, status: e.target.value };
              updatePackage(updated);
            }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      ))}
    </div>
  );
}