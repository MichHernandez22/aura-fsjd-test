import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  User,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen ">

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">Aura</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg
                    ${isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>        
      </div>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 bg-white border-b border-gray-200">
          <button
            type="button"
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 justify-between px-6">
            <div className="flex flex-1"/>

            <div className="flex items-center ml-4 lg:ml-6">

              {/* Perfil dropdown */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center ml-4 lg:ml-6">
                    <Avatar.Root className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <Avatar.Image
                        src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=0ea5e9&color=fff`}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-full w-full rounded-full"
                      />
                      <Avatar.Fallback className="text-primary-600 font-medium">
                        {user.firstName[0]}{user.lastName[0]}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                      {user.firstName} {user.lastName}
                    </span>
                    <ChevronDown className="ml-1 h-5 w-5 text-gray-400 hidden lg:block" />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[200px] z-50"
                    sideOffset={5}
                  >                    
                    <DropdownMenu.Item
                      onClick={logout}
                      className="px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 cursor-pointer outline-none"
                    >
                      Salir
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;