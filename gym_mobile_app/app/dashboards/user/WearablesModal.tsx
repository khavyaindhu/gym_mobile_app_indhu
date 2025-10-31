import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WearableDevice {
  id: string;
  name: string;
  brand: string;
  battery: number;
  lastSync: string;
  connected: boolean;
  image?: any;
  metrics: Array<{
    icon: string;
    label: string;
    color: string;
  }>;
}

interface WearablesModalProps {
  visible: boolean;
  onClose: () => void;
}

const connectedDevices: WearableDevice[] = [
  {
    id: '1',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    battery: 78,
    lastSync: '2 minutes ago',
    connected: true,
    metrics: [
      { icon: 'heart', label: 'Heart Rate', color: '#ef4444' },
      { icon: 'footsteps', label: 'Steps', color: '#3b82f6' },
      { icon: 'moon', label: 'Sleep', color: '#8b5cf6' },
      { icon: 'pulse', label: 'Ecg', color: '#10b981' },
      { icon: 'water', label: 'Blood Oxygen', color: '#06b6d4' },
      { icon: 'thermometer', label: 'Temperature', color: '#f59e0b' },
    ],
  },
  {
    id: '2',
    name: 'Oura Ring Gen3',
    brand: 'Oura',
    battery: 92,
    lastSync: '5 minutes ago',
    connected: true,
    metrics: [
      { icon: 'heart', label: 'Heart Rate', color: '#ef4444' },
      { icon: 'moon', label: 'Sleep', color: '#8b5cf6' },
      { icon: 'thermometer', label: 'Temperature', color: '#f59e0b' },
      { icon: 'flash', label: 'Hrv', color: '#f97316' },
      { icon: 'fitness', label: 'Recovery', color: '#10b981' },
    ],
  },
  {
    id: '3',
    name: 'FreeStyle Libre 3',
    brand: 'Abbott',
    battery: 65,
    lastSync: '1 minute ago',
    connected: true,
    metrics: [
      { icon: 'water', label: 'Glucose', color: '#10b981' },
      { icon: 'trending-up', label: 'Trends', color: '#3b82f6' },
    ],
  },
];

const availableDevices = [
  {
    id: '4',
    name: 'Fitbit Sense 2',
    brand: 'Fitbit • smartwatch',
  },
  {
    id: '5',
    name: 'Garmin Venu 3',
    brand: 'Garmin • smartwatch',
  },
];

export default function WearablesModal({ visible, onClose }: WearablesModalProps) {
  const [autoSync, setAutoSync] = useState(true);
  const [activeTab, setActiveTab] = useState('Devices');

return (
  <View style={styles.container}>
    {/* Content */}
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {/* Page Title */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Wearables Hub</Text>
        <Text style={styles.pageSubtitle}>
          Connected devices and real-time health monitoring
        </Text>
      </View>

      {/* Auto-Sync Card */}
      <View style={styles.syncCard}>
        <View style={styles.syncLeft}>
          <Ionicons name="sync" size={24} color="#10b981" />
          <View style={styles.syncText}>
            <Text style={styles.syncTitle}>Auto-Sync Enabled</Text>
            <Text style={styles.syncSubtitle}>Real-time data from 3 devices</Text>
          </View>
        </View>
        <Switch
          value={autoSync}
          onValueChange={setAutoSync}
          trackColor={{ false: '#334155', true: '#10b981' }}
          thumbColor="#fff"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['Devices', 'Real-time', 'Fasting', 'Circadian'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Connected Devices Section */}
      <Text style={styles.sectionTitle}>Connected Devices</Text>

      {/* Device Cards */}
      {connectedDevices.map((device) => (
        <View key={device.id} style={styles.deviceCard}>
          <View style={styles.deviceHeader}>
            <View style={styles.deviceInfo}>
              <View style={styles.deviceImagePlaceholder}>
                <Ionicons name="watch" size={32} color="#64748b" />
              </View>
              <View style={styles.deviceDetails}>
                <View style={styles.deviceNameRow}>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  <View style={styles.connectedBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                    <Text style={styles.connectedText}>connected</Text>
                  </View>
                </View>
                <Text style={styles.deviceBrand}>{device.brand}</Text>
                <View style={styles.deviceStats}>
                  <View style={styles.deviceStat}>
                    <Ionicons name="battery-half" size={14} color="#10b981" />
                    <Text style={styles.deviceStatText}>{device.battery}%</Text>
                  </View>
                  <View style={styles.deviceStat}>
                    <Ionicons name="sync" size={14} color="#64748b" />
                    <Text style={styles.deviceStatText}>{device.lastSync}</Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="settings-outline" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Metrics */}
          <View style={styles.metricsContainer}>
            {device.metrics.map((metric, index) => (
              <View key={index} style={styles.metric}>
                <Ionicons name={metric.icon as any} size={16} color={metric.color} />
                <Text style={styles.metricLabel}>{metric.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Add New Device Section */}
      <View style={styles.addDeviceSection}>
        <TouchableOpacity style={styles.addDeviceButton}>
          <Ionicons name="add-circle-outline" size={20} color="#0ea5e9" />
          <Text style={styles.addDeviceText}>Add New Device</Text>
        </TouchableOpacity>

        {availableDevices.map((device) => (
          <View key={device.id} style={styles.availableDevice}>
            <View>
              <Text style={styles.availableDeviceName}>{device.name}</Text>
              <Text style={styles.availableDeviceBrand}>{device.brand}</Text>
            </View>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#00c48c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  pageHeader: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  syncCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  syncLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  syncText: {
    gap: 4,
  },
  syncTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  syncSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: '#334155',
  },
  tabText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  deviceCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  deviceInfo: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  deviceImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceDetails: {
    flex: 1,
    gap: 4,
  },
  deviceNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  connectedText: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '500',
  },
  deviceBrand: {
    fontSize: 13,
    color: '#94a3b8',
  },
  deviceStats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  deviceStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deviceStatText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  settingsButton: {
    padding: 8,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0f172a',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  metricLabel: {
    fontSize: 12,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  addDeviceSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  addDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  addDeviceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  availableDevice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  availableDeviceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  availableDeviceBrand: {
    fontSize: 13,
    color: '#94a3b8',
  },
  connectButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  connectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});