import { useRouter } from 'next/navigation';

export const useSearchHandler = () => {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/tweets/search?query=${encodeURIComponent(query || ' ')}`);
  };

  return handleSearch;
};