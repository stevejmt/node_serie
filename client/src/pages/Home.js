import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Home=() => {

  const [listOfPosts, setListOfPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryTerm, setCategoryTerm] = useState('');

  let history = useHistory();

  const deletePost = (id) => {
axios.delete(`http://localhost:3001/posts/${id}`)
      .then(() => {
        setListOfPosts(
          listOfPosts.filter((value) => {
            return value.id != id;
          })
        );
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
        <div className="filtre">
      <input className="searchbar" type="text" role="search"
               placeholder="Rechercher par nom..."
               onChange={event => {
                setSearchTerm(event.target.value);
        }}
        />

      <select className="filterCategory"
      placeholder="Choissisez une catégorie"
      onChange={event => {
        setCategoryTerm(event.target.value);
      }}>
              <option value="">Aucun filtre</option>
              <option value="Drame">Drame</option>
              <option value="Comédie">Comédie</option>
              <option value="Thriller">Thriller</option>
              <option value="Documentaire">Documentaire</option>
              <option value="Action">Action</option>
              <option value="Science-Fiction">Science</option>
              <option value="Animation">Animation</option>
              <option value="Famille">Famille</option>
              <option value="Guerre">Guerre</option>
              <option value="Aventure">Aventure</option>
              <option value="Western">Western</option>
              <option value="Horreur">Horreur</option>
              <option value="Politique">Politique</option>
      </select>
        </div>
      {listOfPosts.filter((value)=> (!searchTerm || value.nom_serie.toLowerCase().includes(searchTerm.toLowerCase())) && (!categoryTerm || value.cat_serie.toLowerCase().includes(categoryTerm.toLowerCase()))).map((value, key) => {
        return (
          <div className="post">
            <div className="title"> {value.nom_serie} - {value.cat_serie}
              <a aria-label="Modifier" onClick={() => {history.push(`/edit/${value.id}`)}}><img className="icon" id="edit" aria-hidden="true" alt="icone modifier" src="https://cdn1.iconfinder.com/data/icons/feather-2/24/edit-512.png"/><span class="accessible-hidden"> Modifier </span> </a>
              <a aria-label="Supprimer" onClick={() => deletePost(value.id)}> <img className="icon" id="delete" aria-hidden="true" alt="icone supprimer" src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/delete-512.png"/><span class="accessible-hidden"> Supprimer </span> </a>
            </div>
            <div className="body"><img src={`http://localhost:3001/${value.image}`}/></div>
            <div className="footer">Nombre de saisons : {value.nb_saison}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;