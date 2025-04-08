
import { useState, useEffect } from 'react';
import { fetchData, addDocument } from '@/config/database';
import { useToast } from '@/hooks/use-toast';

export function useCollection<T>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchData<T>(collectionName);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        toast({
          title: "Error",
          description: `Failed to load data from ${collectionName}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [collectionName, toast]);

  const addItem = async (item: T): Promise<string | null> => {
    try {
      setLoading(true);
      const id = await addDocument(collectionName, item);
      // Update local state with the new item (assuming id is added by the backend)
      setData(prev => [...prev, { ...item, id } as T]);
      toast({
        title: "Success",
        description: "Item added successfully",
      });
      return id;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, addItem };
}

export function useDocument<T>(collectionName: string, documentId: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadDocument = async () => {
      if (!documentId) {
        setData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // This would be replaced with actual single document fetch
        const results = await fetchData<T>(`${collectionName}/${documentId}`);
        if (results.length > 0) {
          setData(results[0]);
        } else {
          setData(null);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        toast({
          title: "Error",
          description: `Failed to load document ${documentId}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [collectionName, documentId, toast]);

  return { data, loading, error };
}
