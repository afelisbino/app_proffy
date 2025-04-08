import { ArrowRightLeft, FilePlus, LayoutDashboard, type LucideIcon, Settings, Speech, NotepadText, NotebookPen, Shapes, Mails, Users } from "lucide-react";

export type MenuSidebar = {
  titulo: string
  href: string
  icon?:LucideIcon
}

export interface GrupoItensSidebarProps {
  titulo: string;
  icon?: LucideIcon;
  itens: Array<MenuSidebar>;
}

export type PermissoesUsuarioType = {
  grupo?: Array<GrupoItensSidebarProps>
  menu?: Array<MenuSidebar>
}

export const permissoesAdmin: PermissoesUsuarioType = {
  menu: [
    {
      titulo: 'Painel',
      href: '/admin/painel',
      icon: LayoutDashboard
    },
    {
      titulo: 'Mensagens enviadas',
      href: '/admin/notificacao',
      icon: Mails
    },
    {
      titulo: 'Turmas',
      href: '/admin/turmas',
      icon: Users
    },
    {
      titulo: 'Configurações',
      href: '/admin/escola/usuarios',
      icon: Settings
    }
  ],
  grupo: [
    {
      titulo: 'Diário de turma',
      icon: NotebookPen,
      itens: [
        {
          titulo: 'Chamada',
          href: '/admin/chamada',
          icon: Speech
        },
        {
          titulo: 'Atividades',
          href: '/admin/diario',
          icon: Shapes
        }
      ]
    }
  ]
}

export const permissionTeacher: PermissoesUsuarioType = {
  grupo: [
    {
      titulo: 'Diário de turma',
      icon: NotebookPen,
      itens: [
        {
          titulo: 'Chamada',
          href: '/admin/chamada',
          icon: Speech
        },
        {
          titulo: 'Atividades',
          href: '/admin/diario',
          icon: Shapes
        }
      ]
    }
  ]
}

