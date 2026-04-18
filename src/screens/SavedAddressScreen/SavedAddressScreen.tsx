import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import CartCheckoutWrapper from '../Cart/CartCheckoutWrapper';
import {
  useGetUserDileveryAddressQuery,
  useAddDeliveryAddressMutation,
  useUpdateDeliveryAddressMutation,
  useDeleteDeliveryAddressMutation,
} from '../../ReduxToolKit/Api/PaymentApi';
import { useSelector } from 'react-redux';

const AddressScreen = ({ navigation }: any) => {
  const user_Id = useSelector((state: any) => state.auth.userId);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { data, isLoading, refetch } = useGetUserDileveryAddressQuery({
    userId: user_Id,
  });

  const [addDeliveryAddress, { isLoading: adding }] =
    useAddDeliveryAddressMutation();

  const [updateDeliveryAddress, { isLoading: updating }] =
    useUpdateDeliveryAddressMutation();

  const [deleteDeliveryAddress, { isLoading: deleting }] =
    useDeleteDeliveryAddressMutation();

  const [addresses, setAddresses] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    house: '',
    area: '',
    city: '',
    pincode: '',
    type: 'Home',
  });

  useEffect(() => {
    if (data?.data) {
      const formatted = data.data.map((item: any) => ({
        id: item._id,
        label: item.type,
        name: item.name,
        phone: String(item.phone),
        house: item.houseVillage,
        area: item.areaStreet,
        city: item.city,
        pincode: item.pincode,
      }));

      setAddresses(formatted);
    }
  }, [data]);

  const openEditModal = (item: any) => {
    setEditingId(item.id);

    setForm({
      name: item.name || '',
      phone: item.phone || '',
      house: item.house || '',
      area: item.area || '',
      city: item.city || '',
      pincode: String(item.pincode || ''),
      type: item.label || 'Home',
    });

    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDeliveryAddress({ id }).unwrap();
      if (res) {
        Alert.alert(res.data.message);
      }
      refetch();
    } catch (error) {
      console.log('Delete Address Error:', error);
    }
  };

  const resetFormAndClose = () => {
    setShowModal(false);
    setEditingId(null);

    setForm({
      name: '',
      phone: '',
      house: '',
      area: '',
      city: '',
      pincode: '',
      type: 'Home',
    });
  };

  const handleUpdateAddress = async () => {
    const res = await updateDeliveryAddress({
      id: editingId,
      name: form.name,
      phone: form.phone,
      houseVillage: form.house,
      areaStreet: form.area,
      city: form.city,
      pincode: form.pincode,
      type: form.type,
    }).unwrap();
    if (res) {
      Alert.alert(res.data.message);
    }
  };

  const handleAddAddress = async () => {
    const res = await addDeliveryAddress({
      userId: user_Id,
      name: form.name,
      phone: form.phone,
      houseVillage: form.house,
      areaStreet: form.area,
      city: form.city,
      pincode: form.pincode,
      type: form.type,
    }).unwrap();
    if (res) {
      Alert.alert(res.data.message);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.phone || !form.house) return;

    try {
      if (editingId) {
        await handleUpdateAddress();
      } else {
        await handleAddAddress();
      }

      await refetch();
      resetFormAndClose();
    } catch (error) {
      console.log('Save Address Error:', error);
    }
  };

  return (
    <CartCheckoutWrapper
      title="Address"
      onBackPress={() => navigation.goBack()}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Add Delivery Address</Text>

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {addresses.map(item => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.label}</Text>

                <Text style={styles.cardSub}>
                  {item.name} • {item.phone}
                </Text>

                <Text style={styles.cardAddress}>
                  {item.house}, {item.area}, {item.city} - {item.pincode}
                </Text>

                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => openEditModal(item)}>
                    <Text style={styles.edit}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={styles.delete}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                setEditingId(null);
                setForm({
                  name: '',
                  phone: '',
                  house: '',
                  area: '',
                  city: '',
                  pincode: '',
                  type: 'Home',
                });
                setShowModal(true);
              }}
            >
              <Text style={styles.addText}>+ Add New Address</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        <Modal visible={showModal} transparent animationType="slide">
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.overlay}>
              <View style={styles.sheet}>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>
                    {editingId ? 'Edit Address' : 'Add Address'}
                  </Text>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <Text style={{ fontSize: 20 }}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.section}>Contact Details</Text>

                  <TextInput
                    placeholder="Full Name"
                    value={form.name}
                    onChangeText={t => setForm({ ...form, name: t })}
                    style={styles.input}
                  />

                  <TextInput
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                    maxLength={10}
                    value={form.phone}
                    onChangeText={t => setForm({ ...form, phone: t })}
                    style={styles.input}
                  />

                  <Text style={styles.section}>Address</Text>

                  <TextInput
                    placeholder="House / Flat"
                    value={form.house}
                    onChangeText={t => setForm({ ...form, house: t })}
                    style={styles.input}
                  />

                  <TextInput
                    placeholder="Area / Street"
                    value={form.area}
                    onChangeText={t => setForm({ ...form, area: t })}
                    style={styles.input}
                  />

                  <View style={styles.row}>
                    <TextInput
                      placeholder="City"
                      value={form.city}
                      onChangeText={t => setForm({ ...form, city: t })}
                      style={[styles.input, { flex: 1 }]}
                    />

                    <TextInput
                      placeholder="Pincode"
                      value={form.pincode}
                      onChangeText={t => setForm({ ...form, pincode: t })}
                      keyboardType="number-pad"
                      maxLength={6}
                      style={[styles.input, { flex: 1 }]}
                    />
                  </View>

                  <TouchableOpacity style={styles.save} onPress={handleSave}>
                    <Text style={styles.saveText}>
                      {adding || updating
                        ? editingId
                          ? 'Updating...'
                          : 'Saving...'
                        : editingId
                        ? 'Update Address'
                        : 'Save Address'}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </CartCheckoutWrapper>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },

  header: { fontSize: 16, fontWeight: '700', marginBottom: 12 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },

  cardRow: { flexDirection: 'row', alignItems: 'center' },

  cardTitle: { fontWeight: '700', fontSize: 14 },

  cardSub: { fontSize: 12, marginTop: 4 },

  cardAddress: { fontSize: 12, color: '#666', marginTop: 6 },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 20,
  },

  edit: { color: '#2563eb', fontWeight: '600' },

  delete: { color: '#dc2626', fontWeight: '600' },

  addBtn: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  },

  addText: { color: '#16a34a', fontWeight: '600' },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },

  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },

  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  sheetTitle: { fontSize: 18, fontWeight: '700' },

  section: { fontSize: 13, fontWeight: '700', marginTop: 12 },

  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    backgroundColor: '#fafafa',
  },

  row: { flexDirection: 'row', gap: 10 },

  chips: { flexDirection: 'row', marginTop: 14 },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },

  chipActive: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },

  chipText: { color: '#333' },

  chipTextActive: { color: '#fff' },

  save: {
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  saveText: { color: '#fff', fontWeight: '700' },
});
