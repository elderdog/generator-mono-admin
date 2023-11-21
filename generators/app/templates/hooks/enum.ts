import { useQueries } from '@umijs/max'

type EnumResponse = {
  code?: number;
  msg?: string;
  data?: Record<string, any>;
}

type EnumOption = {
  label: string
  value: number | string
}

const useEnum = (types: string[], request: (type: string) => Promise<EnumResponse>): Record<string, EnumOption[]> => {
  const queries = types.map(type => {
    return {
      queryKey: ['enum', type],
      queryFn: () => request(type),
      staleTime: Infinity,
      select: (data: EnumResponse): EnumOption[] => {
        return Object.entries(data.data || {}).map(([key, value]: [string | number, string]) => {
          return { label: value, value: Number(key) }
        })
      }
    }
  })
  const results = useQueries({ queries }) || []
  const dict: Record<string, EnumOption[]> = {}
  results.forEach((result, index) => {
    dict[types[index]] = result.data as EnumOption[]
  })
  return dict
}

export default useEnum
