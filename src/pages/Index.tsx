import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import BarcodeGenerator from '@/components/BarcodeGenerator';
import { QrCode, BarChart3, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary glow-primary">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                QR & Barcode Studio
              </h1>
              <p className="text-muted-foreground">
                Professional QR code and barcode generation with customization
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <Card className="mb-8 gradient-accent border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">
              Create Professional QR Codes & Barcodes
            </CardTitle>
            <CardDescription className="text-white/80">
              Generate high-quality QR codes and barcodes with advanced customization options.
              Perfect for businesses, events, products, and personal use.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Generator Tabs */}
        <Tabs defaultValue="qrcode" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50">
            <TabsTrigger value="qrcode" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              QR Code Generator
            </TabsTrigger>
            <TabsTrigger value="barcode" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Barcode Generator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="qrcode" className="space-y-6">
            <QRCodeGenerator />
          </TabsContent>

          <TabsContent value="barcode" className="space-y-6">
            <BarcodeGenerator />
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                Advanced QR Codes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Generate QR codes with custom colors, sizes, error correction levels, and margins.
                Perfect for websites, contact info, WiFi, and more.
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Multiple Formats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Support for CODE128, CODE39, EAN13, EAN8, UPC, ITF14, MSI, and more barcode formats.
                Customize appearance and dimensions.
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                High Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Export high-resolution PNG images suitable for print and digital use.
                Professional quality for business applications.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with modern web technologies for reliable code generation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;