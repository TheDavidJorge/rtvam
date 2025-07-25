import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Edit3, 
  Trash2, 
  Plus,
  Save,
  X,
  Eye,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { slidesService, storageService, type SlideData } from '@/services/supabaseService';

const SlideManager = () => {
  const { toast } = useToast();
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<SlideData | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      setLoading(true);
      const data = await slidesService.getAll();
      setSlides(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar slides",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSlide = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      let imageUrl = formData.image_url;
      
      if (imageFile) {
        imageUrl = await storageService.uploadImage(imageFile, 'slides');
      }

      const newSlide = {
        title: formData.title,
        description: formData.description,
        image_url: imageUrl,
        order_index: slides.length,
        is_active: true
      };

      await slidesService.create(newSlide);
      await loadSlides();
      
      toast({
        title: "Sucesso",
        description: "Slide criado com sucesso",
      });

      setIsCreateModalOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar slide",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSlide = async () => {
    if (!editingSlide || !formData.title || !formData.description) return;

    try {
      setSubmitting(true);
      let imageUrl = formData.image_url;
      
      if (imageFile) {
        imageUrl = await storageService.uploadImage(imageFile, 'slides');
      }

      await slidesService.update(editingSlide.id!, {
        title: formData.title,
        description: formData.description,
        image_url: imageUrl
      });

      await loadSlides();

      toast({
        title: "Sucesso",
        description: "Slide atualizado com sucesso",
      });

      setEditingSlide(null);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar slide",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSlide = async (slideId: string) => {
    if (!window.confirm('Tem certeza que deseja apagar este slide?')) return;
    
    try {
      await slidesService.delete(slideId);
      await loadSlides();
      
      toast({
        title: "Sucesso",
        description: "Slide apagado com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao apagar slide",
        variant: "destructive",
      });
    }
  };

  const moveSlide = async (slideId: string, direction: 'up' | 'down') => {
    const slideIndex = slides.findIndex(s => s.id === slideId);
    if (slideIndex === -1) return;
    
    const targetIndex = direction === 'up' ? slideIndex - 1 : slideIndex + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    try {
      const slide = slides[slideIndex];
      const targetSlide = slides[targetIndex];
      
      await slidesService.update(slide.id!, { order_index: targetSlide.order_index });
      await slidesService.update(targetSlide.id!, { order_index: slide.order_index });
      
      await loadSlides();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao reordenar slide",
        variant: "destructive",
      });
    }
  };

  const toggleSlideActive = async (slideId: string) => {
    const slide = slides.find(s => s.id === slideId);
    if (!slide) return;

    try {
      await slidesService.update(slideId, { is_active: !slide.is_active });
      await loadSlides();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao alterar status do slide",
        variant: "destructive",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', image_url: '' });
    setImageFile(null);
    setPreviewImage('');
  };

  const openEditModal = (slide: SlideData) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      description: slide.description || '',
      image_url: slide.image_url
    });
    setPreviewImage(slide.image_url);
  };

  if (loading) {
    return <div className="p-8 text-center">Carregando slides...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Gestão de Slides</h2>
          <p className="text-muted-foreground">Gerencie os slides do carrossel principal</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Novo Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Slide</DialogTitle>
              <DialogDescription>Adicione um novo slide ao carrossel principal</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Título do slide"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Descrição do slide"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Imagem</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Input
                  placeholder="Ou URL da imagem"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                />
                {previewImage && (
                  <div className="mt-2">
                    <img src={previewImage} alt="Preview" className="max-w-full h-40 object-cover rounded-[var(--radius)]" />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateSlide} disabled={submitting} className="btn-primary">
                {submitting ? 'Criando...' : 'Criar Slide'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Slides grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide, index) => (
          <Card key={slide.id} className={`card-modern ${!slide.is_active ? 'opacity-60' : ''}`}>
            <CardHeader className="p-0">
              <div className="relative h-48 rounded-t-[var(--radius)] overflow-hidden">
                <img 
                  src={slide.image_url} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveSlide(slide.id!, 'up')}
                    disabled={index === 0}
                    className="p-1 h-auto bg-black/20 border-white/20 text-white hover:bg-black/40"
                  >
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveSlide(slide.id!, 'down')}
                    disabled={index === slides.length - 1}
                    className="p-1 h-auto bg-black/20 border-white/20 text-white hover:bg-black/40"
                  >
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant={slide.is_active ? "default" : "outline"}
                    onClick={() => toggleSlideActive(slide.id!)}
                    className="p-1 h-auto bg-black/20 border-white/20 text-white hover:bg-black/40"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{slide.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{slide.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Ordem: {slide.order_index}</span>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => openEditModal(slide)}
                    className="btn-ghost"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteSlide(slide.id!)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingSlide} onOpenChange={() => setEditingSlide(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Slide</DialogTitle>
            <DialogDescription>Edite as informações do slide</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Título do slide"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="Descrição do slide"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Imagem</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Input
                placeholder="Ou URL da imagem"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              />
              {previewImage && (
                <div className="mt-2">
                  <img src={previewImage} alt="Preview" className="max-w-full h-40 object-cover rounded-[var(--radius)]" />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSlide(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateSlide} disabled={submitting} className="btn-primary">
              {submitting ? 'Atualizando...' : 'Atualizar Slide'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SlideManager;