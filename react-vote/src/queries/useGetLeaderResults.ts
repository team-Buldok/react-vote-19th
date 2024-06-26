import { useQuery } from '@tanstack/react-query';
import { userAPI } from '../api/request';
import { useNavigate } from 'react-router-dom';

export const useGetLeaderResults = (partName: string) => {
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['leaderResults', partName],
    queryFn: async () => {
      const res = await userAPI.getLeaderResults(partName);
      if (res.status === 400) {
        navigate('/login');
        alert('접근오류! 로그인하세요');
      }
      return res.data;
    },
    retry: false, // 에러 발생 시 재시도하지 않도록 설정
  });

  return {
    leaderResults: data?.value || [],
    isLoading,
    error,
    refetch,
  };
};
