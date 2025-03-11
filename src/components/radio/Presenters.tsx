
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados de exemplo para os locutores
const presenterCategories = {
  "Jornalismo": [
    { 
      name: "Helena Buque", 
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop", 
      role: "Editora-chefe",
      description: "Jornalista com mais de 10 anos de experiência em rádio. Apresentadora do Jornal Académico e da Revista de Imprensa.",
      programs: ["Jornal Académico", "Revista de Imprensa", "Entrevista da Semana"]
    },
    { 
      name: "Filipe Costa", 
      photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop", 
      role: "Jornalista Sénior",
      description: "Especialista em análise política e debates. Mediador do programa Debate Académico.",
      programs: ["Debate Académico", "Entrevista Especial"]
    },
    { 
      name: "Maria José", 
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5ec751df9?q=80&w=300&auto=format&fit=crop", 
      role: "Jornalista",
      description: "Foco em temas sociais e comunitários. Apresentadora do Top 10 Semanal e Momento Espiritual.",
      programs: ["Top 10 Semanal", "Momento Espiritual"]
    },
  ],
  "Entretenimento": [
    { 
      name: "Ana Silva", 
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop", 
      role: "Apresentadora Principal",
      description: "Voz da manhã na RTAM. Apresentadora do programa Manhã Académica há 5 anos.",
      programs: ["Manhã Académica", "Top Hits"]
    },
    { 
      name: "Paulo Santos", 
      photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300&auto=format&fit=crop", 
      role: "Apresentador",
      description: "Especialista em música e cultura. Apresenta a Tarde Académica e Despertar Domingueiro.",
      programs: ["Tarde Académica", "Despertar Domingueiro"]
    },
    { 
      name: "Joana Tembe", 
      photo: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=300&auto=format&fit=crop", 
      role: "Apresentadora",
      description: "DJ e locutora da noite. Apresentadora do programa Noite Académica e Bom Dia Fim-de-Semana.",
      programs: ["Noite Académica", "Bom Dia Fim-de-Semana"]
    },
  ],
  "Especialistas": [
    { 
      name: "Hélio Chaves", 
      photo: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?q=80&w=300&auto=format&fit=crop", 
      role: "Especialista em Tecnologia",
      description: "Professor universitário e investigador. Apresenta o programa Tecnologia e Inovação.",
      programs: ["Tecnologia e Inovação", "Ciência em Destaque"]
    },
    { 
      name: "Marta Luís", 
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop", 
      role: "Especialista em Ambiente",
      description: "Bióloga e ativista ambiental. Apresentadora de Ambiente e Sustentabilidade.",
      programs: ["Ambiente e Sustentabilidade", "Ciência e Cultura", "Preparando a Semana"]
    },
    { 
      name: "João Mutondo", 
      photo: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?q=80&w=300&auto=format&fit=crop", 
      role: "Comentador Desportivo",
      description: "Ex-atleta e treinador. Apresentador do programa Desporto Universitário.",
      programs: ["Desporto Universitário", "Desporto ao Vivo", "Resumo Desportivo"]
    },
  ],
  "Música": [
    { 
      name: "André Matola", 
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", 
      role: "DJ e Produtor Musical",
      description: "Produtor musical e especialista em jazz e música africana.",
      programs: ["Jazz e Blues", "Música Africana", "Domingo Musical", "Almoço Musical"]
    },
    { 
      name: "Fábio Murima", 
      photo: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=300&auto=format&fit=crop", 
      role: "DJ",
      description: "Especialista em hip hop e música urbana. Apresentador do programa Hip Hop e R&B.",
      programs: ["Hip Hop e R&B", "Madrugada Académica", "Cinema e Séries"]
    },
    { 
      name: "DJ Académico", 
      photo: "https://images.unsplash.com/photo-1597175587481-3a648c089afc?q=80&w=300&auto=format&fit=crop", 
      role: "DJ Residente",
      description: "DJ oficial da RTAM, responsável pelas noites dançantes de sexta e sábado.",
      programs: ["Sexta Dançante", "Noite de Sábado"]
    },
  ]
};

const Presenters = () => {
  return (
    <div className="space-y-6">
      <h2 className="section-title">Nossos Locutores</h2>
      
      <Tabs defaultValue="Jornalismo" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          {Object.keys(presenterCategories).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.entries(presenterCategories).map(([category, presenters]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {presenters.map((presenter, index) => (
                <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <img 
                      src={presenter.photo} 
                      alt={presenter.name}
                      className="w-full h-64 object-cover object-center"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl text-rtam-blue-dark">{presenter.name}</h3>
                    <p className="text-rtam-red font-medium mb-2">{presenter.role}</p>
                    <p className="text-gray-700 text-sm mb-4">{presenter.description}</p>
                    
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">Programas:</h4>
                    <ul className="text-sm text-gray-600">
                      {presenter.programs.map((program, idx) => (
                        <li key={idx} className="mb-1 last:mb-0">• {program}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Presenters;
