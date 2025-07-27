import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { featuredProgramsService, FeaturedProgram, storageService } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

const FeaturedProgramsManager: React.FC = () => {
  const [programs, setPrograms] = useState<FeaturedProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<FeaturedProgram | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time_schedule: '',
    category: '',
    is_active: true,
    order_index: 0
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const data = await featuredProgramsService.getAll();
      setPrograms(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar programas em destaque",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await storageService.uploadImage(imageFile, 'programs');
      }

      await featuredProgramsService.create({
        ...formData,
        image_url: imageUrl
      });

      toast({
        title: "Sucesso",
        description: "Programa criado com sucesso"
      });

      resetForm();
      setModalOpen(false);
      loadPrograms();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar programa",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram) return;

    setLoading(true);

    try {
      let updates: Partial<FeaturedProgram> = { ...formData };

      if (imageFile) {
        const imageUrl = await storageService.uploadImage(imageFile, 'programs');
        updates.image_url = imageUrl;
      }

      await featuredProgramsService.update(editingProgram.id!, updates);

      toast({
        title: "Sucesso",
        description: "Programa atualizado com sucesso"
      });

      resetForm();
      setEditingProgram(null);
      setModalOpen(false);
      loadPrograms();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar programa",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este programa?')) return;

    try {
      await featuredProgramsService.delete(id);
      toast({
        title: "Sucesso",
        description: "Programa excluído com sucesso"
      });
      loadPrograms();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir programa",
        variant: "destructive"
      });
    }
  };

  const moveProgram = async (program: FeaturedProgram, direction: 'up' | 'down') => {
    const currentIndex = program.order_index;
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    try {
      await featuredProgramsService.update(program.id!, { order_index: newIndex });
      loadPrograms();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao reordenar programa",
        variant: "destructive"
      });
    }
  };

  const toggleProgramActive = async (program: FeaturedProgram) => {
    try {
      await featuredProgramsService.update(program.id!, { is_active: !program.is_active });
      loadPrograms();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao alterar status do programa",
        variant: "destructive"
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      time_schedule: '',
      category: '',
      is_active: true,
      order_index: 0
    });
    setImageFile(null);
    setImagePreview('');
  };

  const openEditModal = (program: FeaturedProgram) => {
    setFormData({
      title: program.title,
      description: program.description || '',
      time_schedule: program.time_schedule || '',
      category: program.category || '',
      is_active: program.is_active,
      order_index: program.order_index
    });
    setImagePreview(program.image_url || '');
    setEditingProgram(program);
    setModalOpen(true);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Programas em Destaque</h2>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingProgram(null); }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Programa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProgram ? 'Editar Programa' : 'Criar Programa'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={editingProgram ? handleUpdateProgram : handleCreateProgram} className="space-y-4">
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
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="time_schedule">Horário</Label>
                <Input
                  id="time_schedule"
                  value={formData.time_schedule}
                  onChange={(e) => setFormData({ ...formData, time_schedule: e.target.value })}
                  placeholder="Ex: 20:00"
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: Música, Notícias, etc."
                />
              </div>
              <div>
                <Label htmlFor="image">Imagem</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
                )}
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
                {editingProgram ? 'Atualizar' : 'Criar'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {programs.map((program) => (
          <Card key={program.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                {program.image_url && (
                  <img src={program.image_url} alt={program.title} className="h-16 w-16 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{program.title}</h3>
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                  <p className="text-sm">{program.time_schedule} • {program.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => moveProgram(program, 'up')}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => moveProgram(program, 'down')}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toggleProgramActive(program)}>
                    {program.is_active ? 'Desativar' : 'Ativar'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openEditModal(program)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteProgram(program.id!)}>
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

export default FeaturedProgramsManager;