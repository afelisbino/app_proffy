import { LayoutDashboard, type LucideIcon, Speech, Shapes, Users, UserRoundPen, BookCheck, Unplug, MessageSquareText, MessagesSquare } from "lucide-react";

export type MenuSidebar = {
  titulo: string
  href: string
  icon?: LucideIcon
}

export interface GrupoItensSidebarProps {
  titulo: string;
  itens: Array<MenuSidebar>;
}

export type PermissoesUsuarioType = {
  permissoes: Array<GrupoItensSidebarProps>
}

export const permissoesAdmin: PermissoesUsuarioType = {
  permissoes: [
    {
      titulo: 'Gestão da escola',
      itens: [
        {
          titulo: 'Painel',
          href: '/admin/painel',
          icon: LayoutDashboard
        },
        {
          titulo: 'Mensagens enviadas',
          href: '/admin/notificacao',
          icon: MessagesSquare
        },
        {
          titulo: 'Turmas',
          href: '/admin/turmas',
          icon: Users
        },
        {
          titulo: 'Usuários',
          href: '/admin/usuarios',
          icon: UserRoundPen
        },
        {
          titulo: 'Disciplinas',
          href: '/admin/disciplinas',
          icon: BookCheck
        },
        {
          titulo: 'Modelos de mensagens',
          href: '/admin/modelo_mensagens',
          icon: MessageSquareText
        },
        {
          titulo: 'API WhatsApp',
          href: '/admin/whatsapp',
          icon: Unplug
        }
      ]
    },
    {
      titulo: 'Diário da turma',
      itens: [
        {
          titulo: 'Chamada',
          href: '/classe/chamada',
          icon: Speech
        },
        {
          titulo: 'Atividades',
          href: '/classe/diario',
          icon: Shapes
        }
      ]
    }
  ]
}

export const permissionTeacher: PermissoesUsuarioType = {
  permissoes: [
    {
      titulo: 'Diário da turma',
      itens: [
        {
          titulo: 'Chamada',
          href: '/classe/chamada',
          icon: Speech
        },
        {
          titulo: 'Atividades',
          href: '/classe/diario',
          icon: Shapes
        }
      ]
    }
  ]
}

