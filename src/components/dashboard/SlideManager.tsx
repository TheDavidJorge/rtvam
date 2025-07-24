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
import { uploadImage } from '@/services/storageService';

interface SlideData {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  active: boolean;
}

const SlideManager = () => {
  const { toast } = useToast();
  const [slides, setSlides] = useState<SlideData[]>([
    {
      id: '1',
      title: 'Notícias ao Meio Dia',
      description: 'O seu programa noticioso diário com todas as novidades nacionais e internacionais.',
      image: 'https://rtvam.co.mz/wp-content/uploads/2025/07/NOTICIAS-AO-MEIO-DIA-1-3.jpg',
      order: 1,
      active: true
    },
    {
      id: '2',
      title: 'Olhar Político',
      description: 'Análises profundas e debates sobre os principais temas políticos da atualidade.',
      image: 'https://rtvam.co.mz/wp-content/uploads/2025/07/olharpolitico1-scaled.jpg',
      order: 2,
      active: true
    },
    {
      id: '3',
      title: 'Impacto Semanal',
      description: 'Resumo semanal dos acontecimentos mais importantes em Moçambique e no mundo.',
      image: 'https://rtvam.co.mz/wp-content/uploads/2025/07/impacosemanalcover2-scaled.png',
      order: 3,
      active: true
    }
  ]);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<SlideData | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      let imageUrl = formData.image;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'slides');
      }

      const newSlide: SlideData = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        image: imageUrl,
        order: slides.length + 1,
        active: true
      };

      setSlides(prev => [...prev, newSlide]);
      
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
      setLoading(false);
    }
  };

  const handleUpdateSlide = async () => {
    if (!editingSlide || !formData.title || !formData.description) return;

    try {
      setLoading(true);
      let imageUrl = formData.image;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'slides');
      }

      setSlides(prev => prev.map(slide => 
        slide.id === editingSlide.id 
          ? { ...slide, title: formData.title, description: formData.description, image: imageUrl }
          : slide
      ));

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
      setLoading(false);
    }
  };

  const handleDeleteSlide = (slideId: string) => {
    if (!window.confirm('Tem certeza que deseja apagar este slide?')) return;
    
    setSlides(prev => prev.filter(slide => slide.id !== slideId));
    toast({
      title: "Sucesso",
      description: "Slide apagado com sucesso",
    });
  };

  const moveSlide = (slideId: string, direction: 'up' | 'down') => {
    setSlides(prev => {
      const slideIndex = prev.findIndex(s => s.id === slideId);
      if (slideIndex === -1) return prev;
      
      const newSlides = [...prev];
      const targetIndex = direction === 'up' ? slideIndex - 1 : slideIndex + 1;
      
      if (targetIndex < 0 || targetIndex >= newSlides.length) return prev;
      
      [newSlides[slideIndex], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[slideIndex]];
      
      return newSlides.map((slide, index) => ({ ...slide, order: index + 1 }));
    });
  };

  const toggleSlideActive = (slideId: string) => {
    setSlides(prev => prev.map(slide => 
      slide.id === slideId ? { ...slide, active: !slide.active } : slide
    ));
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
    setFormData({ title: '', description: '', image: '' });
    setImageFile(null);
    setPreviewImage('');
  };

  const openEditModal = (slide: SlideData) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      description: slide.description,
      image: slide.image
    });
    setPreviewImage(slide.image);
  };

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
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
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
              <Button onClick={handleCreateSlide} disabled={loading} className="btn-primary">
                {loading ? 'Criando...' : 'Criar Slide'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Slides grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide, index) => (
          <Card key={slide.id} className={`card-modern ${!slide.active ? 'opacity-60' : ''}`}>
            <CardHeader className="p-0">
              <div className="relative h-48 rounded-t-[var(--radius)] overflow-hidden">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveSlide(slide.id, 'up')}
                    disabled={index === 0}
                    className="p-1 h-auto bg-black/20 border-white/20 text-white hover:bg-black/40"
                  >
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveSlide(slide.id, 'down')}
                    disabled={index === slides.length - 1}
                    className="p-1 h-auto bg-black/20 border-white/20 text-white hover:bg-black/40"
                  >
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant={slide.active ? "default" : "outline"}
                    onClick={() => toggleSlideActive(slide.id)}
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
                <span className="text-xs text-muted-foreground">Ordem: {slide.order}</span>
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
                    onClick={() => handleDeleteSlide(slide.id)}
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
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
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
            <Button onClick={handleUpdateSlide} disabled={loading} className="btn-primary">
              {loading ? 'Atualizando...' : 'Atualizar Slide'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SlideManager;