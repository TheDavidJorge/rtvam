import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Palette, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Save,
  Upload,
  Edit3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const SiteSettings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    site: {
      title: 'Rádio e Televisão Académica de Moçambique',
      description: 'A sua fonte de informação e entretenimento em Moçambique',
      keywords: 'rádio, televisão, notícias, moçambique, académica',
      logo: '/lovable-uploads/143b33e3-d9cb-4db6-8e79-8cdb091a0a1c.png',
      favicon: '/favicon.ico',
      language: 'pt',
      timezone: 'Africa/Maputo'
    },
    contact: {
      email: 'info@rtvam.co.mz',
      phone: '+258 84 123 4567',
      address: 'Beira, Moçambique',
      workingHours: 'Segunda-Sexta: 08:00-18:00'
    },
    social: {
      facebook: 'https://facebook.com/rtvam',
      twitter: 'https://twitter.com/rtvam',
      instagram: 'https://instagram.com/rtvam',
      youtube: 'https://youtube.com/rtvam'
    },
    features: {
      comments: true,
      newsletter: true,
      analytics: true,
      maintenance: false,
      geoLocation: true
    },
    appearance: {
      theme: 'system',
      primaryColor: '#2563eb',
      accentColor: '#3b82f6',
      headerStyle: 'modern',
      footerStyle: 'compact'
    }
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sucesso",
        description: `Configurações de ${section} guardadas com sucesso`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao guardar configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Configurações do Site</h2>
        <p className="text-muted-foreground">Gerencie todas as configurações do website</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="features">Funcionalidades</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Informações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Site</Label>
                  <Input
                    id="title"
                    value={settings.site.title}
                    onChange={(e) => updateSetting('site', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select 
                    value={settings.site.language} 
                    onValueChange={(value) => updateSetting('site', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Site</Label>
                <Textarea
                  id="description"
                  value={settings.site.description}
                  onChange={(e) => updateSetting('site', 'description', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Palavras-chave (SEO)</Label>
                <Input
                  id="keywords"
                  value={settings.site.keywords}
                  onChange={(e) => updateSetting('site', 'keywords', e.target.value)}
                  placeholder="Separadas por vírgula"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Logo do Site</Label>
                  <div className="flex items-center gap-3">
                    <img 
                      src={settings.site.logo} 
                      alt="Logo" 
                      className="w-12 h-12 object-contain border rounded"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Alterar Logo
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select 
                    value={settings.site.timezone} 
                    onValueChange={(value) => updateSetting('site', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Maputo">Africa/Maputo</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => handleSave('geral')} disabled={loading} className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Guardando...' : 'Guardar Configurações'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Informações de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.contact.email}
                    onChange={(e) => updateSetting('contact', 'email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={settings.contact.phone}
                    onChange={(e) => updateSetting('contact', 'phone', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Textarea
                  id="address"
                  value={settings.contact.address}
                  onChange={(e) => updateSetting('contact', 'address', e.target.value)}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hours">Horário de Funcionamento</Label>
                <Input
                  id="hours"
                  value={settings.contact.workingHours}
                  onChange={(e) => updateSetting('contact', 'workingHours', e.target.value)}
                />
              </div>

              <Button onClick={() => handleSave('contacto')} disabled={loading} className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Guardando...' : 'Guardar Contactos'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Facebook className="h-5 w-5" />
                Redes Sociais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <Input
                    placeholder="https://facebook.com/..."
                    value={settings.social.facebook}
                    onChange={(e) => updateSetting('social', 'facebook', e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-blue-400" />
                  <Input
                    placeholder="https://twitter.com/..."
                    value={settings.social.twitter}
                    onChange={(e) => updateSetting('social', 'twitter', e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-pink-600" />
                  <Input
                    placeholder="https://instagram.com/..."
                    value={settings.social.instagram}
                    onChange={(e) => updateSetting('social', 'instagram', e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Youtube className="h-5 w-5 text-red-600" />
                  <Input
                    placeholder="https://youtube.com/..."
                    value={settings.social.youtube}
                    onChange={(e) => updateSetting('social', 'youtube', e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('redes sociais')} disabled={loading} className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Guardando...' : 'Guardar Redes Sociais'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Funcionalidades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="comments">Sistema de Comentários</Label>
                    <p className="text-sm text-muted-foreground">Permitir comentários nos posts</p>
                  </div>
                  <Switch
                    id="comments"
                    checked={settings.features.comments}
                    onCheckedChange={(checked) => updateSetting('features', 'comments', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newsletter">Newsletter</Label>
                    <p className="text-sm text-muted-foreground">Sistema de subscrição de newsletter</p>
                  </div>
                  <Switch
                    id="newsletter"
                    checked={settings.features.newsletter}
                    onCheckedChange={(checked) => updateSetting('features', 'newsletter', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Analytics</Label>
                    <p className="text-sm text-muted-foreground">Rastreamento de estatísticas</p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={settings.features.analytics}
                    onCheckedChange={(checked) => updateSetting('features', 'analytics', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance">Modo de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">Ativar página de manutenção</p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={settings.features.maintenance}
                    onCheckedChange={(checked) => updateSetting('features', 'maintenance', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="geolocation">Geolocalização</Label>
                    <p className="text-sm text-muted-foreground">Detectar localização dos visitantes</p>
                  </div>
                  <Switch
                    id="geolocation"
                    checked={settings.features.geoLocation}
                    onCheckedChange={(checked) => updateSetting('features', 'geoLocation', checked)}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('funcionalidades')} disabled={loading} className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Guardando...' : 'Guardar Funcionalidades'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema</Label>
                  <Select 
                    value={settings.appearance.theme} 
                    onValueChange={(value) => updateSetting('appearance', 'theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="headerStyle">Estilo do Cabeçalho</Label>
                  <Select 
                    value={settings.appearance.headerStyle} 
                    onValueChange={(value) => updateSetting('appearance', 'headerStyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Moderno</SelectItem>
                      <SelectItem value="classic">Clássico</SelectItem>
                      <SelectItem value="minimal">Minimalista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Cor Primária</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                      className="w-16 h-10 p-1 rounded"
                    />
                    <Input
                      value={settings.appearance.primaryColor}
                      onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Cor de Destaque</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="accentColor"
                      type="color"
                      value={settings.appearance.accentColor}
                      onChange={(e) => updateSetting('appearance', 'accentColor', e.target.value)}
                      className="w-16 h-10 p-1 rounded"
                    />
                    <Input
                      value={settings.appearance.accentColor}
                      onChange={(e) => updateSetting('appearance', 'accentColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave('aparência')} disabled={loading} className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Guardando...' : 'Guardar Aparência'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettings;