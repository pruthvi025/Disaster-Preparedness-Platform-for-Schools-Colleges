// Mock data for the application without database dependency

export interface School {
  id: string;
  name: string;
  district: string;
  udiseCode?: string;
  category?: string;
  zone?: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  xp: number;
  icon?: string;
}

export interface UserStats {
  userId: string;
  xpTotal: number;
  streakDays: number;
  badgesCount: number;
  level: number;
  weeklyProgress: number;
  weeklyGoal: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isICE: boolean;
  notes?: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  isCompleted: boolean;
  progress: number;
}

// Mock data
export const mockSchools: School[] = [
  {
    id: '1',
    name: 'Government High School, Chandigarh',
    district: 'Chandigarh',
    udiseCode: '04010100101',
    category: 'Government',
    zone: 'North'
  },
  {
    id: '2',
    name: 'Delhi Public School, Ludhiana',
    district: 'Ludhiana',
    udiseCode: '03020100102',
    category: 'Private',
    zone: 'Central'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    code: 'FIRST_LOGIN',
    title: 'Welcome Aboard!',
    description: 'Successfully logged in for the first time',
    xp: 10,
    icon: '🎉'
  },
  {
    id: '2',
    code: 'FIRE_SAFETY_COMPLETE',
    title: 'Fire Safety Expert',
    description: 'Completed all fire safety training modules',
    xp: 50,
    icon: '🔥'
  },
  {
    id: '3',
    code: 'EARTHQUAKE_DRILL_MASTER',
    title: 'Earthquake Drill Master',
    description: 'Mastered earthquake safety procedures',
    xp: 75,
    icon: '🌍'
  },
  {
    id: '4',
    code: 'STREAK_7_DAYS',
    title: 'Week Warrior',
    description: 'Maintained a 7-day learning streak',
    xp: 100,
    icon: '⚡'
  }
];

export const mockUserStats: UserStats = {
  userId: '1',
  xpTotal: 250,
  streakDays: 5,
  badgesCount: 3,
  level: 3,
  weeklyProgress: 4,
  weeklyGoal: 7
};

export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91-9876543210',
    relationship: 'Father',
    isICE: true,
    notes: 'Primary emergency contact'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+91-9876543211',
    relationship: 'Mother',
    isICE: false,
    notes: 'Available after 6 PM'
  },
  {
    id: '3',
    name: 'Dr. Amit Singh',
    phone: '+91-9876543212',
    relationship: 'Family Doctor',
    isICE: false,
    notes: 'Specialist in emergency medicine'
  }
];

export const mockTrainingModules: TrainingModule[] = [
  {
    id: '1',
    title: 'Fire Safety Basics',
    description: 'Learn the fundamentals of fire safety and prevention',
    category: 'Fire Safety',
    difficulty: 'beginner',
    xpReward: 25,
    isCompleted: true,
    progress: 100
  },
  {
    id: '2',
    title: 'Earthquake Preparedness',
    description: 'Essential knowledge for earthquake safety',
    category: 'Earthquake Safety',
    difficulty: 'intermediate',
    xpReward: 30,
    isCompleted: false,
    progress: 60
  },
  {
    id: '3',
    title: 'First Aid Fundamentals',
    description: 'Basic first aid techniques and procedures',
    category: 'First Aid',
    difficulty: 'beginner',
    xpReward: 35,
    isCompleted: false,
    progress: 0
  },
  {
    id: '4',
    title: 'Flood Safety Protocol',
    description: 'How to stay safe during floods',
    category: 'Flood Safety',
    difficulty: 'intermediate',
    xpReward: 40,
    isCompleted: false,
    progress: 0
  }
];

// Mock API functions
export const getSchools = async (): Promise<School[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSchools;
};

export const getAchievements = async (): Promise<Achievement[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockAchievements;
};

export const getUserStats = async (userId: string): Promise<UserStats> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockUserStats;
};

export const getEmergencyContacts = async (userId: string): Promise<EmergencyContact[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockEmergencyContacts;
};

export const getTrainingModules = async (): Promise<TrainingModule[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockTrainingModules;
};

export const addEmergencyContact = async (contact: Omit<EmergencyContact, 'id'>): Promise<EmergencyContact> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newContact: EmergencyContact = {
    ...contact,
    id: Date.now().toString()
  };
  mockEmergencyContacts.push(newContact);
  return newContact;
};

export const updateEmergencyContact = async (id: string, updates: Partial<EmergencyContact>): Promise<EmergencyContact> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockEmergencyContacts.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Contact not found');
  
  mockEmergencyContacts[index] = { ...mockEmergencyContacts[index], ...updates };
  return mockEmergencyContacts[index];
};

export const deleteEmergencyContact = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = mockEmergencyContacts.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Contact not found');
  
  mockEmergencyContacts.splice(index, 1);
};
