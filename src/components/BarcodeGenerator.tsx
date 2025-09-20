import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, BarChart3, Settings, FileImage, FileText } from 'lucide-react';

interface BarcodeGeneratorProps {}

type DownloadFormat = 'png' | 'svg' | 'pdf';

const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = () => {
  const [text, setText] = useState('123456789012');
  const [format, setFormat] = useState('CODE128');
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);
  const [fontSize, setFontSize] = useState(20);
  const [textAlign, setTextAlign] = useState('center');
  const [textPosition, setTextPosition] = useState('bottom');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [lineColor, setLineColor] = useState('#000000');
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>('png');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const barcodeFormats = [
    'CODE128', 'CODE39', 'EAN13', 'EAN8', 'UPC', 'ITF14', 'MSI', 'pharmacode'
  ];

  const generateBarcode = () => {
    if (canvasRef.current && text) {
      try {
        JsBarcode(canvasRef.current, text, {
          format: format,
          width: width,
          height: height,
          displayValue: displayValue,
          fontSize: fontSize,
          textAlign: textAlign as any,
          textPosition: textPosition as any,
          background: backgroundColor,
          lineColor: lineColor,
        });
      } catch (error) {
        console.error('Error generating barcode:', error);
      }
    }
  };

  useEffect(() => {
    generateBarcode();
  }, [text, format, width, height, displayValue, fontSize, textAlign, textPosition, backgroundColor, lineColor]);

  const generateSVG = () => {
    try {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      JsBarcode(svg, text, {
        format: format,
        width: width,
        height: height,
        displayValue: displayValue,
        fontSize: fontSize,
        textAlign: textAlign as any,
        textPosition: textPosition as any,
        background: backgroundColor,
        lineColor: lineColor,
      });
      return new XMLSerializer().serializeToString(svg);
    } catch (error) {
      console.error('Error generating SVG:', error);
      return null;
    }
  };

  const downloadBarcode = async () => {
    switch (downloadFormat) {
      case 'png':
        if (canvasRef.current) {
          const link = document.createElement('a');
          link.download = 'barcode.png';
          link.href = canvasRef.current.toDataURL();
          link.click();
        }
        break;

      case 'svg':
        const svgString = generateSVG();
        if (svgString) {
          const blob = new Blob([svgString], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'barcode.svg';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
        break;

      case 'pdf':
        if (canvasRef.current) {
          const pdf = new jsPDF();
          const imgData = canvasRef.current.toDataURL('image/png');
          const imgWidth = 150;
          const imgHeight = (canvasRef.current.height * imgWidth) / canvasRef.current.width;
          const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
          const y = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;
          
          pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
          pdf.save('barcode.pdf');
        }
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Generator Controls */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Barcode Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="barcode-text">Text or Number</Label>
            <Input
              id="barcode-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or number to encode"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Barcode Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {barcodeFormats.map((fmt) => (
                  <SelectItem key={fmt} value={fmt}>
                    {fmt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Bar Width</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min="1"
                max="5"
                step="0.1"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (px)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min="20"
                max="200"
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Input
                id="fontSize"
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                min="8"
                max="32"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="textPosition">Text Position</Label>
              <Select value={textPosition} onValueChange={setTextPosition}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="line-color">Line Color</Label>
              <div className="flex gap-2">
                <Input
                  id="line-color"
                  type="color"
                  value={lineColor}
                  onChange={(e) => setLineColor(e.target.value)}
                  className="w-16 h-10 p-1 bg-background/50"
                />
                <Input
                  value={lineColor}
                  onChange={(e) => setLineColor(e.target.value)}
                  className="bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="bg-color"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-16 h-10 p-1 bg-background/50"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="bg-background/50"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="displayValue"
              checked={displayValue}
              onChange={(e) => setDisplayValue(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="displayValue">Show text below barcode</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="downloadFormat">Download Format</Label>
            <Select value={downloadFormat} onValueChange={(value: DownloadFormat) => setDownloadFormat(value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">
                  <div className="flex items-center gap-2">
                    <FileImage className="w-4 h-4" />
                    PNG Image
                  </div>
                </SelectItem>
                <SelectItem value="svg">
                  <div className="flex items-center gap-2">
                    <FileImage className="w-4 h-4" />
                    SVG Vector
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    PDF Document
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={downloadBarcode} className="w-full" variant="gradient">
            <Download className="w-4 h-4 mr-2" />
            Download as {downloadFormat.toUpperCase()}
          </Button>
        </CardContent>
      </Card>

      {/* Barcode Preview */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto rounded"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarcodeGenerator;