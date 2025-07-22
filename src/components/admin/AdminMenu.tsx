import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const AdminMenu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="btn-ghost">
          <Shield className="h-4 w-4 mr-2" />
          Admin
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          <Settings className="h-4 w-4 mr-2" />
          Dashboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminMenu;