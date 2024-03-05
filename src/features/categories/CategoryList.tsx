import { Box, Button, IconButton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCategory, selectCategories } from "./categorySlice";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";

export const CategoryList = () => {
  const categories = useAppSelector(selectCategories)
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 }
    }
  }

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString("pt-BR"),
  }));

  const columns: GridColDef[] = [
    { 
      field: "name", 
      headerName: "Name", 
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "isActive",
      headerName: "Active",
      type: "boolean",
      flex: 1,
      renderCell: renderIsActiveCell,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
    },
    {
      field: "id",
      headerName: "Actions",
      type: "string",
      flex: 1,
      renderCell: renderActionsCell,
    }
  ];

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    )
  }

  function renderActionsCell(params: GridRenderCellParams) {
    const { id } = params;
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDeleteCategory(params.value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    )
  }

  function handleDeleteCategory(id: string) {
    dispatch(deleteCategory(id));
    enqueueSnackbar("Category deleted successfully", { variant: "success" });
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    )
  }

  return (
    <Box maxWidth="lg" sx={{ mt:4, mb:4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>
          <DataGrid 
            rows={rows} 
            columns={columns} 
            disableColumnFilter={true}
            disableColumnSelector={true}
            disableDensitySelector={true}
            disableRowSelectionOnClick={true}
            componentsProps={componentProps}
            components={{ Toolbar: GridToolbar }}
            />
    </Box>
  )
}