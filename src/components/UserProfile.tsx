import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { 
  Button, 
  Card, 
  TextInput,
  Text,
  Avatar,
  Divider,
  ActivityIndicator,
  Surface,
} from 'react-native-paper';
import { useAuthWithStore } from '../hooks/useAuthWithStore';
import { useAppStore } from '../stores/appStore';
import { useUpdateUser } from '../hooks/useUsers';

interface UserProfileProps {
  onLogout?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const { user, isLoading, logout, updateUser } = useAuthWithStore();
  const { addNotification, setLoading } = useAppStore();
  const updateUserMutation = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              onLogout?.();
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
            }
          },
        },
      ]
    );
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setLoading(true, 'Actualizando perfil...');
      
      const updatedUser = await updateUserMutation.mutateAsync({
        id: user.id,
        userData: editForm,
      });

      // Actualizar estado local
      updateUser(updatedUser);

      // Agregar notificación de éxito
      addNotification({
        type: 'success',
        title: 'Perfil actualizado',
        message: 'Tu perfil se ha actualizado correctamente',
      });

      setIsEditing(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar perfil';
      
      addNotification({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No hay información de usuario disponible</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header} elevation={1}>
        <Text variant="headlineLarge" style={styles.title}>Perfil de Usuario</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>Gestiona tu información personal</Text>
      </Surface>

      <View style={styles.profileSection}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.avatarContainer}>
              <Avatar.Text 
                size={80} 
                label={user.name.charAt(0).toUpperCase()} 
                style={styles.avatar}
              />
              <Text variant="headlineSmall" style={styles.userName}>{user.name}</Text>
              <Text variant="bodyMedium" style={styles.userRole}>Rol: {user.role}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>Información Personal</Text>
            <Divider style={styles.divider} />
            {isEditing ? (
              <View style={styles.editForm}>
                <TextInput
                  label="Nombre"
                  value={editForm.name}
                  onChangeText={(text) => setEditForm(prev => ({ ...prev, name: text }))}
                  placeholder="Tu nombre"
                  style={styles.input}
                />
                
                <TextInput
                  label="Email"
                  value={editForm.email}
                  onChangeText={(text) => setEditForm(prev => ({ ...prev, email: text }))}
                  placeholder="Tu email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />

                <View style={styles.buttonRow}>
                  <Button 
                    mode="outlined" 
                    onPress={handleCancelEdit}
                    style={styles.actionButton}
                  >
                    Cancelar
                  </Button>
                  
                  <Button 
                    mode="contained" 
                    onPress={handleSaveProfile}
                    disabled={updateUserMutation.isPending}
                    loading={updateUserMutation.isPending}
                    style={styles.actionButton}
                  >
                    Guardar
                  </Button>
                </View>
              </View>
            ) : (
              <View style={styles.infoDisplay}>
                <View style={styles.infoRow}>
                  <Text variant="bodyMedium" style={styles.infoLabel}>Nombre:</Text>
                  <Text variant="bodyLarge" style={styles.infoValue}>{user.name}</Text>
                </View>
                
                <Divider style={styles.divider} />
                
                <View style={styles.infoRow}>
                  <Text variant="bodyMedium" style={styles.infoLabel}>Email:</Text>
                  <Text variant="bodyLarge" style={styles.infoValue}>{user.email}</Text>
                </View>
                
                <Divider style={styles.divider} />
                
                <View style={styles.infoRow}>
                  <Text variant="bodyMedium" style={styles.infoLabel}>Rol:</Text>
                  <Text variant="bodyLarge" style={styles.infoValue}>{user.role}</Text>
                </View>
                
                <Divider style={styles.divider} />
                
                <View style={styles.infoRow}>
                  <Text variant="bodyMedium" style={styles.infoLabel}>Miembro desde:</Text>
                  <Text variant="bodyLarge" style={styles.infoValue}>
                    {new Date(user.createdAt).toLocaleDateString('es-ES')}
                  </Text>
                </View>

                <Button 
                  mode="contained" 
                  onPress={() => setIsEditing(true)}
                  style={styles.editButton}
                >
                  Editar Perfil
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>Acciones</Text>
            <Divider style={styles.divider} />
            <Button 
              mode="contained" 
              onPress={handleLogout}
              buttonColor="#FF3B30"
              textColor="white"
              style={styles.logoutButton}
            >
              Cerrar Sesión
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    padding: 20,
    marginBottom: 16,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
  },
  profileSection: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 12,
  },
  userName: {
    marginBottom: 4,
  },
  userRole: {
    opacity: 0.7,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  editForm: {
    gap: 16,
  },
  input: {
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
  infoDisplay: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    opacity: 0.7,
  },
  infoValue: {
    fontWeight: '600',
  },
  editButton: {
    marginTop: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
});
