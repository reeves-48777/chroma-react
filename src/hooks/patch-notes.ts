import { Note } from '@/core';
import { useState, useEffect } from 'react';

const baseUrl = import.meta.env.BASE_URL;

const usePatchNotes = () => {
  const [patchNotes, setPatchNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        setIsLoading(true);

        // step 1 : fetch files list
        const response = await fetch(`${baseUrl}patch-notes/manifest.json`, {
          signal,
        });
        if (!response.ok) {
          throw new Error('Failed to fetch the list of patch notes');
        }

        const data = await response.json();
        if (!Array.isArray(data.files)) {
          throw new Error('Patch notes list is not an array');
        }

        const notes = [];
        for (const file of data.files) {
          const res = await fetch(`${baseUrl}patch-notes/${file}`, { signal });
          if (!res.ok) {
            throw new Error(`Failed to fetch the content of ${file}`);
          }

          const text = await res.text();
          notes.push({ version: file.replace('.md', ''), text });
        }

        setPatchNotes(notes);
      } catch (error) {
        if (!signal.aborted) {
          console.error(error);
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort('useEffect: cleaning');
  }, []);

  return { patchNotes, isLoading, isError };
};
export default usePatchNotes;
