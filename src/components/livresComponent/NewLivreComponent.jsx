"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useRouter } from "next/navigation";
import { addLivre } from "@/services/livreService";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const NewLivre = ({ LesEditeurs, lesSpecialites, lesAuteurs }) => {
  const [files, setFiles] = useState([]);

  const router = useRouter();
  const [isbn, setIsbn] = useState("");
  const [titre, setTitre] = useState("");
  const [annedition, setAnnedition] = useState("");
  const [prix, setPrix] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [couverture, setCouverture] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [maised, setMaised] = useState("");
  const [auteurs, setAuteurs] = useState([]);
  const [validated, setValidated] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      const newLivre = {
        isbn,
        titre,
        annedition,
        prix,
        qtestock,
        couverture,
        specialite,
        maised,
        auteurs,
      };
      //faire le add dans la BD
      addLivre(newLivre)
        .then((res) => {
          router.push("/admin/livres");
          router.refresh();
        })
        .catch((error) => {
          alert("Erreur ! Insertion non effectuée");
        });
    }
    setValidated(true);
  };
  const handleReset = () => {
    setIsbn("");
    setTitre("");
    setAnnedition("");
    setPrix("");
    setQtestock("");
    setCouverture("");
    setSpecialite("");
    setMaised("");
    setAuteurs([]);
    setFiles([]);
  };

  const serverOptions = () => {
    console.log("server pond");
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Ecommerce_cloudinary");
        data.append("cloud_name", "iset-sfax");
        data.append("public_id", file.name);
        axios
          .post("https://api.cloudinary.com/v1_1/iset-sfax/image/upload", data)
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setCouverture(data.url);
            load(data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            error("Upload failed");
            abort();
          });
      },
    };
  };
  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Ajout Livre</h2>
        <div className="container w-100 d-flex justify-content-center">
          <div>
            <div className="form mt-3">
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>ISBN *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="ISBN Livre"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir ISBN Livre
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Titre *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Titre Livre"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir titre Livre
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Année *</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="année édition"
                    value={annedition}
                    onChange={(e) => setAnnedition(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir Année
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-6">
                  <Form.Label>Prix *</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      required
                      placeholder="Prix"
                      value={prix}
                      onChange={(e) => setPrix(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Prix Incorrect
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group className="col-md-6">
                  <Form.Label>Quantité *</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="number"
                      required
                      placeholder="Qté"
                      value={qtestock}
                      onChange={(e) => setQtestock(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Qté Incorrecte
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="col-md-6">
                  <Form.Label>Couverture *</Form.Label>

                  <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                    <FilePond
                      files={files}
                      acceptedFileTypes="image/*"
                      onupdatefiles={setFiles}
                      allowMultiple={false}
                      server={serverOptions()}
                      name="file"
                    />
                  </div>

                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Couverture"
                      value={couverture}
                      onChange={(e) => setCouverture(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Couverture Incorrecte
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group className="col-md-6">
                  <Form.Label>Spécialité *</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      required
                      as="select"
                      type="select"
                      value={specialite}
                      onChange={(e) => setSpecialite(e.target.value)}
                    >
                      <option></option>
                      {lesSpecialites &&
                        lesSpecialites.map((spec) => (
                          <option key={spec._id} value={spec._id}>
                            {spec.nomspecialite}
                          </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Spécialité Incorrecte
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="col-md-6">
                  <Form.Label>Edition *</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      required
                      as="select"
                      type="select"
                      value={maised}
                      onChange={(e) => setMaised(e.target.value)}
                    >
                      <option></option>
                      {LesEditeurs &&
                        LesEditeurs.map((ed) => (
                          <option key={ed._id} value={ed._id}>
                            {ed.maisonedit}
                          </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Edition Incorrecte
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group className="col-md-6">
                  <Form.Label>Auteurs *</Form.Label>
                  <InputGroup hasValidation>
                    <TextField
                      name="auteurs"
                      variant="outlined"
                      select
                      SelectProps={{ multiple: true }}
                      value={auteurs}
                      helperText="Sélectionner des auteurs"
                      onChange={(event) => setAuteurs(event.target.value)}
                    >
                      {lesAuteurs
                        ? lesAuteurs.map((aut) => (
                            <MenuItem key={aut._id} value={aut._id}>
                              {aut.nomauteur}
                            </MenuItem>
                          ))
                        : null}
                    </TextField>
                    <Form.Control.Feedback type="invalid">
                      Auteurs Incorrecters
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
            </div>
          </div>
        </div>
        <center>
          <Button type="submit">Enregistrer</Button>
          <Button
            type="button"
            className="btn btn-warning"
            onClick={() => handleReset()}
          >
            Annuler
          </Button>
        </center>
      </Form>
    </div>
  );
};
export default NewLivre;
