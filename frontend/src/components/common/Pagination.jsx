import React, { useState } from 'react';
import {
  Pagination as MuiPagination,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange,
    totalItems
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const itemsPerPageOptions = [5, 10, 20, 50];

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} books
            </Typography>

            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => onPageChange(page)}
                showFirstButton
                showLastButton
                color="primary"
            />

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Items per page:
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleOpenMenu}
                    sx={{ minWidth: 50 }}
                >
                    {itemsPerPage}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    {itemsPerPageOptions.map(option => (
                        <MenuItem
                            key={option}
                            selected={itemsPerPage === option}
                            onClick={() => {
                                onItemsPerPageChange(option);
                                handleCloseMenu();
                            }}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    );
};

export default Pagination;
