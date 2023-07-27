import React, { useEffect } from 'react'
import "./Style/style.css";

export const TableResize = () => {
    const headerItems = ["Name", "Year", "Address"];
    const sampleData = [
        { name: "Raju", year: "2001", address: "sample 1" },
        { name: "Radha", year: "2003", address: "sample 2" },
        { name: "Mayavi", year: "1900", address: "sample 3" },
        { name: "Luttappi", year: "1800", address: "sample 4" },
        { name: "Dagini", year: "1940", address: "sample 5" },
        { name: "Kuttoosan", year: "1970", address: "sample 6" },
    ]

    const createResizableColumn = function (col, resizer) {
        // Track the current position of mouse
        let x = 0; let w = 0;
        const mouseDownHandler = function (e) {
            // Get the current mouse position
            x = e.clientX;
            // Calculate the current width of column
            const styles = window.getComputedStyle(col);
            w = parseInt(styles.width, 10);
            // Attach listeners for document's events
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };
        const mouseMoveHandler = function (e) {
            // Determine how far the mouse has been moved
            const dx = e.clientX - x;
            // Update the width of column
            col.style.width = `${w + dx}px`;
        };
        // When user releases the mouse, remove the existing event listeners
        const mouseUpHandler = function () {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
        resizer.addEventListener('mousedown', mouseDownHandler);
    };

    const createResizableRow = function (col, resizer) {
        console.log(col, resizer, "createResizableRow");
        let y = 0; let h = 0;
        const mouseDownHandler = function (e) {
            y = e.clientY;
            const styles = window.getComputedStyle(col);
            h = parseInt(styles.height, 10);
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };
        const mouseMoveHandler = function (e) {
            const dx = e.clientY - y;
            col.style.height = `${h + dx}px`;
        };
        const mouseUpHandler = function () {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
        resizer.addEventListener('mousedown', mouseDownHandler);
    };


    useEffect(() => {
        const table = document.getElementById('resizeMe');
        const cols = table.querySelectorAll('th');

        [].forEach.call(cols, function (col) {
            const resizer = document.createElement('div');
            resizer.classList.add('resizer');
            resizer.style.height = `${table.offsetHeight}px`;
            col.appendChild(resizer);
            createResizableColumn(col, resizer);
        });

        const rows = table.querySelectorAll('tr');
        [].forEach.call(rows, function (row) {
            const resizer = document.createElement('div');
            resizer.classList.add('rowResizer');
            resizer.style.width = `${table.offsetWidth}px`;
            row.appendChild(resizer);
            createResizableRow(row, resizer);
        });
        return () => { }
    }, [])


    return (
        <div>
            <table id="resizeMe" class="table">
                <thead >
                    <tr >
                        {headerItems.map((item, index) => {
                            return <th key={index}>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {sampleData.map((item, index) => {
                        return <tr key={index}>
                            <td>{item?.name}</td>
                            <td>{item?.year}</td>
                            <td>{item?.address}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
