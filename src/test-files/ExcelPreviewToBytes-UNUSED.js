import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ExcelPreview = ({ base64String }) => {
  const [excelData, setExcelData] = useState(null);

  useEffect(() => {
    if (base64String) {
      const bytes = base64ToBytes(base64String);
      const workbook = XLSX.read(bytes, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const excelSheet = XLSX.utils.sheet_to_json(
        workbook.Sheets[firstSheetName],
        { header: 1 }
      );

      setExcelData(excelSheet);
      localStorage.setItem("filedata_bytes", bytes);
    }
  }, [base64String]);

  const base64ToBytes = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  };

  return (
    <div>
      {excelData ? (
        <table>
          <thead>
            <tr>
              {excelData[0].map((cell, index) => (
                <th key={index}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExcelPreview;
