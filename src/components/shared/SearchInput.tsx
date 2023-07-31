import { useEffect, useState, useCallback, useRef } from "react";
import SDTextInput from "./TextInput";
import debounce from "lodash.debounce";
interface SearchInputProps {
  onSubmit: (value: string) => void;
  searchTerm: string;
  placeholder?:string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSubmit,searchTerm,placeholder='' }) => {
  const [innerSearchTerm, setInnerSearchTerm] = useState<string>(searchTerm);
  const firstRender = useRef<boolean>(false);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInnerSearchTerm(event.target.value);
  };
  const debouncedSearch = useCallback(
    debounce((query) => onSubmit(query), 600),
    []
  );

  useEffect(() => {
      console.log("wwwwwww",firstRender.current);
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }
    // Apply debouncing to the search operation

    debouncedSearch(innerSearchTerm);

    // Cleanup function
    return () => {
      debouncedSearch.cancel();
    };
  }, [innerSearchTerm]);
  return <SDTextInput value={innerSearchTerm} onChange={handleChange} placeholder={placeholder} />;
};

export default SearchInput;
