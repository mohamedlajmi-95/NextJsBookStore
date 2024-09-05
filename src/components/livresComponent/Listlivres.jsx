"use client";
import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";

import Button from "react-bootstrap/Button";
import { deleteLivre } from "@/services/livreService";
import { useRouter } from "next/navigation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Link from "next/link";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UpdateLivre from "./UpdateLivreComponent";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const Listlivres = ({ livres }) => {
  const router = useRouter();
  const deletelivre = (id) => {
    if (window.confirm("supprimer Livre O/N")) {
      deleteLivre(id)
        .then((res) => {
          console.log(res);
          router.refresh();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "couverture",
        header: "COUVERTURE",
        Cell: ({ cell }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={cell.getValue()}
              alt="couverture"
              height="50"
              width="50"
            />
          </Box>
        ),
      },
      {
        accessorKey: "titre",
        header: "TITRE",
        size: 100,
      },
      {
        accessorKey: "isbn",
        header: "ISBN",
        size: 50,
      },
      {
        accessorKey: "annedition",
        header: "ANNEE",
        size: 50,
      },
      {
        accessorKey: "prix",
        header: "PRIX",
        size: 50,
      },
      {
        accessorKey: "qtestock",
        header: "QTE",
        size: 50,
      },
      {
        accessorFn: (originalRow) =>
          originalRow.auteurs.map((aut, i) => {
            return <div key={i}>{aut.nomauteur}</div>;
          }),
        id: "aut._id",
        header: "AUTEURS",
      },
      {
        accessorKey: "specialite.nomspecialite",
        header: "SPECIALITE",
        size: 50,
      },
      {
        accessorKey: "maised.maisonedit",
        header: "EDITEUR",
        size: 50,
      },
      {
        accessorKey: "_id",
        header: "actions",
        size: 50,
        Cell: ({ cell, row }) => (
          <div>
            <Button
              onClick={(e) => {
                deletelivre(cell.row.original._id, e);
              }}
              variant="danger"
              size="md"
              className="text-danger btn-link delete"
            >
              <DeleteForeverIcon />
            </Button>

            <Button size="md" className="text-primary btn-link edit">
              <Link href={`/admin/livres/updatelivre/${cell.row.original._id}`}>
                <EditOutlinedIcon />
              </Link>
            </Button>
          </div>
        ),
      },
    ],
    [livres]
  );
  return (
    <div>
      <Button variant="dark" size="sm">
        <Link
          href="/admin/livres/newlivre"
          style={{
            textDecoration: "none",
            color: "pink",
            fontSize: 14,
          }}
        >
          <AddCircleOutlineIcon /> Nouveau
        </Link>
      </Button>
      <MaterialReactTable columns={columns} data={livres} />;
    </div>
  );
};
export default Listlivres;
