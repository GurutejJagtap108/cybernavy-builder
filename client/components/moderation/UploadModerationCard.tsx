import { useRef, useState } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/ui/button";

interface LocalFile {
  id: string;
  file: File;
  url: string;
  status: "pending" | "uploaded" | "error";
}

export default function UploadModerationCard() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<LocalFile[]>([]);
  const onPick = (fList: FileList | null) => {
    if (!fList) return;
    const arr = Array.from(fList).filter((f) =>
      /^(image|video)\//.test(f.type),
    );
    const mapped: LocalFile[] = arr.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      url: URL.createObjectURL(f),
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...mapped]);
  };
  const upload = async () => {
    try {
      // Stub: send metadata only; backend integration goes here
      const payload = files.map((f) => ({
        name: f.file.name,
        type: f.file.type,
        size: f.file.size,
      }));
      const res = await fetch("/api/moderation/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      });
      if (!res.ok) throw new Error("upload failed");
      setFiles((prev) => prev.map((f) => ({ ...f, status: "uploaded" })));
    } catch {
      setFiles((prev) => prev.map((f) => ({ ...f, status: "error" })));
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Content Moderation</h2>
        <div className="text-xs text-foreground/60">Images & Videos</div>
      </div>
      <div className="border border-dashed border-white/15 rounded-lg p-4 bg-white/5 text-sm">
        <p className="text-foreground/70">
          Upload assets for review. Supported: images, videos.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => onPick(e.target.files)}
          />
          <Button variant="outline" onClick={() => inputRef.current?.click()}>
            Select files
          </Button>
          <Button
            onClick={upload}
            disabled={!files.length}
            className="bg-gradient-to-tr from-cyan-500 to-teal-400 text-white"
          >
            Send to backend
          </Button>
        </div>
      </div>
      {!!files.length && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {files.map((f) => (
            <div
              key={f.id}
              className="rounded-lg overflow-hidden border border-white/10"
            >
              {/^image\//.test(f.file.type) ? (
                <img
                  src={f.url}
                  alt={f.file.name}
                  className="w-full h-28 object-cover"
                />
              ) : (
                <video src={f.url} className="w-full h-28 object-cover" />
              )}
              <div className="px-2 py-1 text-xs flex items-center justify-between bg-white/5">
                <span className="truncate max-w-[70%]" title={f.file.name}>
                  {f.file.name}
                </span>
                <span
                  className={
                    {
                      pending: "text-amber-300",
                      uploaded: "text-emerald-300",
                      error: "text-red-300",
                    }[f.status]
                  }
                >
                  • {f.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3 text-xs text-foreground/60">
        Policy tags, reviewer workflow, and auto‑actions will be wired to your
        backend.
      </div>
    </Card>
  );
}
