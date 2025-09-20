import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import BarcodeGenerator from '@/components/BarcodeGenerator';
import { QrCode, BarChart3, Sparkles, Download, Zap, Shield, ArrowRight, Star, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-primary opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
        
        {/* Navigation */}
        <nav className="relative border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl gradient-primary glow-primary">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  QR & Barcode Studio
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.9</span>
                  <span>·</span>
                  <Users className="w-4 h-4" />
                  <span>10K+ users</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Professional Code Generation</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Create Stunning
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                QR Codes & Barcodes
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Generate professional QR codes and barcodes with advanced customization, 
              multiple export formats, and stunning visual effects. Perfect for businesses, events, and personal projects.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
              <Button size="lg" className="group px-8 py-6 text-lg font-semibold gradient-primary hover:scale-105 transition-all duration-300 glow-primary">
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-all duration-300">
                View Examples
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                <Download className="w-4 h-4 text-primary" />
                <span className="text-sm">Multiple Formats</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm">Custom Icons</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm">High Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">{/* Features Overview */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional codes with style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="glass hover:scale-105 transition-all duration-300 group">
              <CardHeader>
                <div className="p-3 rounded-xl gradient-primary glow-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Advanced QR Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create QR codes with custom colors, logos, error correction, and multiple download formats including SVG, PNG, and PDF.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Custom colors and styles</li>
                  <li>• Logo embedding</li>
                  <li>• Error correction levels</li>
                  <li>• Multiple export formats</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass hover:scale-105 transition-all duration-300 group">
              <CardHeader>
                <div className="p-3 rounded-xl gradient-secondary glow-secondary w-fit mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Multiple Barcode Types</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Support for all major barcode formats with customizable dimensions and professional output quality.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• CODE128, CODE39, EAN13</li>
                  <li>• UPC, ITF14, MSI formats</li>
                  <li>• Custom dimensions</li>
                  <li>• Print-ready quality</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass hover:scale-105 transition-all duration-300 group">
              <CardHeader>
                <div className="p-3 rounded-xl gradient-accent glow-accent w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Download your codes in multiple formats optimized for different use cases and platforms.
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• PNG for web and print</li>
                  <li>• SVG for scalable graphics</li>
                  <li>• PDF for documents</li>
                  <li>• High-resolution output</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Generator Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Start Creating Now
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose your preferred generator and create professional codes instantly
            </p>
          </div>

          <Card className="gradient-secondary/10 border-secondary/20 backdrop-blur-xl">
            <CardContent className="p-8">
              <Tabs defaultValue="qrcode" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-background/50 backdrop-blur-xl p-1 h-14">
                  <TabsTrigger value="qrcode" className="flex items-center gap-2 h-12 text-base font-medium data-[state=active]:gradient-primary data-[state=active]:text-white">
                    <QrCode className="w-5 h-5" />
                    QR Code Generator
                  </TabsTrigger>
                  <TabsTrigger value="barcode" className="flex items-center gap-2 h-12 text-base font-medium data-[state=active]:gradient-primary data-[state=active]:text-white">
                    <BarChart3 className="w-5 h-5" />
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
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Ready to Create Amazing Codes?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their code generation needs
          </p>
          <Button size="lg" className="gradient-primary hover:scale-105 transition-all duration-300 glow-primary px-8 py-6 text-lg font-semibold">
            Get Started Free
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl gradient-primary glow-primary">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  QR & Barcode Studio
                </div>
                <p className="text-sm text-muted-foreground">Professional code generation made simple</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-muted-foreground text-sm">
                Built with modern web technologies for reliable code generation
              </p>
              <div className="flex items-center justify-center md:justify-end gap-4 mt-2 text-xs text-muted-foreground">
                <span>High Quality</span>
                <span>•</span>
                <span>Multiple Formats</span>
                <span>•</span>
                <span>Custom Icons</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;