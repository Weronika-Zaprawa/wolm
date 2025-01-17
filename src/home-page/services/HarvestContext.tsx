import {
  ReactElement,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";

type HarvestContextType = {
  fruits: FruitsState;
  getFruits(index: number): Promise<void>;
  deleteFruit(fruitId: string): Promise<void>;
  dictionary: DictionaryState;
  fruit: Fruit | undefined;
  setFruit: (fruit: Fruit | undefined) => void;
  getFruitDetails(fruitId: string): Promise<void>;
  searchFruitValue: string;
  setSearchFruitValue: (searchFruitValue: string) => void;
  activeTabName: TabName;
  setActiveTabName: (tabName: TabName) => void;
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

type ResponseFruitDetails = {
  data: Fruit[];
};

type TabName = "fruits" | "vegetables";

const HarvestContext = createContext<HarvestContextType | undefined>(undefined);

export const HarvestProvider = ({ children }: { children: ReactElement }) => {
  const { handleFetch } = useAuth();

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

  const [searchFruitValue, setSearchFruitValue] = useState<string>("");

  const [activeTabName, setActiveTabName] = useState<TabName>("fruits");

  async function getFruits(index: number) {
    setFruits((prev) => {
      return { ...prev, loading: true };
    });
    const response = await handleFetch(
      `https://wolm.onrender.com/harvests?page=${index}&size=5&sort_by=amount&sort_order=asc&name=${searchFruitValue}&category=${activeTabName}`,
      {}
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

  async function getFruitDetails(fruitId: string) {
    setFruit(undefined);
    const response = await handleFetch(
      `https://wolm.onrender.com/harvests/${fruitId}`,
      {}
    );

    if (response.ok === true) {
      const details: ResponseFruitDetails = await response.json();
      setFruit(details.data[0]);
    }
  }

  async function deleteFruit(fruitId: string) {
    await handleFetch(`https://wolm.onrender.com/harvests/${fruitId}`, {
      method: "DELETE",
    });
    return;
  }

  async function getDictionary() {
    const responseDictionary = await handleFetch(
      `https://wolm.onrender.com/harvests-dictionary`,
      {}
    );
    const dictionary: ResponseDictionary = await responseDictionary.json();
    setDictionary({
      categories: dictionary.data.categories,
      freshnesses: dictionary.data.freshnesses,
      weight_units: dictionary.data.weight_units,
    });
  }

  useEffect(() => {
    getFruits(0);
    getDictionary();
  }, []);

  useEffect(() => {
    getFruits(0);
  }, [searchFruitValue, activeTabName]);

  useEffect(() => {
    if (fruits.data.length === 0 && fruits.pagination.pages_total > 0) {
      getFruits(fruits.pagination.pages_total - 1);
    }
  }, [fruits.data.length, fruits.pagination.pages_total]);

  return (
    <HarvestContext.Provider
      value={{
        fruits,
        getFruits,
        deleteFruit,
        dictionary,
        fruit,
        setFruit,
        getFruitDetails,
        searchFruitValue,
        setSearchFruitValue,
        activeTabName,
        setActiveTabName,
      }}
    >
      {children}
    </HarvestContext.Provider>
  );
};

export const useHarvest = () =>
  useContext(HarvestContext) as HarvestContextType;
