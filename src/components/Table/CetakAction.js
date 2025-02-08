"use client";

import { pdf } from "@react-pdf/renderer";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import PengadilanPdf from "../createPdf/pengadilanPdf";

const CetakPdfAction = ({ data }) => {
  const downloadPDF = async () => {
    const blob = await pdf(<PengadilanPdf data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <Button size="icon" className="bg-green-600" onClick={downloadPDF}>
      <Printer />
    </Button>
  );
};

export default CetakPdfAction;
