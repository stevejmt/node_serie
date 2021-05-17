import React, {Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FormikConsumer } from "formik";
import * as Yup from "yup";

const EditPost = () => {
   
    const [postObject, setPostObject] = useState({
      id: useParams().id,
      nom_serie: '',
      cat_serie: '',
      nb_saison: '',
      fetched : ''
    }); 

    useEffect(() => {
        if (postObject.fetched !== '') return;
      
        setPostObject({fetched : "oui"})
    
        axios.get(`http://localhost:3001/posts/byID/${postObject.id}`).then((response) => {
            setPostObject(response.data);
            });
        });

    const initialValues = {
        nom_serie: "",
        cat_serie: "",
        nb_saison: "",
      };
    
      const validationSchema = Yup.object().shape({
        nom_serie: Yup.string(),
        cat_serie: Yup.string(),
        nb_saison: Yup.number("Que des chiffres").min(1).max(99),
      });

return (
 <div className="createPostPage">
    <Formik
        initialValues={initialValues}
        onSubmit={() => {

          console.log(postObject)
          axios.put(`http://localhost:3001/posts/update/${postObject.id}`, postObject).then(() => window.location = "/") // Redirect après post
        }
      }
        validationSchema={validationSchema}
      >
        {(formProps) => (
        <Form className="formContainer">
          <label>Titre de la série : </label>
          <ErrorMessage name="nom_serie" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="nom_serie"
            value={postObject.nom_serie}
            onChange={(e) => {setPostObject({...postObject, nom_serie : e.target.value})}}
          />

          <label>Catégorie : </label>
          <ErrorMessage name="cat_serie" component="select" />
          <Field
            component="select"
            autoComplete="off"
            id="inputCreatePost"
            name="cat_serie"
            value={postObject.cat_serie}
            onChange={(e) => {setPostObject({...postObject, cat_serie : e.target.value})}}>
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
          </Field> 

          <label>Nombre de saisons : </label>
          <ErrorMessage name="nb_saison" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="nb_saison"
            value={postObject.nb_saison}
            onChange={(e) => {setPostObject({...postObject, nb_saison : e.target.value})}}
          />

          <button type="submit"> Mettre à jour les données</button>
        </Form>
         )}
      </Formik>
      </div>
);

}

export default EditPost;