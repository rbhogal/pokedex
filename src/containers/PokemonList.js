import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList } from "../actions/pokemonActions";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const PokemonList = (props) => {
    const [search, setSearch] = useState("");
  const pokemonList = useSelector((state) => state.PokemonList);
  const dispatch = useDispatch();

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };

  React.useEffect(() => {
    FetchData(1);
  }, []);

  const ShowData = () => {
    if (!_.isEmpty(pokemonList.data)) {
      return pokemonList.data.map((el) => {
        return (
          <div className={"list-wrapper"}>
            {
              <div className={"pokemon-item"}>
                <p>{el.name}</p>
                <Link to={`/pokemon/${el.name}`}>View</Link>
              </div>
            }
          </div>
        );
      });
    }

    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }

    return <p>Pokedex error: Unable to get data. Contact the Professor</p>;
  };

  return <div>
    <div className="search-wrapper">
        <p>Search:&nbsp; </p>
        <input type="text" onChange={e=> setSearch(e.target.value)} />
        <button onClick={()=> props.history.push(`/pokemon/${search}`)} >Search</button>
    </div>
  {ShowData()}
    {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate  pageCount={Math.ceil(pokemonList.count / 15)} pageRangeDisplayed={2} marginPagesDisplayed={1} 
        onPageChange={(data) => FetchData(data.selected + 1)}


        />
    ) }

  </div>;
};

export default PokemonList;
