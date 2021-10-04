import React, {ReactElement, useEffect, useState} from 'react';
import {IItemProps} from "./Item";

// Interface used for Type-checking
interface IGridProps {
    pageSize: number,
    children: Array<ReactElement<IItemProps>>,
}
function Grid(props: IGridProps) {
    const [pageIndex, setPageIndex] = useState<number>(0);
    const pageCount = Math.ceil(props.children.length / props.pageSize);

    // Example for Page and Item Indexes:
    // Page 0:   0  1  2  3
    // Page 1:   4  5  6  7
    // Page 2:   8  9  10 11
    // Page 3:   12 13 14 15
    // Page 4:   16 17 18 19

    // The first and last Item Indexes for the Current Page
    const firstIndex = pageIndex * props.pageSize;
    const lastIndex = firstIndex + props.pageSize;

    function handleOnPrevious() {
        setPageIndex( (prev) => prev - 1 );
    }

    function handleOnNext() {
        setPageIndex( (prev) => prev + 1 );
    }

    function handleOnPageChange (event: React.ChangeEvent<HTMLSelectElement>) {
        setPageIndex(parseInt(event.target.value));
    }

    // Reset Page Index - used when searching
    useEffect(() => {
        setPageIndex(0);
    }, [props.children]);

    // Keyboard Controls - Event handling
    useEffect(() => {
        function handleOnKeyDown (event: KeyboardEvent) {
            if (event.target === document.body) {
                console.log("Button pressed: ", event.key);
                if (event.key === 'ArrowLeft' && pageIndex > 0) {
                    handleOnPrevious();
                }
                if (event.key === 'ArrowRight' && pageIndex < pageCount - 1) {
                    handleOnNext();
                }
            }
        }
        document.body.addEventListener('keydown', handleOnKeyDown);
        return () => {
            document.body.removeEventListener('keydown', handleOnKeyDown);
        }
    }, [pageIndex, pageCount]);

    // Search Warning for results not found
    if (props.children.length === 0) {
        return (
            <div className="alert alert-warning" role="alert">
                No Results Found!
            </div>
        );
    }
    return (
       <div className="grid">
           {/* Grid Items for this Page */}
           <div className="row">
               {props.children.slice(firstIndex,lastIndex)}
           </div>

           <div className="pagination pagination-lg controls">
               {/* Button - Previous */}
               <button
                   className="page-item custom-btn"
                   onClick={handleOnPrevious}
                   disabled={pageIndex <= 0}
               ><a className="page-link" href="/#">&laquo;</a>
               </button>

               {/* Dropdown - Page selector */}
               <select
                   className="form-select custom-select"
                   value={pageIndex}
                   onChange={handleOnPageChange}
                   disabled={pageCount <= 1}
               >
                   {/* Populate the Dropdown with page numbers */}
                   {new Array(pageCount)
                       .fill(null)
                       .map((page, i) =>
                           <option key={i} value={i}>Page: {i + 1} / {pageCount}</option>
                       )
                   }
               </select>

               {/* Button - Next */}
               <button
                   className="page-item custom-btn"
                   disabled={pageIndex >= pageCount - 1}
                   onClick={handleOnNext}
               ><a className="page-link" href="/#">&raquo;</a>
               </button>
           </div>
       </div>
    );
}

export default Grid;