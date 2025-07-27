import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { socialLinksService, SocialLink } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const SocialLinksManager: React.FC = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon_name: '',
    is_active: true,
    order_index: 0
  });
  const { toast } = useToast();

  const platformOptions = [
    { value: 'facebook', label: 'Facebook', icon: Facebook },
    { value: 'twitter', label: 'Twitter', icon: Twitter },
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'youtube', label: 'YouTube', icon: Youtube },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  ];

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const data = await socialLinksService.getAll();
      setLinks(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar links sociais",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await socialLinksService.create(formData);

      toast({
        title: "Sucesso",
        description: "Link social criado com sucesso"
      });

      resetForm();
      setModalOpen(false);
      loadLinks();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar link social",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink) return;

    setLoading(true);

    try {
      await socialLinksService.update(editingLink.id!, formData);

      toast({
        title: "Sucesso",
        description: "Link social atualizado com sucesso"
      });

      resetForm();
      setEditingLink(null);
      setModalOpen(false);
      loadLinks();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar link social",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este link?')) return;

    try {
      await socialLinksService.delete(id);
      toast({
        title: "Sucesso",
        description: "Link social excluído com sucesso"
      });
      loadLinks();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir link social",
        variant: "destructive"
      });
    }
  };

  const moveLink = async (link: SocialLink, direction: 'up' | 'down') => {
    const currentIndex = link.order_index;
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    try {
      await socialLinksService.update(link.id!, { order_index: newIndex });
      loadLinks();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reordenar link",
        variant: "destructive"
      });
    }
  };

  const toggleLinkActive = async (link: SocialLink) => {
    try {
      await socialLinksService.update(link.id!, { is_active: !link.is_active });
      loadLinks();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao alterar status do link",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      platform: '',
      url: '',
      icon_name: '',
      is_active: true,
      order_index: 0
    });
  };

  const openEditModal = (link: SocialLink) => {
    setFormData({
      platform: link.platform,
      url: link.url,
      icon_name: link.icon_name || '',
      is_active: link.is_active,
      order_index: link.order_index
    });
    setEditingLink(link);
    setModalOpen(true);
  };

  const getPlatformIcon = (platform: string) => {
    const platformOption = platformOptions.find(p => p.value === platform.toLowerCase());
    if (platformOption) {
      const IconComponent = platformOption.icon;
      return <IconComponent className="h-6 w-6" />;
    }
    return null;
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Links das Redes Sociais</h2>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingLink(null); }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Link
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingLink ? 'Editar Link Social' : 'Criar Link Social'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={editingLink ? handleUpdateLink : handleCreateLink} className="space-y-4">
              <div>
                <Label htmlFor="platform">Plataforma</Label>
                <Select value={formData.platform} onValueChange={(value) => setFormData({ ...formData, platform: value, icon_name: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    {platformOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <option.icon className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Ativo</Label>
              </div>
              <Button type="submit" disabled={loading}>
                {editingLink ? 'Atualizar' : 'Criar'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {links.map((link) => (
          <Card key={link.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getPlatformIcon(link.platform)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold capitalize">{link.platform}</h3>
                  <p className="text-sm text-muted-foreground">{link.url}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => moveLink(link, 'up')}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => moveLink(link, 'down')}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toggleLinkActive(link)}>
                    {link.is_active ? 'Desativar' : 'Ativar'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openEditModal(link)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteLink(link.id!)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksManager;