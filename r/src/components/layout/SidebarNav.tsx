
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  BrainCircuit,
  LineChart,
  LibraryBig,
  Watch,
  ClipboardList,
  User,
  LogIn,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'AI Symptom Checker', icon: BrainCircuit },
  { href: '/symptom-tracker', label: 'Symptom Tracker', icon: LineChart },
  { href: '/prescriptions', label: 'Prescriptions', icon: ClipboardList },
  { href: '/resources', label: 'Resource Directory', icon: LibraryBig },
  { href: '/wearables', label: 'Wearable Devices', icon: Watch },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/auth/signin', label: 'Sign In', icon: LogIn },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="p-2">
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={{ children: item.label, side: 'right', align: 'center' }}
            className={cn(
              'justify-start',
              pathname === item.href
                ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground'
                : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
