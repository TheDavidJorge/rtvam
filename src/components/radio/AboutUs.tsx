
import React from 'react';

const AboutUs = () => {
  return (
    <div className="space-y-6">
      <h2 className="section-title">Sobre Nós</h2>
      
      <div className="prose max-w-none">
        <p>
          A Rádio Académica de Moçambique é um projeto da Universidade Alberto Chipande (UNIAC),
          criado com o objetivo de proporcionar aos estudantes uma plataforma de expressão,
          aprendizagem prática e comunicação com a comunidade académica e a sociedade em geral.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3 text-rtam-blue">Nossa Missão</h3>
        <p>
          Servir como um laboratório vivo para os estudantes de comunicação, jornalismo e 
          áreas afins, além de promover a disseminação de conhecimento, cultura e informação
          relevante para a comunidade académica e para a sociedade moçambicana.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3 text-rtam-blue">Nossa Visão</h3>
        <p>
          Ser reconhecida como uma referência entre as rádios universitárias de Moçambique,
          destacando-se pela qualidade da programação, pelo compromisso com a formação
          académica e pela relevância social dos conteúdos produzidos.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3 text-rtam-blue">História</h3>
        <p>
          Fundada em 2015, a Rádio Académica começou como um pequeno projeto do curso de
          Comunicação da UNIAC. Com o tempo, expandiu-se e tornou-se uma iniciativa institucional,
          ganhando um estúdio próprio e equipamentos profissionais para transmissão em FM.
        </p>
        <p>
          Em 2018, obtivemos a licença para transmitir na frequência 88.0 FM, ampliando nosso
          alcance para toda a região de Maputo. Desde então, temos trabalhado continuamente
          para melhorar nossa infraestrutura e a qualidade da nossa programação.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3 text-rtam-blue">Nossa Equipa</h3>
        <p>
          Nossa equipa é composta principalmente por estudantes dos cursos de Comunicação, 
          Jornalismo, Marketing e áreas afins da UNIAC, sob a orientação de professores e 
          profissionais experientes do setor de radiodifusão.
        </p>
        <p>
          Todos os locutores, produtores e técnicos recebem formação específica para atuar
          na rádio, combinando conhecimentos teóricos adquiridos em sala de aula com a 
          experiência prática no estúdio.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mt-8 border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-rtam-blue">Contacte-nos</h3>
          <ul className="space-y-2">
            <li><strong>Endereço:</strong> Campus Universitário UNIAC, Av. da Universidade, Maputo</li>
            <li><strong>Telefone:</strong> +258 21 123 456</li>
            <li><strong>E-mail:</strong> radio@uniac.ac.mz</li>
            <li><strong>Redes Sociais:</strong> @radioacademicauniac</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
