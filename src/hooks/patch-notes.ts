import { Note } from '@/core';
import { useState, useEffect } from 'react';

const usePatchNotes = () => {
  const [patchNotes, setPatchNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPatchNotes = async () => {
      try {
        setIsLoading(true);

        // Étape 1 : Récupérer la liste des fichiers
        const response = await fetch('/patch-notes/manifest.json');
        if (!response.ok) {
          throw new Error('Failed to fetch the list of patch notes');
        }

        const files = await response.json();
        if (!Array.isArray(files)) {
          throw new Error('Patch notes list is not an array');
        }

        // Étape 2 : Récupérer le contenu de chaque fichier Markdown
        const notes = [];
        for (const file of files) {
          const res = await fetch(`/patch-notes/${file}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch the content of ${file}`);
          }
          const text = await res.text();
          notes.push({ version: file.replace('.md', ''), text });
        }

        // Une fois toutes les données récupérées, on les stocke dans l'état
        setPatchNotes(notes);
      } catch (error: any) {
        console.error('Failed to fetch patch notes:', error);
        setError(error.getMessage());
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatchNotes(); // Démarrer la récupération des données
  }, []);

  return { patchNotes, isLoading, error };
};

export default usePatchNotes;
