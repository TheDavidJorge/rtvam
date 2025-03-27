
import React from 'react';

// Dados simplificados dos locutores
const presenters = [
  { 
    name: "Ana Silva", 
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop", 
    program: "Bom Dia Beira",
  },
  { 
    name: "Carlos Menezes", 
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop", 
    program: "Explosão Matinal",
  },
  { 
    name: "Teresa Machava", 
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5ec751df9?q=80&w=300&auto=format&fit=crop", 
    program: "Espaço Empresarial",
  },
  { 
    name: "Paulo Santos", 
    photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300&auto=format&fit=crop", 
    program: "Giro 88 / Música ao Seu Gosto",
  },
  { 
    name: "Helena Buque", 
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop", 
    program: "A Voz do Povo / Amor Além da Palavra",
  },
  { 
    name: "Alexandre Maputo", 
    photo: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?q=80&w=300&auto=format&fit=crop", 
    program: "Personalidades Académicas / Figuras que Marcam", 
  },
  { 
    name: "João Mutondo", 
    photo: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?q=80&w=300&auto=format&fit=crop", 
    program: "Trânsito Seguro / Desporto Total",
  },
  { 
    name: "Joana Tembe", 
    photo: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=300&auto=format&fit=crop", 
    program: "Noitada Acadêmica / Conexão Jovem",
  },
  { 
    name: "Maria José", 
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop", 
    program: "Alô Amiguinho / As Mais Ouvidas da Semana",
  },
  { 
    name: "Filipe Costa", 
    photo: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=300&auto=format&fit=crop", 
    program: "Debate Acadêmico / Impacto Semanal",
  },
  { 
    name: "Marta Luís", 
    photo: "https://images.unsplash.com/photo-1597175587481-3a648c089afc?q=80&w=300&auto=format&fit=crop", 
    program: "Consultório Psicológico",
  },
  { 
    name: "André Matola", 
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", 
    program: "Artista da Semana",
  },
  { 
    name: "DJ Académico", 
    photo: "https://images.unsplash.com/photo-1597175587481-3a648c089afc?q=80&w=300&auto=format&fit=crop", 
    program: "Acadêmica In The Mix / Músicas Variadas",
  },
  { 
    name: "Fábio Murima", 
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop", 
    program: "Intensidade Acadêmica",
  },
  { 
    name: "Rosa Mateus", 
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5ec751df9?q=80&w=300&auto=format&fit=crop", 
    program: "Andhu Athu (Nossa Gente)",
  },
];

const Presenters = () => {
  return (
    <div className="space-y-6">
      <h2 className="section-title">Caras da Rádio</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              <p className="text-gray-700 text-sm mt-2">{presenter.program}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Presenters;
