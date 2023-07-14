import { useEffect, useState } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

// import { InvoiceData } from '../Config/InvoiceData';  //json array: data:{id:"",items:[]}
import { capitalizingData } from "../../../Utils/HelperFunctions";

export const DynamicPdfForm = () => {
    const [tableData, setTableData] = useState([]);
    const [tableFormData, setTableFormData] = useState([]);
    const fileName = "sample";

    useEffect(() => {
        if (InvoiceData?.items?.length > 0) {
            let items = InvoiceData?.items;
            setTableData(items);
            let headers = [];
            for (const [key, value] of Object.entries(items[0])) {
                headers.push({
                    name: key,
                    headerLabel: capitalizingData(key),
                    type: typeof value,
                    style: {}
                });
            }
            setTableFormData(headers);
        }
        return () => { }
    }, []);

    const handleResize = (iframe) => {
        iframe.contentDocument.documentElement.style.height = '100%';
        iframe.contentDocument.documentElement.style.overflow = 'auto';
    };

    function convertHtmlToPdf(type) {
        const iframe = document.getElementById("myIframe");
        const doc = new jsPDF();
        const iframeWindow = iframe.contentWindow;
        const iframeDocument = iframeWindow.document;
        html2canvas(iframeDocument.body).then(canvas => {
            const imageData = canvas.toDataURL("image/png");
            if (type === "save") {
                doc.addImage(imageData, "PNG", 10, 10, 190, 0);
                doc.save(`${fileName}.pdf`);
            }
            if (type === "pdf") {
                const imgProps = doc.getImageProperties(imageData);
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                doc.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                const pdfDataUri = doc.output('datauristring');
                iframe.src = pdfDataUri;

            }
        });
    }

    useEffect(() => {
        let iframe = document.getElementById("myIframe");
        handleResize(iframe);
        let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        let existingTable = document.getElementById("iframe-dynamic-table");
        if (existingTable) {
            let clonedTable = existingTable.cloneNode(true);
            iframeDocument.body.innerHTML = "";
            clonedTable.style.display = "table";
            iframeDocument.body.appendChild(clonedTable);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [tableFormData])


    return (
        <div>
            <iframe id="myIframe" style={{ border: "none" }} width="800px" height="600px" type="application/pdf" title="PDF Viewer"></iframe>
            {tableFormData?.length > 0 && <table id="iframe-dynamic-table" style={{ display: "none", borderCollapse: "collapse" }}>
                <thead>
                    <tr>{tableFormData.map((headItem, headKey) => { return <th key={headKey} style={{ padding: "8px", background: "#ddeeef" }}>{headItem.headerLabel}</th> })}</tr>
                </thead>
                <tbody>
                    {tableData.map((rowItem, rowKey) => {
                        return <tr key={rowKey}>
                            {tableFormData.map((columnItem, columnKey) => {
                                return <td style={{ padding: "8px" }} key={columnKey}>{rowItem[columnItem.name]}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>}
            <p onClick={() => convertHtmlToPdf("save")}>Save</p>
            <p onClick={() => convertHtmlToPdf("pdf")}>PDF</p>
        </div>
    )
}


