import {
  ReactElement,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type HarvestContextType = {
  fruits: FruitsState;
  getFruits(index: number): Promise<void>;
  deleteFruit(fruitId: string): Promise<void>;
  // postFruit(): Promise<void>;
  dictionary: DictionaryState;
};

type FruitsState = {
  data: Fruit[];
  pagination: Pagination;
  loading: boolean;
};

type DictionaryState = {
  categories: DictionaryItem[];
  freshnesses: DictionaryItem[];
  weight_units: DictionaryItem[];
};

type DictionaryItem = {
  name: string;
  key: string;
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
  page: number;
  size: number;
  items_total: number;
  pages_total: number;
};

type ResponseFruits = {
  data: Fruit[];
  pagination: Pagination;
};

type ResponseDictionary = {
  data: DictionaryState;
};

const HarvestContext = createContext<HarvestContextType | undefined>(undefined);

export const HarvestProvider = ({ children }: { children: ReactElement }) => {
  const [fruits, setFruits] = useState<FruitsState>({
    data: [],
    pagination: { page: 0, size: 10, items_total: 0, pages_total: 0 },
    loading: true,
  });

  const [dictionary, setDictionary] = useState<DictionaryState>({
    categories: [],
    freshnesses: [],
    weight_units: [],
  });

  const [fruit, setFruit] = useState<Fruit>();

  async function getFruits(index: number) {
    setFruits((prev) => {
      return { ...prev, loading: true };
    });
    const response = await fetch(
      `https://wolm.onrender.com/harvests?page=${index}&size=5&sort_by=amount&sort_order=asc`
    );
    if (response.ok === true) {
      const harvest: ResponseFruits = await response.json();
      setFruits({
        data: harvest.data,
        pagination: harvest.pagination,
        loading: false,
      });
    } else {
      setFruits((prev) => {
        return { ...prev, loading: false };
      });
      alert("Nie udało sie pobrać danych !");
    }
  }

  async function deleteFruit(fruitId: string) {
    await fetch(`https://wolm.onrender.com/harvests/${fruitId}`, {
      method: "DELETE",
    });

    return;
  }

  async function getDictionary() {
    const responseDictionary = await fetch(
      `https://wolm.onrender.com/harvests-dictionary`
    );
    const dictionary: ResponseDictionary = await responseDictionary.json();
    setDictionary({
      categories: dictionary.data.categories,
      freshnesses: dictionary.data.freshnesses,
      weight_units: dictionary.data.weight_units,
    });
  }

  // async function postFruit() {
  //   const response = await fetch(`https://wolm.onrender.com/harvests`, {
  //     method: "POST",
  //   });
  // }

  useEffect(() => {
    getFruits(0);
    getDictionary();
  }, []);

  useEffect(() => {
    if (fruits.data.length === 0 && fruits.pagination.pages_total > 0) {
      getFruits(fruits.pagination.pages_total - 1);
    }
  }, [fruits.data.length, fruits.pagination.pages_total]);

  return (
    <HarvestContext.Provider
      value={{ fruits, getFruits, deleteFruit, dictionary }}
    >
      {children}
    </HarvestContext.Provider>
  );
};

export const useHarvest = () =>
  useContext(HarvestContext) as HarvestContextType;
