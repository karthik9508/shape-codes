import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Palette, Settings, Heart, Circle, Square, Star } from 'lucide-react';

interface QRCodeGeneratorProps {}

type QRCodeStyle = 'standard' | 'rounded' | 'heart' | 'dots' | 'star';

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = () => {
  const [text, setText] = useState('Hello World!');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [size, setSize] = useState(300);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [margin, setMargin] = useState(4);
  const [qrStyle, setQrStyle] = useState<QRCodeStyle>('standard');
  const [cornerRadius, setCornerRadius] = useState(10);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateStyledQRCode = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Generate base QR code matrix
      const qrCodeMatrix = await QRCode.create(text, {
        errorCorrectionLevel,
        version: undefined,
      });

      const modules = qrCodeMatrix.modules;
      const moduleCount = modules.size;
      const moduleSize = size / moduleCount;

      canvas.width = size + (margin * 2 * moduleSize);
      canvas.height = size + (margin * 2 * moduleSize);

      // Clear canvas with background color
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = foregroundColor;

      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (modules.get(row, col)) {
            const x = (col + margin) * moduleSize;
            const y = (row + margin) * moduleSize;
            
            drawStyledModule(ctx, x, y, moduleSize, qrStyle, row, col, moduleCount);
          }
        }
      }

      const dataUrl = canvas.toDataURL('image/png');
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating styled QR code:', error);
    }
  };

  const drawStyledModule = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    style: QRCodeStyle,
    row: number,
    col: number,
    moduleCount: number
  ) => {
    switch (style) {
      case 'rounded':
        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, size - 2, size - 2, cornerRadius / 4);
        ctx.fill();
        break;
      
      case 'heart':
        if ((row + col) % 3 === 0) {
          drawHeart(ctx, x + size/2, y + size/2, size/3);
        } else {
          ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
        }
        break;
      
      case 'dots':
        ctx.beginPath();
        ctx.arc(x + size/2, y + size/2, size/3, 0, 2 * Math.PI);
        ctx.fill();
        break;
      
      case 'star':
        if ((row + col) % 4 === 0) {
          drawStar(ctx, x + size/2, y + size/2, size/3, 5);
        } else {
          ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
        }
        break;
      
      default:
        ctx.fillRect(x, y, size, size);
    }
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.fill();
  };

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, points: number) => {
    const angle = Math.PI / points;
    ctx.beginPath();
    for (let i = 0; i < 2 * points; i++) {
      const r = i % 2 === 0 ? radius : radius / 2;
      const currX = x + Math.cos(i * angle) * r;
      const currY = y + Math.sin(i * angle) * r;
      if (i === 0) ctx.moveTo(currX, currY);
      else ctx.lineTo(currX, currY);
    }
    ctx.closePath();
    ctx.fill();
  };

  const generateQRCode = () => {
    if (qrStyle === 'standard') {
      generateStandardQRCode();
    } else {
      generateStyledQRCode();
    }
  };

  const generateStandardQRCode = async () => {
    try {
      const options = {
        errorCorrectionLevel,
        type: 'image/png' as const,
        quality: 0.92,
        margin,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        width: size,
      };

      const dataUrl = await QRCode.toDataURL(text, options);
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  useEffect(() => {
    if (text) {
      generateQRCode();
    }
  }, [text, errorCorrectionLevel, size, foregroundColor, backgroundColor, margin, qrStyle, cornerRadius]);

  const downloadQRCode = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCodeDataUrl;
      link.click();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Generator Controls */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            QR Code Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text">Text or URL</Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL to encode"
              className="bg-background/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Size (px)</Label>
              <Input
                id="size"
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                min="100"
                max="1000"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="margin">Margin</Label>
              <Input
                id="margin"
                type="number"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                min="0"
                max="10"
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qrStyle">QR Code Style</Label>
            <Select value={qrStyle} onValueChange={(value: QRCodeStyle) => setQrStyle(value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4" />
                    Standard
                  </div>
                </SelectItem>
                <SelectItem value="rounded">
                  <div className="flex items-center gap-2">
                    <Circle className="w-4 h-4" />
                    Rounded
                  </div>
                </SelectItem>
                <SelectItem value="heart">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Heart Pattern
                  </div>
                </SelectItem>
                <SelectItem value="dots">
                  <div className="flex items-center gap-2">
                    <Circle className="w-4 h-4 fill-current" />
                    Dots
                  </div>
                </SelectItem>
                <SelectItem value="star">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Star Pattern
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="errorLevel">Error Correction</Label>
            <Select value={errorCorrectionLevel} onValueChange={(value: 'L' | 'M' | 'Q' | 'H') => setErrorCorrectionLevel(value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Low (7%)</SelectItem>
                <SelectItem value="M">Medium (15%)</SelectItem>
                <SelectItem value="Q">Quartile (25%)</SelectItem>
                <SelectItem value="H">High (30%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {qrStyle === 'rounded' && (
            <div className="space-y-2">
              <Label htmlFor="cornerRadius">Corner Radius</Label>
              <Input
                id="cornerRadius"
                type="number"
                value={cornerRadius}
                onChange={(e) => setCornerRadius(Number(e.target.value))}
                min="1"
                max="20"
                className="bg-background/50"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="foreground">Foreground Color</Label>
              <div className="flex gap-2">
                <Input
                  id="foreground"
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="w-16 h-10 p-1 bg-background/50"
                />
                <Input
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="background"
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

          <Button onClick={downloadQRCode} className="w-full" variant="gradient">
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
        </CardContent>
      </Card>

      {/* QR Code Preview */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {qrCodeDataUrl && (
              <img
                src={qrCodeDataUrl}
                alt="Generated QR Code"
                className="max-w-full h-auto rounded"
                style={{ maxWidth: '400px' }}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;