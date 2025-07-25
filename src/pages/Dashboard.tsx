import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  FileText, 
  BarChart3,
  Users,
  Eye,
  Settings,
  LogOut,
  Upload,
  Save,
  X
} from 'lucide-react';
import SlideManager from '@/components/dashboard/SlideManager';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import SiteSettings from '@/components/dashboard/SiteSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { postsService, storageService, type Post } from '@/services/supabaseService';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image_url: '',
    status: 'published' as 'published' | 'draft'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await postsService.getAll();
      setPosts(fetchedPosts);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      let imageUrl = formData.image_url;
      
      if (imageFile) {
        imageUrl = await storageService.uploadImage(imageFile, 'posts');
      }

      await postsService.create({
        title: formData.title,
        content: formData.content,
        category: formData.category,
        image_url: imageUrl,
        author_name: 'Admin',
        status: formData.status
      });

      toast({
        title: "Sucesso",
        description: "Post criado com sucesso",
      });

      setIsCreateModalOpen(false);
      resetForm();
      loadPosts();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Tem certeza que deseja apagar este post?')) return;

    try {
      await postsService.delete(postId);
      toast({
        title: "Sucesso",
        description: "Post apagado com sucesso",
      });
      loadPosts();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao apagar post",
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
    setFormData({
      title: '',
      content: '',
      category: '',
      image_url: '',
      status: 'published'
    });
    setImageFile(null);
    setPreviewImage('');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="bg-card border-b border-border/50 shadow-[var(--shadow-card)]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                <Settings className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Dashboard RTVAM
                </h1>
                <p className="text-sm text-muted-foreground">Gestão de Conteúdo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="btn-ghost">
                <Eye className="h-4 w-4 mr-2" />
                Ver Site
              </Button>
              <Button variant="outline" onClick={handleLogout} className="btn-secondary">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="slides">Slides</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="card-modern">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <FileText className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{posts.length}</div>
                </CardContent>
              </Card>
              <Card className="card-modern">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Publicados</CardTitle>
                  <Eye className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {posts.filter(p => p.status === 'published').length}
                  </div>
                </CardContent>
              </Card>
              <Card className="card-modern">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
                  <Edit3 className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {posts.filter(p => p.status === 'draft').length}
                  </div>
                </CardContent>
              </Card>
              <Card className="card-modern">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {posts.reduce((acc, post) => acc + (post.likes || 0), 0)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Gestão de Posts</h2>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Novo Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Post</DialogTitle>
                    <DialogDescription>
                      Crie um novo post para publicar no site.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Título do post"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Textarea
                      placeholder="Conteúdo do post"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      rows={6}
                    />
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="noticias">Notícias</SelectItem>
                        <SelectItem value="desporto">Desporto</SelectItem>
                        <SelectItem value="politica">Política</SelectItem>
                        <SelectItem value="economia">Economia</SelectItem>
                        <SelectItem value="cultura">Cultura</SelectItem>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.status}
                      onValueChange={(value: 'published' | 'draft') => setFormData(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Publicar</SelectItem>
                        <SelectItem value="draft">Rascunho</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Button onClick={handleCreatePost} disabled={loading} className="btn-primary">
                      {loading ? 'Criando...' : 'Criar Post'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Posts List */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Posts Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Carregando...</div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum post encontrado. Crie seu primeiro post!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border border-border/30 rounded-[var(--radius)] card-hover">
                        <div className="flex items-center space-x-4">
                          {post.image_url && (
                            <img src={post.image_url} alt={post.title} className="w-16 h-16 object-cover rounded-[var(--radius)]" />
                          )}
                          <div>
                            <h3 className="font-semibold text-foreground">{post.title}</h3>
                            <p className="text-sm text-muted-foreground">{post.category}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {post.likes} likes • {post.comments_count} comentários
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="btn-ghost">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeletePost(post.id!)}
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="slides">
            <SlideManager />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;