import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikConsumer } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CreatePost=() =>  {
  const initialValues = {
    nom_serie: "",
    cat_serie: "",
    nb_saison: "",
    image : null,
  };

  const validationSchema = Yup.object().shape({
    nom_serie: Yup.string().required("Vous devez insérer le nom de la série !"),
    cat_serie: Yup.string().required("Choississez une catégorie"),
    nb_saison: Yup.number("Que des chiffres !").min(1).max(99).required("Vous devez insérer le nombre de saisons !"),
    image: Yup.mixed().required("Vous devez ajouter une image !"),
  });

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          
          const formData = new FormData();
          
          formData.append("image", values.image);
          formData.append("nb_saison", values.nb_saison)
          formData.append("cat_serie", values.cat_serie)
          formData.append("nom_serie", values.nom_serie)
          
          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          };
          axios.post("http://localhost:3001/posts",formData,config).then(() => window.location = "/") // Redirect après post
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
            placeholder="(Ex. The Witcher...)"
          />

          <label>Catégorie : </label>
          <ErrorMessage name="cat_serie" component="span" />
          <Field
            component="select"
            autoComplete="off"
            id="inputCreatePost"
            name="cat_serie"
            placeholder="Sélectionner la catégorie">
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
            placeholder="(Ex. 1, 2, 3...)"
          />

          <label>Image : </label>
          <ErrorMessage name="image" component="span" />

          <input
          className="upload-file" 
          type="file"
          name="image"
          id="inputCreatePost"
          onChange={(e) => formProps.setFieldValue("image", e.target.files[0])}        />

          <button type="submit"> Créer une série</button>
        </Form>
         )}
      </Formik>
    </div>
  );
}

export default CreatePost;