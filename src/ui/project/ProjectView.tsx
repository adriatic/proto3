import { useEffect, useRef, useState } from "react";
import { rendererLog } from "../supervisor/rendererLog";

export function ProjectView() {
  const [files, setFiles] = useState<string[]>([]);
  const contextDetected = useRef(false);

  // TEMPORARY stand-in for real project loading
  useEffect(() => {
    // This will later be replaced by real filesystem logic
    setFiles(["README.md", "package.json"]);
  }, []);

  useEffect(() => {
    if (contextDetected.current) return;
    if (files.length === 0) return;

    contextDetected.current = true;

    rendererLog("info", "PACT context detected", {
      behavior: "context_detected",
      contextType: "project",
      fileCount: files.length,
    });
  }, [files]);

  return (
    <div>
      <p>Project loaded with {files.length} files.</p>
    </div>
  );
}
