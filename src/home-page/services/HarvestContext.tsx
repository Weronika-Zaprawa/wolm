import {
  ReactElement,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type HarvestContextType = {
  fruits: FruitsState;
  getFruits(): Promise<void>;
};

type FruitsState = {
  data: Fruit[];
  pagination: Pagination;
  loading: boolean;
};

type Fruit = {
  id: string;
  name: string;
  variety: string;
  category: string;
  additional_information: string;
  harvest_date: string;
  freshness: string;
  amount: number;
  amount_unit: string;
};

type Pagination = {
  index: number;
  size: number;
  items_total: number;
  pages_total: number;
};

type ResponseFruits = {
  data: Fruit[];
  pagination: Pagination;
};

const HarvestContext = createContext<HarvestContextType | undefined>(undefined);

export const HarvestProvider = ({ children }: { children: ReactElement }) => {
  const [fruits, setFruits] = useState<FruitsState>({
    data: [],
    pagination: { index: 0, size: 10, items_total: 0, pages_total: 0 },
    loading: true,
  });

  async function getFruits() {
    setFruits((prev) => {
      return { ...prev, loading: true };
    });
    const response = await fetch(
      "https://wolm.onrender.com/harvests?page=0&size=10&sort_by=amount&sort_order=asc"
    );
    const harvest: ResponseFruits = await response.json();
    setFruits({
      data: harvest.data,
      pagination: harvest.pagination,
      loading: false,
    });
  }

  useEffect(() => {
    getFruits();
  }, []);

  return (
    <HarvestContext.Provider value={{ fruits, getFruits }}>
      {children}
    </HarvestContext.Provider>
  );
};

export const useHarvest = () =>
  useContext(HarvestContext) as HarvestContextType;
