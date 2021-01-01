import debounce from 'lodash.debounce';
import React, { FormEvent } from 'react';
import { ReactComponent as SearchIcon } from './search.svg';

export type SearchFunc = (event: React.FormEvent<HTMLInputElement>) => void;
export interface ILocationInputProps {
  onSearch: SearchFunc;
}
const LocationInput: React.FC<ILocationInputProps> = ({ onSearch }) => {
  const [inputEvent, setInputEvent] = React.useState<
    FormEvent<HTMLInputElement>
  >();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = React.useCallback(
    debounce((event) => {
      onSearch(event);
    }, 500),
    []
  );

  React.useEffect(() => {
    if (inputEvent) {
      debouncedSearch(inputEvent);
    }
  }, [debouncedSearch, inputEvent]);

  return (
    <div className="w-full max-w-lg lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400 " />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="City name"
          type="search"
          onInput={setInputEvent}
        />
      </div>
    </div>
  );
};

export default LocationInput;
