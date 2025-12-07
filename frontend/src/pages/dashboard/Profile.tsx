import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import { 
  User, 
  Calendar, 
  Save, 
  Camera,
} from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Dialog from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';

const profileSchema = yup.object({
  firstName: yup.string().min(2, 'El nombre debe ser de almenos 2 caracteres').required('Nombre es requerido'),
  lastName: yup.string().min(2, 'El apellido debe ser de almenos 2 caracteres').required('Apellido es requerido'),
  email: yup.string().email('Formato invalido').required('Email es requerido'),
});


const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  });

  const onProfileSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await updateProfile(data);
      toast.success('Perfil actualizado!');
    } catch (error) {
      toast.error('Fallo al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
  ];

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
        <p className="text-gray-600 mt-1">Aqui puedes modificar tus datos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden">
            <div className="p-8 bg-gradient-to-r from-primary-50 to-primary-100">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar.Root className="h-32 w-32 rounded-full border-4 border-white shadow-lg">
                    <Avatar.Image
                      src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=0ea5e9&color=fff&size=128`}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="h-full w-full rounded-full"
                    />
                    <Avatar.Fallback className="h-full w-full rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {user.firstName[0]}{user.lastName[0]}
                      </span>
                    </Avatar.Fallback>
                  </Avatar.Root>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{user.email}</p>
                <p className="text-gray-500 text-xs mt-2">
                  Creado {format(new Date(user.createdAt), 'MMMM yyyy')}
                </p>
              </div>
            </div>
            
            <nav className="p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg mb-1
                    ${activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <tab.icon className={`h-5 w-5 mr-3 ${activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}`} />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'profile' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Datos Personales</h3>
              
              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className={`
                          block w-full pl-10 pr-3 py-2.5 border rounded-lg shadow-sm
                          placeholder-gray-400 focus:outline-none focus:ring-2 
                          focus:ring-primary-500 focus:border-transparent sm:text-sm
                          ${profileErrors.firstName ? 'border-red-300' : 'border-gray-300'}
                        `}
                        {...registerProfile('firstName')}
                        disabled={isLoading}
                      />
                    </div>
                    {profileErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{profileErrors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className={`
                          block w-full pl-10 pr-3 py-2.5 border rounded-lg shadow-sm
                          placeholder-gray-400 focus:outline-none focus:ring-2 
                          focus:ring-primary-500 focus:border-transparent sm:text-sm
                          ${profileErrors.lastName ? 'border-red-300' : 'border-gray-300'}
                        `}
                        {...registerProfile('lastName')}
                        disabled={isLoading}
                      />
                    </div>
                    {profileErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{profileErrors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Creado
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={format(new Date(user.createdAt), 'MMMM d, yyyy')}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 sm:text-sm"
                      disabled
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary flex items-center"
                    disabled={isLoading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;