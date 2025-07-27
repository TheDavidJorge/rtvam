import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { socialFeedsService, SocialFeed } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown, Twitter, Youtube } from 'lucide-react';

const SocialFeedsManager: React.FC = () => {
  const [feeds, setFeeds] = useState<SocialFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFeed, setEditingFeed] = useState<SocialFeed | null>(null);
  const [formData, setFormData] = useState({
    type: 'twitter' as 'twitter' | 'video',
    title: '',
    url: '',
    embed_code: '',
    is_active: true,
    order_index: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = async () => {
    try {
      const data = await socialFeedsService.getAll();
      setFeeds(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar feeds sociais",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await socialFeedsService.create(formData);

      toast({
        title: "Sucesso",
        description: "Feed social criado com sucesso"
      });

      resetForm();
      setModalOpen(false);
      loadFeeds();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar feed social",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFeed) return;

    setLoading(true);

    try {
      await socialFeedsService.update(editingFeed.id!, formData);

      toast({
        title: "Sucesso",
        description: "Feed social atualizado com sucesso"
      });

      resetForm();
      setEditingFeed(null);
      setModalOpen(false);
      loadFeeds();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar feed social",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeed = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este feed?')) return;

    try {
      await socialFeedsService.delete(id);
      toast({
        title: "Sucesso",
        description: "Feed social excluído com sucesso"
      });
      loadFeeds();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir feed social",
        variant: "destructive"
      });
    }
  };

  const moveFeed = async (feed: SocialFeed, direction: 'up' | 'down') => {
    const currentIndex = feed.order_index;
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    try {
      await socialFeedsService.update(feed.id!, { order_index: newIndex });
      loadFeeds();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reordenar feed",
        variant: "destructive"
      });
    }
  };

  const toggleFeedActive = async (feed: SocialFeed) => {
    try {
      await socialFeedsService.update(feed.id!, { is_active: !feed.is_active });
      loadFeeds();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao alterar status do feed",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'twitter',
      title: '',
      url: '',
      embed_code: '',
      is_active: true,
      order_index: 0
    });
  };

  const openEditModal = (feed: SocialFeed) => {
    setFormData({
      type: feed.type,
      title: feed.title,
      url: feed.url,
      embed_code: feed.embed_code || '',
      is_active: feed.is_active,
      order_index: feed.order_index
    });
    setEditingFeed(feed);
    setModalOpen(true);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Feeds Sociais</h2>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingFeed(null); }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Feed
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingFeed ? 'Editar Feed Social' : 'Criar Feed Social'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={editingFeed ? handleUpdateFeed : handleCreateFeed} className="space-y-4">
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select value={formData.type} onValueChange={(value: 'twitter' | 'video') => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
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
              <div>
                <Label htmlFor="embed_code">Código de Incorporação (opcional)</Label>
                <Textarea
                  id="embed_code"
                  value={formData.embed_code}
                  onChange={(e) => setFormData({ ...formData, embed_code: e.target.value })}
                  placeholder="Cole aqui o código de incorporação do Twitter ou YouTube"
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
                {editingFeed ? 'Atualizar' : 'Criar'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {feeds.map((feed) => (
          <Card key={feed.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {feed.type === 'twitter' ? (
                    <Twitter className="h-8 w-8 text-blue-500" />
                  ) : (
                    <Youtube className="h-8 w-8 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{feed.title}</h3>
                  <p className="text-sm text-muted-foreground">{feed.url}</p>
                  <p className="text-xs text-muted-foreground">Tipo: {feed.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => moveFeed(feed, 'up')}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => moveFeed(feed, 'down')}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toggleFeedActive(feed)}>
                    {feed.is_active ? 'Desativar' : 'Ativar'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openEditModal(feed)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteFeed(feed.id!)}>
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

export default SocialFeedsManager;