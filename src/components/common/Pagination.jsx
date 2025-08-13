import React from 'react';
import { Pagination as BootstrapPagination, Dropdown } from 'react-bootstrap';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage,
    onItemsPerPageChange,
    totalItems
}) => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    
    const itemsPerPageOptions = [5, 10, 20, 50];
    
    return (
        <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} books
            </div>
            
            <BootstrapPagination className="mb-0">
                <BootstrapPagination.First 
                    onClick={() => onPageChange(1)} 
                    disabled={currentPage === 1} 
                />
                <BootstrapPagination.Prev 
                    onClick={() => onPageChange(currentPage - 1)} 
                    disabled={currentPage === 1} 
                />
                
                {startPage > 1 && (
                    <BootstrapPagination.Ellipsis disabled />
                )}
                
                {pageNumbers.map(number => (
                    <BootstrapPagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </BootstrapPagination.Item>
                ))}
                
                {endPage < totalPages && (
                    <BootstrapPagination.Ellipsis disabled />
                )}
                
                <BootstrapPagination.Next 
                    onClick={() => onPageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages || totalPages === 0} 
                />
                <BootstrapPagination.Last 
                    onClick={() => onPageChange(totalPages)} 
                    disabled={currentPage === totalPages || totalPages === 0} 
                />
            </BootstrapPagination>
            
            <div className="d-flex align-items-center">
                <span className="me-2 text-muted">Items per page:</span>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm" id="items-per-page-dropdown">
                        {itemsPerPage}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {itemsPerPageOptions.map(option => (
                            <Dropdown.Item 
                                key={option} 
                                active={itemsPerPage === option}
                                onClick={() => onItemsPerPageChange(option)}
                            >
                                {option}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default Pagination;
